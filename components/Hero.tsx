
import React from 'react';
import { SplineScene } from './ui/spline';
import { Spotlight } from './ui/spotlight';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative z-10 -mt-16 md:-mt-20 overflow-hidden min-h-screen bg-slate-50 flex flex-col justify-center">
      {/* Background Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 z-0"
        fill="#3b82f6" /* Blue-500 equivalent */
      />
      
      <div className="container mx-auto px-4 pt-32 md:pt-20 pb-12 relative z-10 h-full flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left animate-fade-in order-2 md:order-1">
           {/* Badge */}
           <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm text-blue-600 text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-blue-100 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Yapay Zeka Destekli Lens Asistanı
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6 leading-[1.1]">
            Mükemmel Görüşü <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Keşfedin
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed">
            Müşterileriniz için en uygun cam, kaplama ve materyal seçeneklerini, 
            reçete ve yaşam tarzı verilerine dayanarak saniyeler içinde analiz edin.
          </p>

          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-lg rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 z-20"
          >
            <span>Analizi Başlat</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
            <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
          </button>
          
          {/* Mobile-only Features (visible only on small screens to save space) */}
          <div className="grid grid-cols-1 gap-4 mt-12 md:hidden">
              <div className="flex items-center gap-3 text-slate-600 bg-white/50 p-3 rounded-lg border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <span className="text-sm font-semibold">Akıllı Eşleştirme</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 bg-white/50 p-3 rounded-lg border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                  </div>
                  <span className="text-sm font-semibold">Yaşam Tarzı Analizi</span>
              </div>
          </div>
        </div>

        {/* Right 3D Content */}
        <div className="flex-1 w-full h-[400px] md:h-[600px] relative order-1 md:order-2 animate-fade-in delay-200">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-3xl -z-10 transform scale-75 translate-y-10"></div>
             <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full drop-shadow-2xl"
             />
        </div>

      </div>
      
      {/* Desktop Features Bar (Bottom) */}
      <div className="hidden md:block container mx-auto px-4 pb-8 relative z-10">
        <div className="grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
            <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Akıllı Eşleştirme</h3>
                  <p className="text-xs text-slate-500">Otomatik materyal önerisi</p>
                </div>
            </div>

            <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Yaşam Tarzı Analizi</h3>
                  <p className="text-xs text-slate-500">Kişiselleştirilmiş kaplama seçimi</p>
                </div>
            </div>

            <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm border border-amber-100 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Premium Markalar</h3>
                  <p className="text-xs text-slate-500">Essilor, Zeiss, Hoya, Fuji</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
