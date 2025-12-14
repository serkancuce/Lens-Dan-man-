import React from 'react';
import clsx from 'clsx';

interface LifestyleCardProps {
  title: string;
  description: string;
  type: 'digital' | 'outdoor' | 'driving' | 'sports';
  value: number;
  onChange: (value: number) => void;
  color: string;
  icon: React.ReactNode;
}

const getUsageLevel = (value: number) => {
  if (value <= 2) return "Düşük";
  if (value <= 5) return "Orta";
  if (value <= 8) return "Yüksek";
  return "Çok Yüksek";
};

const getUsageEffect = (type: string, value: number) => {
  if (value <= 2) return "Standart camlar yeterli.";

  switch (type) {
    case "digital":
      return value >= 7
        ? "Mavi ışık filtresi kritik önem taşır."
        : "Yansıma önleyici kaplama önerilir.";
    case "outdoor":
      return value >= 7
        ? "Fotokromik veya Polarize şart."
        : "UV koruması gereklidir.";
    case "driving":
      return value >= 7
        ? "DriveSafe teknolojisi önerilir."
        : "Antirefle kaplama yeterli.";
    case "sports":
      return value >= 7
        ? "Trivex/Polikarbonat (Kırılmaz) cam."
        : "Darbe dirençli kaplama.";
    default:
      return "";
  }
};

const LifestyleCard: React.FC<LifestyleCardProps> = ({
  title,
  description,
  type,
  value,
  onChange,
  color, // e.g., border-blue-200
  icon,
}) => {
  const levelText = getUsageLevel(value);
  const recommendationText = getUsageEffect(type, value);
  
  // Parse base color from class string
  const baseColor = color.includes('blue') ? 'blue' 
                 : color.includes('orange') ? 'orange'
                 : color.includes('emerald') ? 'emerald'
                 : 'slate';

  // Dynamic Background Opacity Calculation
  const intensity = (value / 10) * 0.15; // Max 0.15 opacity
  const bgStyle = { backgroundColor: `rgba(var(--${baseColor}-500-rgb), ${intensity})` }; // Requires RGB vars or simple workaround below

  // Simple workaround for dynamic background classes since Tailwind needs full class names
  const getDynamicBg = () => {
      if (value === 0) return 'bg-white';
      if (baseColor === 'blue') return value > 7 ? 'bg-blue-100' : value > 3 ? 'bg-blue-50' : 'bg-slate-50';
      if (baseColor === 'orange') return value > 7 ? 'bg-orange-100' : value > 3 ? 'bg-orange-50' : 'bg-slate-50';
      if (baseColor === 'emerald') return value > 7 ? 'bg-emerald-100' : value > 3 ? 'bg-emerald-50' : 'bg-slate-50';
      return value > 7 ? 'bg-slate-200' : value > 3 ? 'bg-slate-100' : 'bg-slate-50';
  };

  const dynamicBg = getDynamicBg();
  const isActive = value > 0;

  return (
    <div className={clsx(
        "relative overflow-hidden p-6 rounded-[24px] border transition-all duration-300 h-full flex flex-col group select-none",
        isActive ? `border-${baseColor}-300 shadow-lg shadow-${baseColor}-100` : "border-slate-200 shadow-sm",
        dynamicBg
    )}>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className={clsx(
              "p-3 rounded-2xl transition-all duration-300",
              isActive ? `bg-${baseColor}-600 text-white scale-110 rotate-3` : "bg-white text-slate-400 shadow-sm"
          )}>
            {icon}
          </div>
          <div>
            <label className={clsx("block text-lg font-bold transition-colors", isActive ? "text-slate-900" : "text-slate-500")}>
                {title}
            </label>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{description}</p>
          </div>
        </div>
        <div className={clsx(
            "text-sm font-bold px-3 py-1.5 rounded-xl border transition-all duration-300",
            isActive ? `bg-white text-${baseColor}-600 border-${baseColor}-200 shadow-sm` : "bg-slate-100 text-slate-400 border-transparent"
        )}>
          {value}/10
        </div>
      </div>

      {/* Slider Area */}
      <div className="mb-6 px-1 relative z-10">
        <input 
            type="range" 
            min="0" 
            max="10" 
            step="1" 
            value={value} 
            onChange={(e) => onChange(Number(e.target.value))}
            className={clsx(
                "w-full h-3 rounded-lg appearance-none cursor-pointer focus:outline-none transition-all",
                `accent-${baseColor}-600 bg-slate-200/50`
            )}
        />
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mt-3">
            <span className="text-slate-400">Yok</span>
            <span className={clsx("transition-all duration-300", isActive ? `text-${baseColor}-600 scale-110` : "text-slate-400")}>
                {levelText}
            </span>
            <span className="text-slate-400">Maks</span>
        </div>
      </div>

      {/* Recommendation Footer */}
      <div className="mt-auto relative z-10">
        <div className={clsx(
            "flex items-start gap-3 text-xs p-3 rounded-xl border transition-all duration-300",
            isActive ? "bg-white/60 border-white/50 shadow-sm" : "bg-slate-100/50 border-transparent opacity-60"
        )}>
            <div className={clsx("mt-0.5", isActive ? `text-${baseColor}-600` : "text-slate-400")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                </svg>
            </div>
            <span className="leading-relaxed font-medium text-slate-600">
                {isActive ? recommendationText : "Seviyeyi ayarlayın."}
            </span>
        </div>
      </div>
      
      {/* Decorative Background Blob */}
      {isActive && (
          <div className={clsx(
              "absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-40 pointer-events-none transition-all duration-500",
              `bg-${baseColor}-400`
          )}></div>
      )}
    </div>
  );
};

export default LifestyleCard;