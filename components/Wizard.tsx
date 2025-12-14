import React, { useState, useCallback } from 'react';
import { CustomerData } from '../types';
import clsx from 'clsx';
import LifestyleCard from './LifestyleCard';

// Presets for quick selection
const PERSONA_PRESETS = [
  {
    id: 'office',
    label: 'Ofis Çalışanı',
    icon: '💻',
    values: { digitalUsage: 9, driving: 3, outdoor: 2, sports: 1 }
  },
  {
    id: 'driver',
    label: 'Profesyonel Şoför',
    icon: '🚖',
    values: { digitalUsage: 3, driving: 10, outdoor: 5, sports: 2 }
  },
  {
    id: 'student',
    label: 'Öğrenci',
    icon: '📚',
    values: { digitalUsage: 8, driving: 2, outdoor: 5, sports: 4 }
  },
  {
    id: 'retired',
    label: 'Emekli / Ev',
    icon: '🏡',
    values: { digitalUsage: 4, driving: 3, outdoor: 4, sports: 2 }
  },
  {
    id: 'active',
    label: 'Aktif / Sporcu',
    icon: '🏃',
    values: { digitalUsage: 4, driving: 5, outdoor: 9, sports: 9 }
  }
];

interface WizardProps {
  onSubmit: (data: CustomerData) => void;
}

const Wizard: React.FC<WizardProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<CustomerData>>({
    name: '',
    age: 45,
    profession: '',
    prescription: { 
        right: { sph: -2.5, cyl: -0.75, axis: 90, add: 1.5 },
        left: { sph: -2.5, cyl: -0.75, axis: 90, add: 1.5 }
    },
    lifestyle: { digitalUsage: 5, driving: 5, outdoor: 5, sports: 5 },
    preferences: { wantsThinLenses: false },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
      const newErrors: Record<string, string> = {};
      let isValid = true;

      if (currentStep === 1) {
          if (!data.name?.trim()) {
              newErrors.name = 'Müşteri adı zorunludur.';
              isValid = false;
          }
          if (!data.age || data.age < 5 || data.age > 120) {
              newErrors.age = 'Geçerli bir yaş giriniz (5-120).';
              isValid = false;
          }
          if (!data.profession?.trim()) {
              newErrors.profession = 'Meslek bilgisi zorunludur.';
              isValid = false;
          }
          
          // Basic validation for Axis
          if (data.prescription) {
              if (data.prescription.right.axis < 0 || data.prescription.right.axis > 180) {
                  newErrors['prescription.right.axis'] = 'Sağ Aks 0-180 arası olmalı.';
                  isValid = false;
              }
              if (data.prescription.left.axis < 0 || data.prescription.left.axis > 180) {
                  newErrors['prescription.left.axis'] = 'Sol Aks 0-180 arası olmalı.';
                  isValid = false;
              }
          }
      }

      setErrors(newErrors);
      return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Clear specific error
    if (errors[name]) {
        setErrors(prev => {
            const rest = { ...prev };
            delete rest[name];
            return rest;
        });
    }

    // Handle nested prescription updates (e.g. prescription.right.sph)
    if (name.startsWith('prescription.')) {
        const parts = name.split('.'); // ['prescription', 'right', 'sph']
        if (parts.length === 3) {
            const side = parts[1] as 'right' | 'left';
            const field = parts[2];
            setData(prev => ({
                ...prev,
                prescription: {
                    ...prev.prescription!,
                    [side]: {
                        ...prev.prescription![side],
                        [field]: parseFloat(value) || 0 // Default to 0 if empty/NaN to prevent errors
                    }
                }
            }));
            return;
        }
    }

    const [section, field] = name.split('.');

    if (section && field && section !== 'prescription') {
      setData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof CustomerData] as object),
          [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (value === '' ? '' : parseFloat(value)),
        },
      }));
    } else if (!section || !field) {
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    }
  };
  
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setData(prev => ({
        ...prev,
        preferences: {
            ...(prev.preferences || { wantsThinLenses: false }),
            [name]: checked
        } as CustomerData['preferences']
    }));
  };

  const applyPreset = (presetValues: typeof PERSONA_PRESETS[0]['values']) => {
      setData(prev => ({
          ...prev,
          lifestyle: { ...presetValues }
      }));
  };

  const nextStep = () => {
      if (validateStep(step)) {
          setStep(s => s + 1);
      }
  };
  
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
        onSubmit(data as CustomerData);
    }
  }, [data, onSubmit, step]);

  const getInputClass = (fieldName: string, isCenter = false) => {
      const baseClass = `block w-full px-3 py-2 text-sm md:text-base border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200 ${isCenter ? 'text-center' : ''}`;
      const errorClass = "bg-red-50 border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500";
      const normalClass = "bg-white border-slate-200 text-slate-900 focus:ring-blue-500 focus:border-blue-500";
      
      return `${baseClass} ${errors[fieldName] ? errorClass : normalClass}`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-2xl rounded-[40px] shadow-2xl p-6 md:p-10 border border-white/60 relative overflow-hidden ring-1 ring-black/5">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -z-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <h2 className="text-3xl font-extrabold text-center mb-2 text-slate-900 tracking-tight">İhtiyaç Analizi</h2>
      <p className="text-center text-slate-500 mb-10 font-medium">Doğru lensi bulmak için sihirbazı tamamlayın.</p>
      
      <div className="w-full max-w-xl mx-auto mb-12 relative z-10">
        <div className="flex items-center justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
            <div 
                className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500 ease-out" 
                style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
            ></div>

            {/* Steps */}
            {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center group cursor-default">
                    <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-all duration-300 
                        ${step >= s 
                            ? 'bg-blue-600 border-white text-white shadow-lg shadow-blue-500/30 scale-110' 
                            : 'bg-white border-slate-100 text-slate-300'
                        }`}
                    >
                        {s}
                    </div>
                    <span className={`text-xs font-bold mt-2 uppercase tracking-wide transition-colors ${step >= s ? 'text-blue-600' : 'text-slate-300'}`}>
                        {s === 1 ? 'Reçete' : s === 2 ? 'Yaşam' : 'Tercih'}
                    </span>
                </div>
            ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10" noValidate>
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 pl-1">Müşteri Adı</label>
                    <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={data.name} 
                          onChange={handleChange} 
                          className={`${getInputClass('name')} text-lg`}
                          placeholder="Örn: Ali Veli"
                      />
                </div>
                 <div>
                    <label htmlFor="age" className="block text-sm font-bold text-slate-700 mb-2 pl-1">Yaş</label>
                    <input 
                          type="number" 
                          id="age" 
                          name="age" 
                          value={data.age} 
                          onChange={handleChange} 
                          className={`${getInputClass('age')} text-lg`}
                      />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="profession" className="block text-sm font-bold text-slate-700 mb-2 pl-1">Meslek</label>
                  <input
                    id="profession"
                    name="profession"
                    type="text"
                    className={`${getInputClass('profession')} text-lg`}
                    placeholder="Örneğin: Yazılım Geliştirici..."
                    value={data.profession}
                    onChange={handleChange}
                  />
                </div>
            </div>
            
            {/* Prescription Table Layout */}
            <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Reçete Değerleri</h4>
                
                {/* Headers */}
                <div className="grid grid-cols-5 gap-4 mb-2">
                    <div className="col-span-1"></div>
                    {['SPH', 'CYL', 'AXIS', 'ADD'].map(header => (
                        <div key={header} className="text-center text-[10px] font-bold text-slate-400">{header}</div>
                    ))}
                </div>

                {/* Right Eye Row */}
                <div className="grid grid-cols-5 gap-4 mb-4 items-center">
                    <div className="col-span-1 flex flex-col items-center justify-center md:items-start md:pl-2">
                        <span className="font-bold text-slate-700 text-sm md:text-base">Sağ</span>
                        <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded uppercase">OD</span>
                    </div>
                    {['sph', 'cyl', 'axis', 'add'].map((field) => (
                        <input 
                            key={`right-${field}`}
                            type="number" 
                            step={field === 'axis' ? 1 : 0.25}
                            name={`prescription.right.${field}`}
                            value={(data.prescription?.right as any)?.[field]} 
                            onChange={handleChange} 
                            className={getInputClass(`prescription.right.${field}`, true)} 
                            placeholder={field === 'axis' ? '180' : '0.00'}
                        />
                    ))}
                </div>

                {/* Left Eye Row */}
                <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="col-span-1 flex flex-col items-center justify-center md:items-start md:pl-2">
                         <span className="font-bold text-slate-700 text-sm md:text-base">Sol</span>
                         <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded uppercase">OS</span>
                    </div>
                     {['sph', 'cyl', 'axis', 'add'].map((field) => (
                        <input 
                            key={`left-${field}`}
                            type="number" 
                            step={field === 'axis' ? 1 : 0.25}
                            name={`prescription.left.${field}`}
                            value={(data.prescription?.left as any)?.[field]} 
                            onChange={handleChange} 
                            className={getInputClass(`prescription.left.${field}`, true)}
                            placeholder={field === 'axis' ? '180' : '0.00'} 
                        />
                    ))}
                </div>
                
                <div className="flex flex-col gap-1 mt-4">
                    {errors['prescription.right.axis'] && <p className="text-center text-xs text-red-500 font-bold">{errors['prescription.right.axis']}</p>}
                    {errors['prescription.left.axis'] && <p className="text-center text-xs text-red-500 font-bold">{errors['prescription.left.axis']}</p>}
                </div>
            </div>
          </div>
        )}

        {step === 2 && (
            <div className="animate-fade-in">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Günlük Aktiviteler</h3>
                    <p className="text-slate-500 text-sm mt-1">Hızlı seçim yapın veya kartlardaki barları sürükleyerek özelleştirin.</p>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {PERSONA_PRESETS.map(preset => (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyPreset(preset.values)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95"
                        >
                            <span className="text-lg">{preset.icon}</span>
                            {preset.label}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <LifestyleCard
                        title="Dijital Ekran"
                        description="Bilgisayar ve telefon kullanımı"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0 1 14.1 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h9.75a2.25 2.25 0 0 1 2.25 2.25Z" /></svg>}
                        type="digital"
                        color="border-blue-200"
                        value={data.lifestyle?.digitalUsage || 0}
                        onChange={(val) => setData(prev => ({ ...prev, lifestyle: { ...prev.lifestyle!, digitalUsage: val } }))}
                    />

                    <LifestyleCard
                        title="Dış Mekan"
                        description="Güneş ışığı ve dışarıda vakit"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>}
                        type="outdoor"
                        color="border-orange-200"
                        value={data.lifestyle?.outdoor || 0}
                        onChange={(val) => setData(prev => ({ ...prev, lifestyle: { ...prev.lifestyle!, outdoor: val } }))}
                    />

                    <LifestyleCard
                        title="Araç Sürüş"
                        description="Aktif araç kullanımı (Gece/Gündüz)"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.717" /></svg>}
                        type="driving"
                        color="border-slate-300"
                        value={data.lifestyle?.driving || 0}
                        onChange={(val) => setData(prev => ({ ...prev, lifestyle: { ...prev.lifestyle!, driving: val } }))}
                    />

                    <LifestyleCard
                        title="Spor & Aktivite"
                        description="Hareketli yaşam ve spor"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>}
                        type="sports"
                        color="border-emerald-200"
                        value={data.lifestyle?.sports || 0}
                        onChange={(val) => setData(prev => ({ ...prev, lifestyle: { ...prev.lifestyle!, sports: val } }))}
                    />
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="animate-fade-in">
                 <h3 className="text-xl font-bold mb-6 text-center text-slate-800">Estetik Tercihler</h3>
                 
                 <div 
                    className="bg-white p-8 rounded-[32px] border-2 border-slate-100 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-xl group" 
                    onClick={() => document.getElementById('wantsThinLenses')?.click()}
                 >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${data.preferences?.wantsThinLenses ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'bg-slate-100 text-slate-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                        </svg>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <input 
                            id="wantsThinLenses" 
                            name="wantsThinLenses" 
                            type="checkbox" 
                            checked={data.preferences?.wantsThinLenses} 
                            onChange={handlePreferenceChange} 
                            className="w-6 h-6 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" 
                            onClick={(e) => e.stopPropagation()}
                        />
                        <label htmlFor="wantsThinLenses" className="text-xl font-bold text-slate-800 cursor-pointer select-none">
                            İnce ve Hafif (High Index)
                        </label>
                    </div>
                    <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                        Yüksek numaralı reçetelerde estetik görünümü iyileştiren, ağırlığı azaltan özel inceltilmiş cam materyallerini (1.60, 1.67, 1.74) öncelikli olarak önerir.
                    </p>
                 </div>
            </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="text-slate-500 hover:text-slate-800 font-bold px-6 py-3 rounded-2xl hover:bg-slate-50 transition-colors">
                Geri Dön
              </button>
            ) : <div></div>}
            
            <button 
                type={step === 3 ? 'submit' : 'button'} 
                onClick={step < 3 ? nextStep : undefined}
                className={`
                    px-10 py-4 rounded-2xl font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95
                    ${step === 3 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30' 
                        : 'bg-slate-900 shadow-slate-900/20'
                    }
                `}
            >
                {step === 3 ? 'Analizi Tamamla' : 'Devam Et'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default Wizard;