
import { lenses } from '../data/lenses';
import { CustomerData, Lens, Segment, UseCase, Material, Coating, LensType } from '../types';

// Helper to map profession strings to UseCases
const analyzeProfession = (profession: string): UseCase[] => {
    const p = profession.toLowerCase();
    const cases: UseCase[] = [];

    // 1. Digital, Tech & Desk-Bound Jobs (Software, Finance, Admin)
    if (p.includes('yazılım') || p.includes('bilgisayar') || p.includes('programcı') || p.includes('kodlama') ||
        p.includes('ofis') || p.includes('masa başı') || p.includes('sekreter') || p.includes('asistan') ||
        p.includes('muhasebe') || p.includes('banka') || p.includes('finans') || p.includes('ekonomist') ||
        p.includes('grafik') || p.includes('tasarım') || p.includes('web') || p.includes('ux') || p.includes('ui') ||
        p.includes('editör') || p.includes('yazar') || p.includes('içerik') || p.includes('copywriter') ||
        p.includes('veri') || p.includes('analist') || p.includes('admin') || p.includes('insan kaynakları') ||
        p.includes('bilişim') || p.includes('çağrı merkezi') || p.includes('müşteri hizmetleri')) {
        cases.push(UseCase.DIGITAL_HEAVY);
        cases.push(UseCase.OFFICE_WORK);
    }

    // 2. Education & Academia
    if (p.includes('öğrenci') || p.includes('akademisyen') || p.includes('öğretmen') || 
        p.includes('eğitmen') || p.includes('profesör') || p.includes('doçent') || 
        p.includes('araştırmacı') || p.includes('okul') || p.includes('kütüphane') || p.includes('rehberlik')) {
        cases.push(UseCase.OFFICE_WORK);
        cases.push(UseCase.DIGITAL_HEAVY); // Modern education is very digital
    }

    // 3. Healthcare & Medical
    if (p.includes('doktor') || p.includes('hekim') || p.includes('cerrah') || p.includes('tıp') ||
        p.includes('diş') || p.includes('ortodontist') || 
        p.includes('hemşire') || p.includes('ebe') || p.includes('paramedik') ||
        p.includes('laborant') || p.includes('biyolog') || p.includes('kimyager') ||
        p.includes('eczacı') || p.includes('veteriner') ||
        p.includes('psikolog') || p.includes('psikiyatrist') || p.includes('fizyoterapist') || p.includes('diyetisyen')) {
        cases.push(UseCase.GENERAL);
        cases.push(UseCase.OFFICE_WORK); // Records, close up work
    }

    // 4. Driving, Logistics & Travel
    if (p.includes('şoför') || p.includes('sürücü') || p.includes('taksi') || p.includes('otobüs') || p.includes('minibüs') ||
        p.includes('kaptan') || p.includes('pilot') || p.includes('makinist') ||
        p.includes('tır') || p.includes('kamyon') || p.includes('nakliye') || p.includes('lojistik') ||
        p.includes('kurye') || p.includes('motorlu') || 
        p.includes('plasiyer') || p.includes('satış temsilcisi') || p.includes('pazarlamacı')) {
        cases.push(UseCase.DRIVER);
    }

    // 5. Outdoor, Active, Field & Physical Work
    if ((p.includes('mühendis') && (p.includes('inşaat') || p.includes('saha') || p.includes('harita') || p.includes('ziraat') || p.includes('jeoloji') || p.includes('orman'))) || 
        p.includes('mimar') && p.includes('peyzaj') ||
        p.includes('spor') || p.includes('futbol') || p.includes('basketbol') || p.includes('voleybol') ||
        p.includes('antrenör') || p.includes('koç') || p.includes('hakem') || p.includes('beden eğitimi') ||
        p.includes('polis') || p.includes('asker') || p.includes('jandarma') || p.includes('bekçi') || p.includes('güvenlik') || 
        p.includes('tarım') || p.includes('çiftçi') || p.includes('bahçıvan') || p.includes('peyzaj') ||
        p.includes('rehber') || p.includes('turizm') ||
        p.includes('kargo') || p.includes('depo')) {
        cases.push(UseCase.OUTDOOR);
        cases.push(UseCase.SPORTS); // Implies durability need
    }

    // 6. Fine Detail, Precision Work, Craftsmanship & Arts
    if (p.includes('mimar') || p.includes('iç mimar') || 
        p.includes('kuyumcu') || p.includes('mücevher') || 
        p.includes('saatçi') || p.includes('saat tamir') ||
        p.includes('terzi') || p.includes('moda') || p.includes('stilist') ||
        p.includes('ressam') || p.includes('illüstratör') || p.includes('sanatçı') || p.includes('heykeltraş') ||
        p.includes('teknisyen') || p.includes('elektronik') || p.includes('tamir') || p.includes('montaj') ||
        p.includes('kuaför') || p.includes('berber') || p.includes('makyöz') || p.includes('estetisyen') || p.includes('dövme') ||
        p.includes('fotoğraf') || p.includes('kamera') || p.includes('yönetmen') ||
        p.includes('diş hekimi') || p.includes('cerrah')) { // Repeated specifically for precision context
        cases.push(UseCase.OFFICE_WORK); // Often implies close/mid range focus
        cases.push(UseCase.GENERAL); 
    }

    return [...new Set(cases)];
};

export function getRecommendations(data: CustomerData): Lens[] {
  const { prescription, lifestyle, preferences, age, profession } = data;

  const rightAdd = prescription.right.add || 0;
  const leftAdd = prescription.left.add || 0;
  const maxAdd = Math.max(rightAdd, leftAdd);

  const isPresbyopic = maxAdd > 0 || age >= 40;
  
  // Analyze Profession
  const professionUseCases = analyzeProfession(profession || '');

  // Calculate Aggregated Prescription Values (Using the "Worst" case of either eye)
  const rightSph = Math.abs(prescription.right.sph || 0);
  const leftSph = Math.abs(prescription.left.sph || 0);
  const maxSph = Math.max(rightSph, leftSph);
  
  // Checking actual values (not abs) for min/max range checks
  const minRawSph = Math.min(prescription.right.sph, prescription.left.sph);
  const maxRawSph = Math.max(prescription.right.sph, prescription.left.sph);

  const rightCyl = Math.abs(prescription.right.cyl || 0);
  const leftCyl = Math.abs(prescription.left.cyl || 0);
  const maxCyl = Math.max(rightCyl, leftCyl);

  const totalPower = maxSph + maxCyl;
  
  const isHighRx = totalPower > 4.00;
  const isHighAstigmatism = maxCyl > 1.50;

  const filteredLenses = lenses.filter(lens => {
    // Filter by prescription type (progressive vs single vision)
    if (isPresbyopic && lens.type === LensType.SINGLE_VISION) return false;
    if (!isPresbyopic && lens.type !== LensType.SINGLE_VISION) return false;

    // Filter by prescription power limits
    // Check if EITHER eye is outside the lens range
    if (minRawSph < lens.prescriptionRange.minSph || maxRawSph > lens.prescriptionRange.maxSph) return false;
    if (maxCyl > lens.prescriptionRange.maxCyl) return false;

    return true;
  });

  const scoredLenses = filteredLenses.map(lens => {
    let score = 0;

    // --- 1. LIFESTYLE SCORING ---
    // Base lifestyle match
    if (lifestyle.digitalUsage > 6 && lens.useCases.includes(UseCase.DIGITAL_HEAVY)) score += 20;
    if (lifestyle.driving > 6 && lens.useCases.includes(UseCase.DRIVER)) score += 20;
    if (lifestyle.outdoor > 6 && lens.useCases.includes(UseCase.OUTDOOR)) score += 15;
    if (lifestyle.sports > 5 && lens.useCases.includes(UseCase.SPORTS)) score += 15;

    // Coating specific bonuses
    if (lifestyle.digitalUsage > 8 && lens.coatings.includes(Coating.BLUE_LIGHT_FILTER)) score += 15;
    if (lifestyle.outdoor > 7 && (lens.coatings.includes(Coating.PHOTOCHROMIC) || lens.coatings.includes(Coating.POLARIZED))) score += 15;
    if (lifestyle.driving > 7 && (lens.coatings.includes(Coating.ANTI_REFLECTIVE) || lens.model.includes('Drive'))) score += 15;

    // --- 2. PROFESSION SCORING (CRITICAL UPDATE) ---
    // If the lens matches the implicit needs of the profession, give a massive boost.
    // This helps specific lenses like "Office" or "DriveSafe" beat generic ones.
    professionUseCases.forEach(useCase => {
        if (lens.useCases.includes(useCase)) {
            score += 35; 
        }
    });

    // --- 3. PRESCRIPTION & MATERIAL SCORING ---
    // High Index Logic
    if (preferences.wantsThinLenses || isHighRx) {
        if (lens.material.includes(Material.HIGH_INDEX_1_74)) score += 30;
        else if (lens.material.includes(Material.HIGH_INDEX_1_67)) score += 25;
        else if (lens.material.includes(Material.HIGH_INDEX_1_60)) score += 15;
        else if (isHighRx) score -= 20; // Penalize basic materials for high prescriptions
    }
    
    // Safety Material Logic
    if (lifestyle.sports > 7 || professionUseCases.includes(UseCase.SPORTS)) {
         if (lens.material.includes(Material.POLYCARBONATE) || lens.material.includes(Material.TRIVEX)) score += 40;
    }

    // --- 4. OPTICAL DESIGN SCORING ---
    // For High Astigmatism or Progressive needs, favor Premium designs (wider field of view)
    if (isHighAstigmatism || (isPresbyopic && totalPower > 3)) {
        if (lens.segment === Segment.PREMIUM) score += 25;
        if (lens.features.some(f => f.includes('Kişiselleştirilmiş') || f.includes('Geniş görüş'))) score += 15;
    }

    return { ...lens, score };
  });

  const findBestInSegment = (segment: Segment): Lens | undefined => {
    const segmentLenses = scoredLenses
      .filter(l => l.segment === segment)
      .sort((a, b) => b.score - a.score);
    return segmentLenses[0];
  };

  const economy = findBestInSegment(Segment.ECONOMY);
  const midRange = findBestInSegment(Segment.MID_RANGE);
  const premium = findBestInSegment(Segment.PREMIUM);
  
  const results = [economy, midRange, premium].filter((lens): lens is Lens => !!lens);

  // Fallback logic to ensure 3 options
  if (results.length < 3) {
      const existingIds = results.map(r => r.id);
      const remaining = scoredLenses
        .filter(l => !existingIds.includes(l.id))
        .sort((a, b) => b.score - a.score);
      
      while (results.length < 3 && remaining.length > 0) {
          results.push(remaining.shift()!);
      }
  }

  // Sort final results by score to ensure the "Best" match is visually highlighted regardless of segment,
  // although usually we display them Low -> High or High -> Low. 
  // Let's return them sorted by segment rank (Eco -> Mid -> Prem) for consistent comparison,
  // but the selection inside those buckets is now much smarter.
  return results.sort((a, b) => {
      const segOrder = { [Segment.ECONOMY]: 1, [Segment.MID_RANGE]: 2, [Segment.PREMIUM]: 3 };
      return segOrder[a.segment] - segOrder[b.segment];
  });
}
