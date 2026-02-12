<script setup lang="ts">
import PrimerIntroCard from '@/components/descriptionCards/PaintIntroCard.vue'
import PrmerIntroCard from '~/components/descriptionCards/PrmerIntroCard.vue'
useSeoMeta({
  title: 'Primer Calculator – How Much Primer Do I Need?',
  description:
    'Free primer calculator. Estimate primer quantity based on surface area, substrate absorbency, number of coats, and primer coverage.',
})

/* -----------------------
   DOMAIN TYPES
------------------------ */
type PrimerType = 'acrylic' | 'deep'
type Absorbency = 'low' | 'normal' | 'high' | 'non'

/* -----------------------
   USER INPUTS
------------------------ */
const areaWidth = ref<number>(4)     // meters
const areaHeight = ref<number>(5)    // meters

const absorbency = ref<Absorbency>('normal')
const primerType = ref<PrimerType>('acrylic')
const coats = ref<number>(1)
const wastePercent = ref<number>(5)

// custom coverage override
const useCustomCoverage = ref<boolean>(false)
const customCoverage = ref<number>(10) // m² per liter

/* -----------------------
   COMPUTED AREA
------------------------ */
const area = computed<number>(() => {
  if (areaWidth.value <= 0 || areaHeight.value <= 0) return 0
  return areaWidth.value * areaHeight.value
})

/* -----------------------
   COVERAGE TABLE (m²/L)
------------------------ */
const coverageTable: Record<PrimerType, Record<Absorbency, number>> = {
  acrylic: {
    low: 15,
    normal: 10,
    high: 6,
    non: 12,
  },
  deep: {
    low: 12,
    normal: 8,
    high: 5,
    non: 10,
  },
}

/* -----------------------
   EFFECTIVE COVERAGE
------------------------ */
const effectiveCoverage = computed<number>(() => {
  if (useCustomCoverage.value && customCoverage.value > 0) {
    return customCoverage.value
  }

  return coverageTable[primerType.value][absorbency.value]
})

/* -----------------------
   PRIMER CALCULATION
------------------------ */
const primerLiters = computed<number>(() => {
  if (
    area.value <= 0 ||
    effectiveCoverage.value <= 0 ||
    coats.value <= 0
  ) {
    return 0
  }

  const base =
    (area.value / effectiveCoverage.value) * coats.value

  const withWaste = base * (1 + wastePercent.value / 100)
  return withWaste
})

/* -----------------------
   CONTAINER ESTIMATION
------------------------ */
const containerSize = 5 // liters
const containersNeeded = computed<number>(() => {
  if (primerLiters.value === 0) return 0
  return Math.ceil(primerLiters.value / containerSize)
})
</script>

<template>
  <PrmerIntroCard/>
  <article class="card">
    <header>
      <h1>Primer Calculator</h1>
      <p>
        Estimate how much primer you need based on surface dimensions, substrate
        absorbency, primer type, and number of coats.
      </p>
    </header>

    <section style="margin-top: 20px;">
      <h2>Surface dimensions</h2>
      <div class="form-grid">
        <label>
          Width (m)
          <input type="number" step="0.1" v-model.number="areaWidth" />
        </label>

        <label>
          Height (m)
          <input type="number" step="0.1" v-model.number="areaHeight" />
        </label>
      </div>
    </section>

    <section style="margin-top: 20px;">
      <h2>Surface & primer</h2>
      <div class="form-grid">
        <label>
          Substrate absorbency
          <select v-model="absorbency">
            <option value="low">Low (dense, smooth)</option>
            <option value="normal">Normal</option>
            <option value="high">High (porous, dusty)</option>
            <option value="non">Non-absorbent</option>
          </select>
        </label>

        <label>
          Primer type
          <select v-model="primerType">
            <option value="acrylic">Standard acrylic</option>
            <option value="deep">Deep penetration</option>
          </select>
        </label>

        <label>
          Number of coats
          <input type="number" min="1" v-model.number="coats" />
        </label>

        <label>
          Waste allowance (%)
          <input type="number" v-model.number="wastePercent" />
        </label>
      </div>
    </section>

    <section style="margin-top: 20px;">
      <h2>Coverage override</h2>

      <div style="display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" v-model="useCustomCoverage" class="custom-checkbox" />
        <label style="margin: 0;">
          Use custom primer coverage
        </label>
      </div>

      <label
        v-if="useCustomCoverage"
        style="margin-top: 10px; display: block;"
      >
        Coverage (m² per liter)
        <input type="number" step="0.1" v-model.number="customCoverage" />
      </label>

      <p style="font-size: 13px; opacity: 0.8; margin-top: 6px;">
        Use the coverage value stated on your primer's technical datasheet.
      </p>
    </section>

    <section class="result">
      <div>
        <strong>Coverage area:</strong>
        {{ area.toFixed(2) }} m²
      </div>

      <div style="margin-top: 6px;">
        <strong>Total primer required:</strong>
        <span class="tiles">{{ primerLiters.toFixed(2) }}</span> liters
      </div>

      <div>
        <strong>Containers needed ({{ containerSize }} L):</strong>
        {{ containersNeeded }}
      </div>

      <p style="margin-top: 10px; font-size: 13px; opacity: 0.85;">
        Assumes roller application, even surface, uniform absorbency, and no
        dilution. Consumption may vary depending on substrate condition and
        manufacturer specifications.
      </p>
    </section>

    <footer class="seo-text">
      <h2>How this primer calculator works</h2>
      <p>
        The calculator determines surface area from the entered dimensions, then
        estimates primer consumption using typical coverage rates based on
        substrate absorbency and primer type.
      </p>

      <p>
        Assumes uniform substrate absorbency across the entire surface and
        consistent coverage across all coats.
      </p>

      <p>
        A waste allowance is added to account for application loss. Always follow
        the manufacturer’s technical documentation for best results.
      </p>
    </footer>
  </article>
</template>

<style scoped>
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

input,
select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.25);
  color: white;
}

.result {
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.35);
}

.tiles {
  font-size: 26px;
  font-weight: 800;
}

.seo-text {
  margin-top: 28px;
  font-size: 14px;
}

.card {
  background: rgba(0, 0, 0, 0.35);
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

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

input,
select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.2);
  color: white;
}

.result {
  margin-top: 24px;
  padding: 16px;
  border-radius: 8px;
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
  background: rgba(249, 249, 249, 0.35);
  backdrop-filter: blur(12px);
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}



.custom-checkbox {
  width: 18px;
  height: 22px;
  cursor: pointer;
  background-color: rgba(52, 53, 57, 0.45);
  border-radius: 4px;
  border: 1px solid rgba(0, 13, 255, 0.25);
  appearance: none;
  -webkit-appearance: none;
  position: relative;
}

.custom-checkbox:checked {
  background-color: rgba(112, 107, 130, 0.9);
  border-color: rgb(110, 161, 194);
}

.custom-checkbox:checked::after {
  content: "✓";
  color: #6f6581;
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -58%);
}

.custom-checkbox:hover {
  background: rgba(195, 196, 228, 0.25);
  border-color: rgba(87, 87, 93, 0.7);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(212, 1, 219, 0.15);
}


</style>
