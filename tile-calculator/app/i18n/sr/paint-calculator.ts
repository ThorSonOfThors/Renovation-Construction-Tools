export const paintCalculatorSr = {
  seo: {
    title: 'Kalkulator boje – Koliko boje mi treba?',
    description: 'Profesionalni kalkulator boje za zidove sa dinamičkim prilagodljivim površinama, podešavanjima za različite podloge, podrškom za prajmer i prilagodljivom pokrovnošću boje.'
  },
  title: 'Kalkulator boje',
  description: 'Procenite potrebnu količinu boje i prajmera sa realnim prilagođavanjima i dinamičkim neobojljivim površinama.',
  sections: {
    wallSize: 'Veličina zida',
    nonPaintableAreas: 'Neobojljive površine:',
    paintDetails: 'Detalji boje',
    extra: 'Dodatno'
  },
  inputs: {
    width: 'Širina (m)',
    height: 'Visina (m)',
    paintType: 'Tip boje',
    customCoverage: 'Prilagođena pokrovnost (m² / L)',
    surfaceType: 'Tip površine',
    numberOfCoats: 'Broj slojeva',
    wastePercentage: 'Procenat otpada (%)',
    includePrimer: 'Uključi kalkulaciju prajmera'
  },
  paintTypes: {
    interior: 'Interijer (11 m²/L)',
    premium: 'Premium (13 m²/L)',
    exterior: 'Eksterijer (9 m²/L)',
    custom: 'Prilagođena pokrovnost'
  },
  surfaceTypes: {
    smooth: 'Glatka',
    textured: 'Teksturirana',
    rough: 'Hrapava / porozna'
  },
  buttons: {
    addVoidArea: '+ Dodaj prozor / vrata',
    cancel: 'Otkaži',
    add: 'Dodaj'
  },
  units: {
    meters: 'm'
  },
  totalExcludedArea: 'Ukupna isključena površina',
  modal: {
    title: 'Dodaj neobojljivu površinu',
    area: 'Površina'
  },
  results: {
    paintableArea: 'Obojljiva površina',
    totalPaint: 'Ukupno boje',
    paintCans: 'Kontejneri od 10 L',
    primer: 'Prajmer'
  }
} as const