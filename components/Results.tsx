import React, { useMemo, useState } from 'react';
import { CustomerData, Lens, Segment } from '../types';
import LensCard from './LensCard';
import BrandLogo from './BrandLogo';

interface ResultsProps {
  recommendations: Lens[];
  onReset: () => void;
  customerData: CustomerData;
}

const Results: React.FC<ResultsProps> = ({ recommendations, onReset, customerData }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Calculate specific insights for the dashboard
  const insights = useMemo(() => {
      const p = customerData.profession?.toLowerCase() || '';
      
      const maxAdd = Math.max(customerData.prescription.right.add || 0, customerData.prescription.left.add || 0);
      const isPresbyopic = maxAdd > 0 || customerData.age >= 40;
      
      const maxSph = Math.max(Math.abs(customerData.prescription.right.sph || 0), Math.abs(customerData.prescription.left.sph || 0));

      let primaryFocus = "Genel Kullanım";
      let focusIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      );

      // Determine Focus Area
      if (p.includes('yazılım') || p.includes('ofis') || customerData.lifestyle.digitalUsage > 7) {
          primaryFocus = "Dijital Konfor & Yakın Odak";
          focusIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0 1 14.1 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h9.75a2.25 2.25 0 0 1 2.25 2.25Z" />
            </svg>
          );
      } else if (customerData.lifestyle.driving > 7) {
          primaryFocus = "Sürüş Güvenliği & Kontrast";
          focusIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.717" />
            </svg>
          );
      }

      return {
          focus: primaryFocus,
          focusIcon,
          lensType: isPresbyopic ? "Çok Odaklı (Progresif)" : "Tek Odaklı (Uzak/Yakın)",
          material: customerData.preferences.wantsThinLenses || maxSph > 3 ? "İnceltilmiş Materyal" : "Standart/Organik",
          coating: customerData.lifestyle.outdoor > 7 ? "Fotokromik (Colormatic)" : "Antirefle Kaplama"
      };
  }, [customerData]);

  // AI Summary Generation Logic
  const aiSummary = useMemo(() => {
    const { prescription, lifestyle, profession, age } = customerData;
    const reasons: string[] = [];
    const solutions: string[] = [];
    
    // Aggregates
    const maxCyl = Math.max(Math.abs(prescription.right.cyl || 0), Math.abs(prescription.left.cyl || 0));
    const maxSph = Math.max(Math.abs(prescription.right.sph || 0), Math.abs(prescription.left.sph || 0));
    const maxAdd = Math.max(prescription.right.add || 0, prescription.left.add || 0);


    // --- Analyze Conditions (Reasons) ---
    // Prescription Checks
    if (maxCyl > 1.25) {
        reasons.push("yüksek astigmat değerleri");
    } else if (maxSph > 4.00) {
        reasons.push("yüksek numara");
    }

    // Lifestyle Checks
    const isDigital = lifestyle.digitalUsage > 7 || (profession && /yazılım|bilgisayar|ofis|finans/i.test(profession));
    
    if (isDigital) {
        reasons.push("yoğun dijital ekran kullanımı");
    } else if (lifestyle.driving > 7) {
        reasons.push("aktif araç kullanımı");
    } else if (lifestyle.outdoor > 7) {
        reasons.push("dış mekan aktiviteleri");
    }
    
    if (maxAdd > 0 || age >= 45) {
        reasons.push("yakın görüş ihtiyacı (presbiyopi)");
    }

    // --- Determine Solutions ---
    if (maxCyl > 1.25) solutions.push("geniş görüş alanlı");
    if (maxSph > 4.00) solutions.push("inceltilmiş estetik");
    
    if (isDigital) {
        solutions.push("mavi ışık filtreli");
    } else if (lifestyle.driving > 7) {
        solutions.push("yansıma önleyici (antirefle)");
    } else if (lifestyle.outdoor > 7) {
        solutions.push("fotokromik (colormatic)");
    }
    
    if (maxAdd > 0 || age >= 45) {
        solutions.push("progresif");
    }

    // Fallback if generic
    if (reasons.length === 0) {
        return "Genel kullanım alışkanlıklarınız ve reçeteniz baz alınarak, günlük konfor ve netlik dengesini sağlayan optimal lensler seçildi.";
    }

    // Construct Sentence: Take top 2 reasons and solutions to keep it readable
    const reasonText = reasons.slice(0, 2).join(" ve ");
    const solutionText = solutions.slice(0, 2).join(" ve ");
    
    const text = `${reasonText} nedeniyle ${solutionText} özellikli camlar sizin için öne çıkarıldı.`;
    return text.charAt(0).toUpperCase() + text.slice(1);

  }, [customerData]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 md:px-8 pb-20 print:p-0 print:max-w-none">
        
        {/* Header Dashboard */}
        <div className="mb-12 print:mb-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight print:text-2xl">
                        Analiz Sonuçları
                    </h2>
                    <p className="text-slate-500 mt-2 text-lg print:text-sm">
                        <span className="font-semibold text-slate-800">{customerData.name}</span> için kişiselleştirilmiş öneriler.
                    </p>
                </div>
                <div className="flex items-center gap-3 print:hidden">
                    <div className="bg-white p-1 rounded-xl border border-slate-200 flex items-center shadow-sm">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Kart Görünümü"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>
                        </button>
                        <button 
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Tablo Karşılaştırma"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 1.5c0 .621.504 1.125 1.125 1.125M12 18.375v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125" /></svg>
                        </button>
                    </div>

                    <button 
                        onClick={handlePrint}
                        className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-colors"
                        title="Yazdır"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" /></svg>
                    </button>

                    <button
                        onClick={onReset}
                        className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        Yeni Analiz
                    </button>
                </div>
            </div>

            {/* AI Summary Section */}
            <div className="mb-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden border border-slate-700 print:bg-white print:text-black print:border-black print:shadow-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 print:hidden"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 print:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-1 print:text-slate-600">Yapay Zeka Analiz Özeti</h3>
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-50 print:text-black">
                            "{aiSummary}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-4 print:gap-2">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 print:bg-white print:border-slate-200 print:shadow-none">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        {insights.focusIcon}
                        <span>Odak Noktası</span>
                    </div>
                    <div className="text-slate-900 font-bold text-lg leading-tight">{insights.focus}</div>
                </div>

                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 print:bg-white print:border-slate-200 print:shadow-none">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>
                        <span>Lens Tipi</span>
                    </div>
                    <div className="text-slate-900 font-bold text-lg leading-tight">{insights.lensType}</div>
                </div>

                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 print:bg-white print:border-slate-200 print:shadow-none">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" /></svg>
                        <span>Önerilen Materyal</span>
                    </div>
                    <div className="text-slate-900 font-bold text-lg leading-tight">{insights.material}</div>
                </div>

                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 print:bg-white print:border-slate-200 print:shadow-none">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>
                        <span>Ekstra Özellik</span>
                    </div>
                    <div className="text-slate-900 font-bold text-lg leading-tight">{insights.coating}</div>
                </div>
            </div>
        </div>

      {/* Dynamic View: Grid or Table */}
      {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {recommendations.map((lens, index) => (
              <LensCard 
                key={lens.id} 
                lens={lens} 
                isFeatured={index === 2} // Typically the Premium option
                customerData={customerData}
              />
            ))}
          </div>
      ) : (
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider w-1/4">Özellik</th>
                            {recommendations.map((lens, index) => (
                                <th key={lens.id} className={`p-6 w-1/4 ${index === 2 ? 'bg-blue-50/50' : ''}`}>
                                    <div className="flex flex-col gap-2">
                                        <div className={`text-xs font-bold uppercase px-2 py-1 rounded-md w-fit ${
                                            index === 0 ? 'bg-slate-200 text-slate-600' :
                                            index === 1 ? 'bg-indigo-100 text-indigo-700' :
                                            'bg-blue-600 text-white'
                                        }`}>
                                            {index === 0 ? 'Ekonomik' : index === 1 ? 'Dengeli' : 'Premium'}
                                        </div>
                                        <div className="h-8">
                                            <BrandLogo brand={lens.brand} />
                                        </div>
                                        <div className="text-lg font-bold text-slate-800 leading-tight">{lens.model}</div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                         {/* Material Row */}
                        <tr>
                            <td className="p-6 font-bold text-slate-700 bg-slate-50/30">Materyal</td>
                            {recommendations.map((lens, i) => (
                                <td key={lens.id} className={`p-6 text-sm text-slate-600 ${i === 2 ? 'bg-blue-50/20 font-semibold text-slate-900' : ''}`}>
                                    {lens.material.join(', ')}
                                </td>
                            ))}
                        </tr>
                        {/* Type Row */}
                        <tr>
                            <td className="p-6 font-bold text-slate-700 bg-slate-50/30">Lens Tipi</td>
                            {recommendations.map((lens, i) => (
                                <td key={lens.id} className={`p-6 text-sm text-slate-600 ${i === 2 ? 'bg-blue-50/20' : ''}`}>
                                    {lens.type}
                                </td>
                            ))}
                        </tr>
                        {/* Coatings Row */}
                        <tr>
                            <td className="p-6 font-bold text-slate-700 bg-slate-50/30">Kaplamalar</td>
                            {recommendations.map((lens, i) => (
                                <td key={lens.id} className={`p-6 ${i === 2 ? 'bg-blue-50/20' : ''}`}>
                                    <div className="flex flex-wrap gap-1">
                                        {lens.coatings.map(c => (
                                            <span key={c} className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            ))}
                        </tr>
                        {/* Description Row */}
                        <tr>
                            <td className="p-6 font-bold text-slate-700 bg-slate-50/30">Açıklama</td>
                            {recommendations.map((lens, i) => (
                                <td key={lens.id} className={`p-6 text-sm italic text-slate-500 leading-relaxed ${i === 2 ? 'bg-blue-50/20' : ''}`}>
                                    "{lens.description}"
                                </td>
                            ))}
                        </tr>
                        {/* Score/Match Row */}
                        <tr>
                            <td className="p-6 font-bold text-slate-700 bg-slate-50/30">Uyumluluk Puanı</td>
                            {recommendations.map((lens, i) => {
                                // Simple mock calculation for visual representation in table
                                const score = i === 0 ? 85 : i === 1 ? 92 : 98;
                                return (
                                    <td key={lens.id} className={`p-6 ${i === 2 ? 'bg-blue-50/20' : ''}`}>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${i === 2 ? 'bg-blue-600' : i === 1 ? 'bg-indigo-500' : 'bg-slate-500'}`} 
                                                    style={{ width: `${score}%` }}
                                                ></div>
                                            </div>
                                            <span className="font-bold text-sm">%{score}</span>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
      )}
    </div>
  );
};

export default Results;