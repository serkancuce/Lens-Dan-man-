
import { Lens, LensType, Material, Coating, UseCase, Segment } from '../types';

export const lenses: Lens[] = [
  // Essilor
  {
    id: 1,
    brand: 'Essilor',
    model: 'Varilux Comfort Max',
    type: LensType.PROGRESSIVE,
    material: [Material.CR39, Material.HIGH_INDEX_1_60, Material.HIGH_INDEX_1_67],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.SCRATCH_RESISTANT, Coating.UV_PROTECTION, Coating.HYDROPHOBIC],
    useCases: [UseCase.GENERAL, UseCase.OFFICE_WORK],
    segment: Segment.MID_RANGE,
    description: 'Yakından uzağa yumuşak geçişler ve daha geniş görüş alanları sağlar.',
    prescriptionRange: { minSph: -10, maxSph: 6, maxCyl: 4 },
    features: ['Geniş görüş alanları', 'Kolay adaptasyon', 'Azaltılmış dalgalanma etkisi']
  },
  {
    id: 2,
    brand: 'Essilor',
    model: 'Varilux X Series',
    type: LensType.PROGRESSIVE,
    material: [Material.HIGH_INDEX_1_60, Material.HIGH_INDEX_1_67, Material.HIGH_INDEX_1_74],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.BLUE_LIGHT_FILTER, Coating.SCRATCH_RESISTANT, Coating.UV_PROTECTION, Coating.HYDROPHOBIC, Coating.PHOTOCHROMIC],
    useCases: [UseCase.GENERAL, UseCase.DIGITAL_HEAVY, UseCase.OFFICE_WORK],
    segment: Segment.PREMIUM,
    description: 'En gelişmiş progresif cam, "dengesizlik" hissini ortadan kaldırmak ve kol mesafesinde keskin görüş sağlamak için tasarlanmıştır.',
    prescriptionRange: { minSph: -12, maxSph: 8, maxCyl: 6 },
    features: ["Kol mesafesi görüşü için Xtend Teknolojisi", "Alışkanlıklarınıza göre kişiselleştirilmiş", "Üstün netlik ve konfor"]
  },
  {
    id: 3,
    brand: 'Essilor',
    model: 'Eyezen Start',
    type: LensType.SINGLE_VISION,
    material: [Material.CR39, Material.POLYCARBONATE, Material.HIGH_INDEX_1_60],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.BLUE_LIGHT_FILTER, Coating.SCRATCH_RESISTANT, Coating.UV_PROTECTION],
    useCases: [UseCase.DIGITAL_HEAVY, UseCase.GENERAL],
    segment: Segment.MID_RANGE,
    description: 'Dijital ekran kullanımı için geliştirilmiş, göz yorgunluğunu azaltan tek odaklı camlar.',
    prescriptionRange: { minSph: -8, maxSph: 6, maxCyl: 4 },
    features: ['Mavi Işık Filtreleme', 'Dijital Göz Yorgunluğunu Azaltır', 'Net uzak görüş']
  },
  // Zeiss
  {
    id: 4,
    brand: 'Zeiss',
    model: 'SmartLife Progressive',
    type: LensType.PROGRESSIVE,
    material: [Material.HIGH_INDEX_1_60, Material.HIGH_INDEX_1_67, Material.HIGH_INDEX_1_74],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.BLUE_LIGHT_FILTER, Coating.UV_PROTECTION, Coating.HYDROPHOBIC, Coating.PHOTOCHROMIC],
    useCases: [UseCase.GENERAL, UseCase.DIGITAL_HEAVY, UseCase.DRIVER],
    segment: Segment.PREMIUM,
    description: 'Bağlantılı ve hareketli bir yaşam tarzı için tasarlanmış, her mesafede ve her yönde net görüş sağlar.',
    prescriptionRange: { minSph: -12, maxSph: 8, maxCyl: 6 },
    features: ['Dijital cihaz kullanımı için optimize edilmiştir', 'Mükemmel netlik', 'DuraVision Platinum kaplama']
  },
  {
    id: 5,
    brand: 'Zeiss',
    model: 'DriveSafe',
    type: LensType.SINGLE_VISION,
    material: [Material.CR39, Material.HIGH_INDEX_1_60, Material.HIGH_INDEX_1_67],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.UV_PROTECTION, Coating.SCRATCH_RESISTANT],
    useCases: [UseCase.DRIVER, UseCase.GENERAL],
    segment: Segment.MID_RANGE,
    description: 'Sürüş için optimize edilmiştir, karşıdan gelen far parlamasını azaltır ve düşük ışıkta görüşü iyileştirir.',
    prescriptionRange: { minSph: -10, maxSph: 8, maxCyl: 4 },
    features: ['Luminance Design Teknolojisi', 'Gece parlamasını azaltır', 'Yolun doğru görüşü']
  },
  // Hoya
  {
    id: 6,
    brand: 'Hoya',
    model: 'iD MyStyle 2',
    type: LensType.PROGRESSIVE,
    material: [Material.TRIVEX, Material.HIGH_INDEX_1_67, Material.HIGH_INDEX_1_74],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.BLUE_LIGHT_FILTER, Coating.UV_PROTECTION, Coating.HYDROPHOBIC],
    useCases: [UseCase.GENERAL, UseCase.DIGITAL_HEAVY, UseCase.OFFICE_WORK],
    segment: Segment.PREMIUM,
    description: 'Kristal netliğinde, stabil bir görüş için kişisel ihtiyaçlarınıza göre tamamen kişiselleştirilmiş bir progresif cam.',
    prescriptionRange: { minSph: -14, maxSph: 9, maxCyl: 6 },
    features: ['%100 Kişiselleştirilmiş', 'Binoküler Uyumlaştırma Teknolojisi', 'Olağanüstü dayanıklılık']
  },
  {
    id: 7,
    brand: 'Hoya',
    model: 'Phoenix',
    type: LensType.SINGLE_VISION,
    material: [Material.TRIVEX, Material.POLYCARBONATE],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.SCRATCH_RESISTANT, Coating.UV_PROTECTION],
    useCases: [UseCase.SPORTS, UseCase.GENERAL, UseCase.OUTDOOR],
    segment: Segment.MID_RANGE,
    description: "Trivex'ten yapılmış bu camlar hafiftir, darbelere dayanıklıdır ve üstün optik netlik sunar.",
    prescriptionRange: { minSph: -8, maxSph: 6, maxCyl: 4 },
    features: ['Darbeye Dayanıklı (Trivex)', 'Hafif ve Konforlu', '%100 UV Koruma']
  },
   // Fuji (Merve Optik)
  {
    id: 8,
    brand: 'Fuji',
    model: 'Icon AI',
    type: LensType.PROGRESSIVE,
    material: [Material.HIGH_INDEX_1_60, Material.HIGH_INDEX_1_67, Material.HIGH_INDEX_1_74],
    coatings: [Coating.BLUE_LIGHT_FILTER, Coating.HYDROPHOBIC, Coating.ANTI_REFLECTIVE, Coating.UV_PROTECTION],
    useCases: [UseCase.DIGITAL_HEAVY, UseCase.OFFICE_WORK, UseCase.GENERAL],
    segment: Segment.PREMIUM,
    description: 'Modern bir yaşam tarzı için yapay zeka destekli tasarım. Hem dijital hem de dış mekan kullanımı için üstün konfor, estetik ve dayanıklılık sunar.',
    prescriptionRange: { minSph: -12, maxSph: 8, maxCyl: 6 },
    features: ['Yapay Zeka Destekli Özel Tasarım', 'Opsiyonel NeoChromic Fotokromik', 'BlueSafe mavi ışık koruması', 'İnce ve hafif']
  },
  // Economy Options
  {
    id: 9,
    brand: 'Generic',
    model: 'Standard Progressive',
    type: LensType.PROGRESSIVE,
    material: [Material.CR39],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.SCRATCH_RESISTANT],
    useCases: [UseCase.GENERAL],
    segment: Segment.ECONOMY,
    description: 'Her mesafede net görüş için güvenilir ve uygun fiyatlı bir progresif cam.',
    prescriptionRange: { minSph: -8, maxSph: 6, maxCyl: 4 },
    features: ['Uygun maliyetli çözüm', 'Standart AR kaplama', 'Temel çok odaklı görüş']
  },
  {
    id: 10,
    brand: 'Generic',
    model: 'Standard SV ARC',
    type: LensType.SINGLE_VISION,
    material: [Material.CR39],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.SCRATCH_RESISTANT],
    useCases: [UseCase.GENERAL],
    segment: Segment.ECONOMY,
    description: 'Temel görsel ihtiyaçlar için antirefle kaplamalı standart bir tek odaklı cam.',
    prescriptionRange: { minSph: -6, maxSph: 6, maxCyl: 2 },
    features: ['Uygun fiyatlı', 'Temel yansımaları azaltır', 'Dayanıklı çizilme direnci']
  },
  // Rodenstock
  {
    id: 11,
    brand: 'Rodenstock',
    model: 'Impression FreeSign 3',
    type: LensType.PROGRESSIVE,
    material: [Material.HIGH_INDEX_1_67, Material.HIGH_INDEX_1_74],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.HYDROPHOBIC, Coating.UV_PROTECTION, Coating.PHOTOCHROMIC],
    useCases: [UseCase.GENERAL, UseCase.DIGITAL_HEAVY, UseCase.DRIVER],
    segment: Segment.PREMIUM,
    description: 'Gözlerinize ve kişisel izleme alışkanlıklarınıza mükemmel şekilde uyarlanmış, kişiye özel üretilen progresif camlar.',
    prescriptionRange: { minSph: -14, maxSph: 10, maxCyl: 6 },
    features: ['Tamamen Kişiselleştirilmiş', 'Göz Lens Teknolojisi', 'Sınırsız görüş alanları']
  },
  {
    id: 12,
    brand: 'Zeiss',
    model: 'GT2 Progressive',
    type: LensType.PROGRESSIVE,
    material: [Material.CR39, Material.POLYCARBONATE, Material.HIGH_INDEX_1_60],
    coatings: [Coating.ANTI_REFLECTIVE, Coating.SCRATCH_RESISTANT, Coating.UV_PROTECTION],
    useCases: [UseCase.GENERAL],
    segment: Segment.ECONOMY,
    description: "Zeiss'ten klasik bir progresif tasarım, kalite ve değer arasında iyi bir denge sunar.",
    prescriptionRange: { minSph: -9, maxSph: 6, maxCyl: 4 },
    features: ['Kanıtlanmış tasarım', 'İyi görsel konfor', 'Mükemmel değer']
  }
];
