export const paintCalculatorEn = {
  seo: {
    title: 'Paint Calculator – How Much Paint Do I Need?',
    description: 'Professional wall paint calculator with dynamic non-paintable areas, surface adjustments, primer support, and custom paint coverage.'
  },
  title: 'Paint Calculator',
  description: 'Estimate paint and primer quantities with realistic adjustments and dynamic non-paintable areas.',
  sections: {
    wallSize: 'Wall size',
    nonPaintableAreas: 'Non-paintable areas:',
    paintDetails: 'Paint details',
    extra: 'Extra'
  },
  inputs: {
    width: 'Width (m)',
    height: 'Height (m)',
    paintType: 'Paint type',
    customCoverage: 'Custom coverage (m² / L)',
    surfaceType: 'Surface type',
    numberOfCoats: 'Number of coats',
    wastePercentage: 'Waste percentage (%)',
    includePrimer: 'Include primer calculation'
  },
  paintTypes: {
    interior: 'Interior (11 m²/L)',
    premium: 'Premium (13 m²/L)',
    exterior: 'Exterior (9 m²/L)',
    custom: 'Custom coverage'
  },
  surfaceTypes: {
    smooth: 'Smooth',
    textured: 'Textured',
    rough: 'Rough / porous'
  },
  buttons: {
    addVoidArea: '+ Add window / door',
    cancel: 'Cancel',
    add: 'Add'
  },
  units: {
    meters: 'm'
  },
  totalExcludedArea: 'Total excluded area',
  modal: {
    title: 'Add non-paintable area',
    area: 'Area'
  },
  results: {
    paintableArea: 'Paintable area',
    totalPaint: 'Total paint',
    paintCans: '10 L paint cans',
    primer: 'Primer'
  }
} as const