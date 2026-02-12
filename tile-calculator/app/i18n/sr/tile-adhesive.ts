export const tileAdhesiveSr = {
  seo: {
    title: 'Kalkulator lepka za pločice – Profesionalna procena količine',
    description: 'Profesionalni kalkulator lepka za pločice sa preporukama za zupce i lepak na osnovu veličine pločica i tipa instalacije.'
  },
  title: 'Kalkulator lepka za pločice',
  description: 'Izračunajte potrebnu količinu lepka za pločice sa profesionalnim preporukama na osnovu veličine pločica i tipa instalacije.',
  assumption: 'Pretpostavka: podloga je ravna, pripremljena i zahteva minimalnu korekciju.',
  sections: {
    roomSize: 'Veličina prostorije',
    tileSize: 'Veličina pločice',
    installation: 'Instalacija',
    adhesiveTrowel: 'Lepak i zupci',
    extra: 'Dodatno'
  },
  inputs: {
    roomWidth: 'Širina prostorije (m)',
    roomLength: 'Dužina prostorije (m)',
    tileWidth: 'Širina pločice (cm)',
    tileLength: 'Dužina pločice (cm)',
    surfaceType: 'Tip površine',
    applicationMethod: 'Način nanošenja',
    adhesiveCategory: 'Kategorija lepka',
    trowelSize: 'Veličina zupca (mm)',
    wastePercentage: 'Procenat otpada (%)'
  },
  options: {
    floor: 'Pod',
    wall: 'Zid',
    singleSpreading: 'Jednostruko nanošenje',
    doubleSpreading: 'Dvostruko nanošenje'
  },
  adhesiveTypes: {
    C1: 'C1 – Osnovni cementni lepak',
    C2: 'C2 – Poboljšani cementni lepak',
    C2TE: 'C2TE – Poboljšani, protiv klizanja',
    C2TES1: 'C2TES1 – Fleksibilan (S1)',
    C2TES2: 'C2TES2 – Veoma fleksibilan (S2)'
  },
  trowelSizes: {
    size4: '4 × 4 mm',
    size6: '6 × 6 mm',
    size8: '8 × 8 mm',
    size10: '10 × 10 mm',
    size12: '12 × 12 mm'
  },
  recommended: 'Preporučeno',
  professionalRecommendations: 'Profesionalne preporuke',
  recommendations: {
    floorRequiresC2: 'Podovi zahtevaju najmanje C2 klasu lepka.',
    largeTilesRequireC2: 'Velike pločice zahtevaju najmanje C2 lepak.',
    largeFormatRequiresFlexible: 'Velikoformatske pločice (≥ 60 cm) treba da koriste fleksibilni lepak (C2 S1).',
    veryLargeTilesRequiresS2: 'Veoma velike pločice ili ploče najbolje rade sa veoma fleksibilnim lepkom (C2 S2).',
    considerDoubleSpreading: 'Razmotrite dvostruko nanošenje (back-buttering) za bolju pokrivenost.'
  },
  warnings: {
    title: 'Upozorenja',
    notSuitableForFloor: 'Izabrani lepak nije pogodan za podne instalacije.',
    largeFormatRequiresFlexible: 'Velikoformatske pločice zahtevaju fleksibilni lepak (C2 S1 ili viši).'
  },
  results: {
    roomArea: 'Površina prostorije',
    totalAdhesive: 'Ukupno lepka',
    bagsNeeded: 'Potrebno vreća od 25 kg'
  }
} as const