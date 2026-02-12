<script setup lang="ts">
import GroutIntroCard from '@/components/descriptionCards/GroutIntroCard.vue'
useSeoMeta({
  title: 'Grout Calculator – How Much Grout Do I Need?',
  description:
    'Free grout calculator. Estimate grout quantity based on tile size, joint width, and coverage area. Assumes rectified tiles and straight layout.',
})

/* -----------------------
   USER INPUTS
------------------------ */
const area = ref<number>(20)               // m²
const tileWidth = ref<number>(60)          // cm
const tileLength = ref<number>(60)         // cm
const tileThickness = ref<number>(9)       // mm
const jointWidth = ref<number>(2)          // mm
const wastePercent = ref<number>(10)       // %

/* -----------------------
   CONSTANTS / ASSUMPTIONS
------------------------ */
const groutDensity = 1.7 // kg per liter (cement-based grout, average)
const CM_TO_MM = 10

/* -----------------------
   GROUT CALCULATION
------------------------ */
const groutKg = computed(() => {
  if (
    area.value <= 0 ||
    tileWidth.value <= 0 ||
    tileLength.value <= 0 ||
    tileThickness.value <= 0 ||
    jointWidth.value <= 0
  ) {
    return 0
  }

  // Convert tile dimensions from cm → mm
  const W = tileWidth.value * CM_TO_MM
  const L = tileLength.value * CM_TO_MM

  // Already in mm
  const T = tileThickness.value
  const J = jointWidth.value

  /*
    Standard grout consumption formula (metric):

    Grout (kg) =
      Area × (W + L) × J × T × Density
      --------------------------------
                W × L
  */
  const base =
    area.value *
    (W + L) *
    J *
    T *
    groutDensity /
    (W * L)

  const withWaste = base * (1 + wastePercent.value / 100)
  return withWaste
})

/* -----------------------
   BAG ESTIMATION
------------------------ */
const bagSize = 5 // kg
const bagsNeeded = computed(() => {
  if (groutKg.value === 0) return 0
  return Math.ceil(groutKg.value / bagSize)
})
</script>

<template>
  <GroutIntroCard/>
  <article class="card">
    <header>
      <h1>Grout Calculator</h1>
      <p>
        Estimate how much tile grout you need based on tile dimensions, joint
        width, and total coverage area.
      </p>
    </header>

    <section style="margin-top: 20px;">
      <h2>Coverage area</h2>
      <label>
        Area (m²)
        <input type="number" step="0.1" v-model.number="area" />
      </label>
    </section>

    <section style="margin-top: 20px;">
      <h2>Tile dimensions</h2>
      <div class="form-grid">
        <label>
          Tile width (cm)
          <input type="number" v-model.number="tileWidth" />
        </label>
        <label>
          Tile length (cm)
          <input type="number" v-model.number="tileLength" />
        </label>
        <label>
          Tile thickness (mm)
          <input type="number" step="1" v-model.number="tileThickness" />
        </label>
        <label>
          Joint width (mm)
          <input type="number" step="0.5" v-model.number="jointWidth" />
        </label>
      </div>
    </section>

    <section style="margin-top: 20px;">
      <h2>Extra</h2>
      <label>
        Waste allowance (%)
        <input type="number" v-model.number="wastePercent" />
      </label>
    </section>

    <section class="result">
      <div>
        <strong>Total grout required:</strong>
        <span class="tiles">{{ groutKg.toFixed(2) }}</span> kg
      </div>
      <div>
        <strong>Grout bags needed ({{ bagSize }} kg):</strong>
        {{ bagsNeeded }}
      </div>

      <p style="margin-top: 10px; font-size: 13px; opacity: 0.85;">
        Calculation assumes rectified tiles with sharp edges, straight grid
        layout, and low-porosity surfaces. Real-world consumption may vary.
      </p>
    </section>

    <footer class="seo-text">
      <h2>How this grout calculator works</h2>
      <p>
        The calculator estimates grout volume based on joint geometry between
        tiles and converts it to weight using an average cement grout density.
      </p>
      <p>
        A waste allowance is added to account for application loss and cleaning.
        Professionals typically recommend 5–15% extra grout.
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
  background: rgba(36, 35, 118, 0.35);
  backdrop-filter: blur(1px);
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
