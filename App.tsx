import React, { useState, useCallback, useEffect } from 'react';
import { CustomerData, Lens } from './types';
import { getRecommendations } from './services/recommendationService';
import Header from './components/Header';
import Wizard from './components/Wizard';
import Results from './components/Results';
import Hero from './components/Hero';

const App: React.FC = () => {
  const [customerData, setCustomerData] = useState<Partial<CustomerData>>({});
  const [recommendations, setRecommendations] = useState<Lens[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStart = useCallback(() => {
    setShowHero(false);
  }, []);

  const handleHome = useCallback(() => {
    setShowHero(true);
    setCustomerData({});
    setRecommendations(null);
  }, []);

  const handleWizardSubmit = useCallback((data: CustomerData) => {
    setIsLoading(true);
    setCustomerData(data);
    setRecommendations(null);
    // Simulate API call
    setTimeout(() => {
      const results = getRecommendations(data);
      setRecommendations(results);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleReset = useCallback(() => {
    setCustomerData({});
    setRecommendations(null);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800 relative selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      {/* Dynamic Technological Background (Visible only when Hero is hidden to avoid clash) */}
      {!showHero && (
        <>
          <div className="fixed inset-0 -z-20 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div 
            className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[100px] animate-pulse mix-blend-multiply -z-10 transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: 'translate(calc(var(--mouse-x, 0) * 30px), calc(var(--mouse-y, 0) * 30px))' }}
          ></div>
          <div 
            className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-[120px] animate-pulse mix-blend-multiply -z-10 animation-delay-2000 transition-transform duration-1000 ease-out will-change-transform"
            style={{ transform: 'translate(calc(var(--mouse-x, 0) * -40px), calc(var(--mouse-y, 0) * -40px))' }}
          ></div>
          <div 
            className="fixed top-[40%] left-[60%] w-[300px] h-[300px] rounded-full bg-emerald-300/20 blur-[80px] animate-pulse mix-blend-multiply -z-10 animation-delay-4000 transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: 'translate(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * -20px))' }}
          ></div>
        </>
      )}

      <Header onHomeClick={handleHome} />
      
      <main className="relative z-10">
        {showHero ? (
          <Hero onStart={handleStart} />
        ) : (
          <div className="container mx-auto p-4 md:p-8">
            {!recommendations && !isLoading && (
              <Wizard onSubmit={handleWizardSubmit} />
            )}
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-center p-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 animate-fade-in mt-10">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-blue-600 animate-pulse">
                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 8.201 2.665 9.336 6.404.25.815.25 1.681 0 2.496C18.201 15.335 14.257 18 10 18c-4.257 0-8.201-2.665-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mt-6">İhtiyaçlar Analiz Ediliyor</h2>
                <p className="text-slate-500 mt-2 font-medium max-w-xs mx-auto">Müşteriniz için en uygun lens ve kaplama seçenekleri taranıyor...</p>
              </div>
            )}
            {recommendations && (
              <Results recommendations={recommendations} onReset={handleReset} customerData={customerData as CustomerData} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;