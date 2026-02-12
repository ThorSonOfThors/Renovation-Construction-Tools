<script setup lang="ts">
import TileIntroCard from '@/components/descriptionCards/TileIntroCard.vue'
useSeoMeta({
  title: 'Tile Calculator – How Many Tiles Do I Need?',
  description: 'Free tile calculator. Calculate how many tiles you need for floors or walls based on room size and tile dimensions.',
})

const roomWidth = ref<number>(3.1)
const roomLength = ref<number>(4.1)
const tileWidth = ref<number>(30.1)
const tileLength = ref<number>(30.1)
const wastePercent = ref<number>(10)

/* -----------------------
   BASIC AREA CALCULATION
------------------------ */
const area = computed(() => roomWidth.value * roomLength.value)

/* -----------------------
   TILE COUNT
------------------------ */
const tilesNeeded = computed(() => {
  const tileArea = (tileWidth.value / 100) * (tileLength.value / 100)
  if (tileArea === 0) return 0
  const rawTiles = area.value / tileArea
  const withWaste = rawTiles * (1 + wastePercent.value / 100)
  return Math.ceil(withWaste)
})

/* -----------------------
   APPROXIMATE CUTS LOGIC
------------------------ */
const tileWidthM = computed(() => tileWidth.value / 100)
const tileLengthM = computed(() => tileLength.value / 100)

const tilesAlongWidth = computed(() => tileWidthM.value === 0 ? 0 : roomWidth.value / tileWidthM.value)
const tilesAlongLength = computed(() => tileLengthM.value === 0 ? 0 : roomLength.value / tileLengthM.value)

const approxCuts = computed(() => {
  if (tileWidthM.value === 0 || tileLengthM.value === 0) return 0
  const widthHasRemainder = tilesAlongWidth.value % 1 !== 0
  const lengthHasRemainder = tilesAlongLength.value % 1 !== 0
  let cuts = 0
  if (widthHasRemainder) cuts += Math.floor(tilesAlongLength.value)
  if (lengthHasRemainder) cuts += Math.floor(tilesAlongWidth.value)
  return Math.max(cuts, 0)
})
</script>

<template>
  <TileIntroCard>
  </TileIntroCard>
  <article class="card">
    <header>
      <h1>Tile Calculator</h1>
      <p>
        Calculate how many tiles you need for a room based on its size, tile dimensions, and waste percentage.
      </p>
    </header>

    <section style="margin-top: 20px;">
      <h2>Room size</h2>
      <div class="form-grid">
        <label>
          Room width (m)
          <input type="number" step="0.1" v-model.number="roomWidth" />
        </label>
        <label>
          Room length (m)
          <input type="number" step="0.1" v-model.number="roomLength" />
        </label>
      </div>
    </section>

    <section style="margin-top: 20px;">
      <h2>Tile size</h2>
      <div class="form-grid">
        <label>
          Tile width (cm)
          <input type="number" v-model.number="tileWidth" />
        </label>
        <label>
          Tile length (cm)
          <input type="number" v-model.number="tileLength" />
        </label>
      </div>
    </section>

    <section style="margin-top: 20px;">
      <h2>Extra</h2>
      <label>
        Waste percentage (%)
        <input type="number" v-model.number="wastePercent" />
      </label>
    </section>

    <section class="result">
      <div>
        <strong>Room area:</strong> {{ area.toFixed(2) }} m²
      </div>
      <div>
        <strong>Tiles needed:</strong>
        <span class="tiles">{{ tilesNeeded }}</span>
      </div>
      <div>
        <strong>Approx. tile cuts:</strong> {{ approxCuts }}
      </div>
      <p style="margin-top: 8px; font-size: 13px; opacity: 0.8;">
        Cut count is an approximation assuming a simple straight layout. Centering, patterns, and obstacles may change the number of cuts.
      </p>
    </section>

    <footer class="seo-text">
      <h2>How this tile calculator works</h2>
      <p>
        This calculator divides the total room area by the area of a single tile, then adds extra tiles for cuts, breakage, and layout adjustments.
      </p>
      <p>
        Most professionals recommend adding 10–15% waste depending on tile pattern.
      </p>
    </footer>
  </article>
</template>

<style scoped>
h1 {
  margin-top: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.2);
  color: white;
}

.result {
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(0,0,0,0.35);
}

.tiles {
  font-size: 28px;
  font-weight: 800;
}

.seo-text {
  margin-top: 28px;
  font-size: 14px;
}

.card {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(1px);
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>