
export enum LensType {
  SINGLE_VISION = 'Tek Odaklı',
  PROGRESSIVE = 'Progresif',
  OFFICE = 'Ofis/Bilgisayar',
}

export enum Material {
  CR39 = 'Standart 1.50',
  POLYCARBONATE = 'Polikarbonat 1.59',
  TRIVEX = 'Trivex 1.53',
  HIGH_INDEX_1_60 = 'Yüksek İndeks 1.60',
  HIGH_INDEX_1_67 = 'Yüksek İndeks 1.67',
  HIGH_INDEX_1_74 = 'Yüksek İndeks 1.74',
}

export enum Coating {
  ANTI_REFLECTIVE = 'Antirefle',
  BLUE_LIGHT_FILTER = 'Mavi Işık Filtresi',
  PHOTOCHROMIC = 'Fotokromik',
  POLARIZED = 'Polarize',
  SCRATCH_RESISTANT = 'Çizilmeye Dirençli',
  HYDROPHOBIC = 'Hidrofobik/Oleofobik',
  UV_PROTECTION = 'UV Koruma',
}

export enum UseCase {
  DIGITAL_HEAVY = 'Yoğun Dijital Kullanım',
  DRIVER = 'Sık Araç Kullanımı',
  OUTDOOR = 'Çoğunlukla Dış Mekan',
  SPORTS = 'Aktif/Spor',
  OFFICE_WORK = 'Ofis Ortamı',
  GENERAL = 'Genel Amaçlı',
}

export enum Segment {
  ECONOMY = 'En İyi Fiyat',
  MID_RANGE = 'Dengeli Seçim',
  PREMIUM = 'Premium Performans',
}

export interface Lens {
  id: number;
  brand: string;
  model: string;
  type: LensType;
  material: Material[];
  coatings: Coating[];
  useCases: UseCase[];
  segment: Segment;
  description: string;
  prescriptionRange: {
    minSph: number;
    maxSph: number;
    maxCyl: number;
  };
  features: string[];
}

export interface EyePrescription {
  sph: number;
  cyl: number;
  axis: number;
  add: number;
}

export interface CustomerData {
  name: string;
  age: number;
  profession: string;
  prescription: {
    right: EyePrescription;
    left: EyePrescription;
  };
  lifestyle: {
    digitalUsage: number; // 0-10 scale
    driving: number; // 0-10 scale
    outdoor: number; // 0-10 scale
    sports: number; // 0-10 scale
  };
  preferences: {
    wantsThinLenses: boolean;
  };
}
