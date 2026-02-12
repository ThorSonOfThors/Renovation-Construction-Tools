export const tileAdhesiveEn = {
  seo: {
    title: 'Tile Adhesive Calculator – Professional Glue Estimation',
    description: 'Professional tile adhesive calculator with trowel and adhesive recommendations based on tile size and installation type.'
  },
  title: 'Tile Adhesive Calculator',
  description: 'Calculate tile glue quantity with professional recommendations based on tile size and installation type.',
  assumption: 'Assumption: substrate is flat, primed, and requires minimal correction.',
  sections: {
    roomSize: 'Room size',
    tileSize: 'Tile size',
    installation: 'Installation',
    adhesiveTrowel: 'Adhesive & Trowel',
    extra: 'Extra'
  },
  inputs: {
    roomWidth: 'Room width (m)',
    roomLength: 'Room length (m)',
    tileWidth: 'Tile width (cm)',
    tileLength: 'Tile length (cm)',
    surfaceType: 'Surface type',
    applicationMethod: 'Application method',
    adhesiveCategory: 'Adhesive category',
    trowelSize: 'Trowel size (mm)',
    wastePercentage: 'Waste percentage (%)'
  },
  options: {
    floor: 'Floor',
    wall: 'Wall',
    singleSpreading: 'Single spreading',
    doubleSpreading: 'Double spreading'
  },
  adhesiveTypes: {
    C1: 'C1 – Basic cement adhesive',
    C2: 'C2 – Improved cement adhesive',
    C2TE: 'C2TE – Improved, slip-resistant',
    C2TES1: 'C2TES1 – Flexible (S1)',
    C2TES2: 'C2TES2 – Highly flexible (S2)'
  },
  trowelSizes: {
    size4: '4 × 4 mm',
    size6: '6 × 6 mm',
    size8: '8 × 8 mm',
    size10: '10 × 10 mm',
    size12: '12 × 12 mm'
  },
  recommended: 'Recommended',
  professionalRecommendations: 'Professional recommendations',
  recommendations: {
    floorRequiresC2: 'Floors require at least C2 class adhesive.',
    largeTilesRequireC2: 'Large tiles require at least C2 adhesive.',
    largeFormatRequiresFlexible: 'Large-format tiles (≥ 60 cm) should use flexible adhesive (C2 S1).',
    veryLargeTilesRequiresS2: 'Very large tiles or slabs perform best with highly flexible adhesive (C2 S2).',
    considerDoubleSpreading: 'Consider double spreading (back-buttering) for improved coverage.'
  },
  warnings: {
    title: 'Warnings',
    notSuitableForFloor: 'Selected adhesive is not suitable for floor installations.',
    largeFormatRequiresFlexible: 'Large-format tiles require flexible adhesive (C2 S1 or higher).'
  },
  results: {
    roomArea: 'Room area',
    totalAdhesive: 'Total adhesive',
    bagsNeeded: '25 kg bags needed'
  }
} as const