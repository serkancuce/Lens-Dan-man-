import React, { useState, useMemo } from 'react';
import { Lens, CustomerData, LensType, Coating } from '../types';
import BrandLogo from './BrandLogo';
import UseCaseIcon from './UseCaseIcon';

interface LensCardProps {
  lens: Lens;
  isFeatured?: boolean;
  customerData: CustomerData;
}

// Helper to draw lens curvature for visualization
const LensSVG: React.FC<{ ratio: number, isConcave: boolean, color: string, opacity?: number }> = ({ ratio, isConcave, color, opacity = 1 }) => {
    const w = 40;
    const h = 50; // Max height
    const lensH = Math.max(10, h * ratio); // Scale height based on thickness ratio

    let d = "";
    if (isConcave) {
        // Concave (Myopic) - Thick edges, thin center
        const waist = lensH * 0.4;
        d = `M0,0 Q${w/2},${waist} ${w},0 L${w},${lensH} Q${w/2},${lensH - waist} 0,${lensH} Z`;
    } else {
        // Convex (Hyperopic) - Thin edges, thick center
        const edge = lensH * 0.2;
        d = `M0,${edge} Q${w/2},0 ${w},${edge} L${w},${lensH - edge} Q${w/2},${lensH} 0,${lensH - edge} Z`;
    }

    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
            <path d={d} fill={color} fillOpacity={opacity} className="transition-all duration-500 ease-out" />
            {/* Shine effect */}
            <path d={d} fill="url(#shine)" style={{ mixBlendMode: 'overlay' }} opacity="0.4" />
        </svg>
    );
};

const LensCard: React.FC<LensCardProps> = ({ lens, isFeatured = false, customerData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Calculate Match Reason
  const matchReason = useMemo(() => {
    const prof = customerData.profession?.toLowerCase() || '';
    const { lifestyle } = customerData;
    
    // Profession & Lifestyle Logic
    if (lens.useCases.some(u => u.includes('Dijital')) && (prof.includes('yazılım') || prof.includes('ofis') || lifestyle.digitalUsage > 7)) {
        return { text: "Dijital ekran yorgunluğunu azaltır.", highlight: "Dijital Konfor", color: "text-blue-600", bg: "bg-blue-50" };
    }
    if (lens.useCases.some(u => u.includes('Araç')) && (prof.includes('şoför') || lifestyle.driving > 7)) {
        return { text: "Sürüş sırasında yansımaları keser.", highlight: "Sürüş Güvenliği", color: "text-amber-600", bg: "bg-amber-50" };
    }
    if (lens.useCases.some(u => u.includes('Dış')) && (lifestyle.outdoor > 7)) {
        return { text: "Güneş ışığına karşı adaptif koruma.", highlight: "Dış Mekan", color: "text-orange-600", bg: "bg-orange-50" };
    }
    
    // Type Logic
    if (lens.type === LensType.PROGRESSIVE) {
        return { text: "Uzak ve yakın arası kesintisiz geçiş.", highlight: "Çok Odaklı", color: "text-indigo-600", bg: "bg-indigo-50" };
    }
    
    // Default
    return { text: "Günlük yaşam için ideal denge.", highlight: "Optimum Seçim", color: "text-slate-600", bg: "bg-slate-100" };
  }, [lens, customerData]);

  // 2. Advanced Thickness Calculation
  const { reduction, lensRatio, isConcave, indexRangeLabel, thicknessLabel, thicknessColor } = useMemo(() => {
      // Parse indices from strings like "Standart 1.50"
      const indices = lens.material.map(m => {
          const match = m.match(/(\d+\.\d+)/);
          return match ? parseFloat(match[1]) : 1.50;
      }).sort((a, b) => a - b);

      const maxIndex = indices.length > 0 ? indices[indices.length - 1] : 1.50;
      const indexLabel = indices.length > 0 
        ? (indices[0] === indices[indices.length-1] ? indices[0].toFixed(2) : `${indices[0].toFixed(2)} - ${indices[indices.length-1].toFixed(2)}`)
        : "Standart";

      // Power calculation - Use the eye with stronger prescription for worst-case scenario
      const rightSph = customerData.prescription.right.sph || 0;
      const rightCyl = customerData.prescription.right.cyl || 0;
      const rightPower = Math.abs(rightSph) + Math.abs(rightCyl);

      const leftSph = customerData.prescription.left.sph || 0;
      const leftCyl = customerData.prescription.left.cyl || 0;
      const leftPower = Math.abs(leftSph) + Math.abs(leftCyl);

      // We visualize based on the stronger eye
      const useRightEye = rightPower >= leftPower;
      const sph = useRightEye ? rightSph : leftSph;
      const cyl = useRightEye ? rightCyl : leftCyl;
      
      // Thickness Physics Simulation (Approximation)
      // Standard lens (1.50) reference thickness factor
      // Better Approximation: Thickness ~ 1 / (Index - 1)
      const tStd = 1 / (1.50 - 1); // 2
      const tLens = 1 / (maxIndex - 1); // e.g., 1.74 -> 1.35
      
      const ratio = Math.min(1, tLens / tStd); // Compare to standard
      const percentReduced = Math.round((1 - ratio) * 100);

      let tLabel = "Standart";
      let tColor = "text-slate-500";
      
      if (percentReduced > 35) { tLabel = "Ultra İnce"; tColor = "text-emerald-600"; }
      else if (percentReduced > 20) { tLabel = "Çok İnce"; tColor = "text-blue-600"; }
      else if (percentReduced > 5) { tLabel = "İnce"; tColor = "text-indigo-600"; }

      return { 
          reduction: percentReduced, 
          lensRatio: ratio,
          isConcave: (sph + cyl) < 0,
          indexRangeLabel: indexLabel,
          thicknessLabel: tLabel,
          thicknessColor: tColor
      };
  }, [lens, customerData]);


  // 3. Coating Badges Helper
  const getCoatingIcon = (c: Coating) => {
      const str = c.toString().toLowerCase();
      if(str.includes('mavi')) return { icon: '💻', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      if(str.includes('uv')) return { icon: '☀️', color: 'bg-amber-100 text-amber-700 border-amber-200' };
      if(str.includes('antirefle')) return { icon: '✨', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
      if(str.includes('foto') || str.includes('color')) return { icon: '🌓', color: 'bg-purple-100 text-purple-700 border-purple-200' };
      if(str.includes('çizilme')) return { icon: '🛡️', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
      return { icon: '💎', color: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  const containerClasses = isFeatured
    ? "relative h-full flex flex-col rounded-[2rem] bg-white border-2 border-blue-500 shadow-2xl shadow-blue-900/10 scale-[1.02] z-10 overflow-hidden"
    : "relative h-full flex flex-col rounded-[2rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden";

  return (
    <>
      <div className={containerClasses}>
        {/* MATCH BANNER */}
        <div className={`px-6 py-3 text-xs font-bold uppercase tracking-wide flex items-center gap-2 ${matchReason.bg} ${matchReason.color} border-b border-white/50`}>
             <span className="flex-shrink-0 w-2 h-2 rounded-full bg-current animate-pulse"></span>
             {matchReason.highlight}
             <span className="normal-case font-medium opacity-80 ml-auto hidden sm:block">{matchReason.text}</span>
        </div>

        {/* HEADER */}
        <div className="p-8 pb-4 relative">
             <div className="flex justify-between items-start mb-6">
                <div className="h-8 p-2 rounded-lg bg-slate-900 flex items-center justify-center">
                    <BrandLogo brand={lens.brand} />
                </div>
                {isFeatured && (
                    <div className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/30">
                        En İyi Seçim
                    </div>
                )}
             </div>
             
             <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{lens.model}</h3>
             <div className="flex flex-wrap gap-2 mb-4">
                 <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-slate-100 text-slate-500">{lens.type}</span>
                 <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${isFeatured ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-white text-slate-500 border-slate-200'}`}>{lens.segment}</span>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 min-h-[40px]">{lens.description}</p>
        </div>

        {/* THICKNESS VISUALIZATION (THE "WOW" FACTOR) */}
        <div className="px-6 py-2">
            <div className={`rounded-2xl p-4 flex items-center justify-between relative overflow-hidden ${isFeatured ? 'bg-blue-50/50 border border-blue-100' : 'bg-slate-50 border border-slate-100'}`}>
                <div className="z-10 flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Materyal Analizi</div>
                    <div className={`text-xl font-bold ${thicknessColor}`}>{thicknessLabel}</div>
                    <div className="text-xs font-mono text-slate-500 mt-1">Refraktif: {indexRangeLabel}</div>
                    {reduction > 0 && <div className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full w-fit mt-2">%{reduction} Daha İnce</div>}
                </div>
                
                {/* Visual Comparison */}
                <div className="flex items-end gap-3 z-10 pl-4 border-l border-slate-200/50">
                    <div className="flex flex-col items-center gap-1 opacity-50 grayscale">
                         <LensSVG ratio={1} isConcave={isConcave} color="#94a3b8" />
                         <span className="text-[9px] font-bold">Std.</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                         <LensSVG ratio={lensRatio} isConcave={isConcave} color={isFeatured ? "#3b82f6" : "#64748b"} />
                         <span className={`text-[9px] font-bold ${isFeatured ? 'text-blue-600' : 'text-slate-600'}`}>Bu Lens</span>
                    </div>
                </div>
                
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none"></div>
            </div>
        </div>

        {/* COATINGS */}
        <div className="px-8 pt-4 pb-2">
            <div className="flex flex-wrap gap-2">
                {lens.coatings.slice(0,4).map((c, i) => {
                    const style = getCoatingIcon(c);
                    return (
                        <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-bold transition-transform hover:scale-105 cursor-default ${style.color}`}>
                            <span>{style.icon}</span>
                            {c}
                        </div>
                    );
                })}
                {lens.coatings.length > 4 && (
                    <div className="flex items-center px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-400">
                        +{lens.coatings.length - 4}
                    </div>
                )}
            </div>
        </div>

        {/* ACTION */}
        <div className="mt-auto p-8 pt-4">
             <button 
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
                ${isFeatured 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]' 
                    : 'bg-white border-2 border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
             >
                Detaylı İncele
             </button>
        </div>
      </div>

      {/* DETAILED MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col animate-spotlight">
             
             {/* Modal Header */}
             <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/80 backdrop-blur sticky top-0 z-20">
                 <div className="flex items-center gap-4">
                     <div className="bg-slate-900 p-3 rounded-xl shadow-lg shadow-slate-900/20">
                        <BrandLogo brand={lens.brand} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-900">{lens.model}</h3>
                        <p className="text-slate-500 font-medium">{lens.type}</p>
                     </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
             </div>

             {/* Modal Body */}
             <div className="p-8 space-y-8">
                 <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                     <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Neden Bu Lens?</h4>
                     <p className="text-blue-900 text-lg font-medium leading-relaxed">
                         "{matchReason.text}" <br/>
                         <span className="text-sm font-normal text-blue-700 mt-1 block">Özellikle {matchReason.highlight} alanındaki ihtiyaçlarınız için optimize edilmiştir.</span>
                     </p>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                     <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Teknik Detaylar</h4>
                        <ul className="space-y-3">
                            {lens.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-slate-700 font-medium">{f}</span>
                                </li>
                            ))}
                        </ul>
                     </div>
                     <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Kaplamalar</h4>
                        <div className="flex flex-wrap gap-2">
                            {lens.coatings.map((c, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                                    {c}
                                </span>
                            ))}
                        </div>
                     </div>
                 </div>

                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Kullanım Alanları</h4>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {lens.useCases.map((uc, i) => (
                            <div key={i} className="flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 min-w-[140px]">
                                <UseCaseIcon useCase={uc} className="w-5 h-5 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700">{uc}</span>
                            </div>
                        ))}
                    </div>
                 </div>
             </div>

             <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                 <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-transform active:scale-95">
                     Kapat
                 </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LensCard;