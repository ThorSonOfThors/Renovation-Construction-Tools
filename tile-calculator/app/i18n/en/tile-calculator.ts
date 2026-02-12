export const tileCalculatorEn = {
  seo: {
    title: 'Tile Calculator – How Many Tiles Do I Need?',
    description:
      'Free tile calculator. Calculate how many tiles you need for floors or walls based on room size and tile dimensions.',
  },

  header: {
    title: 'Tile Calculator',
    description:
      'Calculate how many tiles you need for a room based on its size, tile dimensions, and waste percentage.',
  },

  sections: {
    roomSize: 'Room size',
    tileSize: 'Tile size',
    extra: 'Extra',
  },

  labels: {
    roomWidth: 'Room width (m)',
    roomLength: 'Room length (m)',
    tileWidth: 'Tile width (cm)',
    tileLength: 'Tile length (cm)',
    waste: 'Waste percentage (%)',
  },

  results: {
    roomArea: 'Room area:',
    tilesNeeded: 'Tiles needed:',
    approxCuts: 'Approx. tile cuts:',
    cutsNote:
      'Cut count is an approximation assuming a simple straight layout. Centering, patterns, and obstacles may change the number of cuts.',
  },

  seoText: {
    title: 'How this tile calculator works',
    p1:
      'This calculator divides the total room area by the area of a single tile, then adds extra tiles for cuts, breakage, and layout adjustments.',
    p2:
      'Most professionals recommend adding 10–15% waste depending on tile pattern.',
  },
} as const
