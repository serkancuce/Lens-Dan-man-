
import React from 'react';

interface HeaderProps {
  onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <div 
          className={`flex items-center ${onHomeClick ? 'cursor-pointer group' : ''}`} 
          onClick={onHomeClick}
          role={onHomeClick ? 'button' : undefined}
          tabIndex={onHomeClick ? 0 : undefined}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 mr-3 group-hover:scale-110 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.5m0 5.5a1.5 1.5 0 0 1-1.5 1.5h-2.25a1.5 1.5 0 0 1-1.5 1.5v-2.25a1.5 1.5 0 0 1 1.5-1.5h2.25a1.5 1.5 0 0 1 1.5 1.5v2.25a1.5 1.5 0 0 1-1.5 1.5Zm0 5.5a1.5 1.5 0 0 0 1.5 1.5h2.25a1.5 1.5 0 0 0 1.5-1.5v-2.25a1.5 1.5 0 0 0-1.5-1.5h-2.25a1.5 1.5 0 0 0-1.5 1.5v2.25a1.5 1.5 0 0 0 1.5 1.5Z M12 6.5a1.5 1.5 0 0 1-1.5-1.5V2.75a1.5 1.5 0 0 1 1.5-1.5h.008c.828 0 1.5.672 1.5 1.5v2.25a1.5 1.5 0 0 1-1.5 1.5H12Zm0 0a1.5 1.5 0 0 0 1.5-1.5V2.75a1.5 1.5 0 0 0-1.5-1.5h-.008a1.5 1.5 0 0 0-1.5 1.5v2.25a1.5 1.5 0 0 0 1.5 1.5H12Z" />
          </svg>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight select-none">
            Optisyen <span className="text-blue-600">Lens Danışmanı</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
