<script setup lang="ts">
import PaintIntroCard from '@/components/descriptionCards/PaintIntroCard.vue'
import GroutIntroCard from '@/components/descriptionCards/PaintIntroCard.vue'
useSeoMeta({
  title: 'Paint Calculator – How Much Paint Do I Need?',
  description:
    'Professional wall paint calculator with dynamic non-paintable areas, surface adjustments, primer support, and custom paint coverage.',
})

/* -----------------------
   WALL GEOMETRY
------------------------ */
const wallWidth = ref(4)
const wallHeight = ref(2.6)

/* -----------------------
   NON-PAINTABLE AREAS
------------------------ */
type VoidArea = {
  id: number
  width: number
  height: number
}

const voidAreas = ref<VoidArea[]>([])
let nextVoidId = 1

const showVoidModal = ref(false)
const voidWidth = ref(1)
const voidHeight = ref(1)

const voidAreaPreview = computed(() =>
  voidWidth.value * voidHeight.value
)

const addVoidArea = () => {
  voidAreas.value.push({
    id: nextVoidId++,
    width: voidWidth.value,
    height: voidHeight.value,
  })
  showVoidModal.value = false
}

const removeVoidArea = (id: number) => {
  voidAreas.value = voidAreas.value.filter(v => v.id !== id)
}

const totalVoidArea = computed(() =>
  voidAreas.value.reduce((sum, v) => sum + v.width * v.height, 0)
)

/* -----------------------
   PAINT PARAMETERS
------------------------ */
const coats = ref(2)
const wastePercent = ref(10)

type SurfaceType = 'smooth' | 'textured' | 'rough'
const surfaceType = ref<SurfaceType>('smooth')

const surfaceMultiplier: Record<SurfaceType, number> = {
  smooth: 1,
  textured: 1.15,
  rough: 1.3,
}

/* -----------------------
   PAINT TYPE & COVERAGE
------------------------ */
type PaintType = 'interior' | 'premium' | 'exterior' | 'custom'
const paintType = ref<PaintType>('interior')

const paintCoverageMap: Record<Exclude<PaintType, 'custom'>, number> = {
  interior: 11,
  premium: 13,
  exterior: 9,
}

const customCoverage = ref(11)

const activeCoverage = computed(() =>
  paintType.value === 'custom'
    ? customCoverage.value
    : paintCoverageMap[paintType.value]
)

/* -----------------------
   PRIMER
------------------------ */
const usePrimer = ref(false)
const primerCoverage = 9

/* -----------------------
   COMPUTED AREAS
------------------------ */
const grossWallArea = computed(() =>
  wallWidth.value * wallHeight.value
)

const netWallArea = computed(() =>
  Math.max(grossWallArea.value - totalVoidArea.value, 0)
)

/* -----------------------
   PAINT CALCULATION
------------------------ */
const adjustedPaintArea = computed(() =>
  netWallArea.value *
  coats.value *
  surfaceMultiplier[surfaceType.value] *
  (1 + wastePercent.value / 100)
)

const paintLiters = computed(() =>
  adjustedPaintArea.value / activeCoverage.value
)

const paintCans10L = computed(() =>
  Math.ceil(paintLiters.value / 10)
)

/* -----------------------
   PRIMER CALCULATION
------------------------ */
const primerLiters = computed(() => {
  if (!usePrimer.value) return 0
  return (
    netWallArea.value *
    surfaceMultiplier[surfaceType.value] *
    (1 + wastePercent.value / 100)
  ) / primerCoverage
})

const primerCans10L = computed(() =>
  Math.ceil(primerLiters.value / 10)
)
</script>

<template>
  <PaintIntroCard/>
  <article class="card">
    <header>
      <h1 class="title">Paint Calculator</h1>
      <p>
        Estimate paint and primer quantities with realistic adjustments
        and dynamic non-paintable areas.
      </p>
    </header>

    <!-- WALL SIZE -->
    <section>
      <h2>Wall size</h2>
      <div class="form-row">
        <label>
          Width (m)
          <input type="number" step="0.1" v-model.number="wallWidth" />
        </label>

        <label>
          Height (m)
          <input type="number" step="0.1" v-model.number="wallHeight" />
        </label>
      </div>
    </section>

    <!-- NON-PAINTABLE AREAS -->
    <section>
      <h2>Non-paintable areas:</h2>

      <button class="add-btn" @click="showVoidModal = true">
        + Add window / door
      </button>

      <div v-if="voidAreas.length" class="void-boxes">
        <div
          v-for="v in voidAreas"
          :key="v.id"
          class="void-box"
        >
          {{ v.width }} × {{ v.height }} m
          ({{ (v.width * v.height).toFixed(2) }} m²)
          <button class="remove" @click="removeVoidArea(v.id)">×</button>
        </div>
      </div>

      <small v-if="voidAreas.length">
        Total excluded area: {{ totalVoidArea.toFixed(2) }} m²
      </small>
    </section>

    <!-- PAINT DETAILS -->
    <section>
      <h2>Paint details</h2>
      <div class="form-grid single-column">
        <label>
          Paint type
          <select v-model="paintType">
            <option value="interior">Interior (11 m²/L)</option>
            <option value="premium">Premium (13 m²/L)</option>
            <option value="exterior">Exterior (9 m²/L)</option>
            <option value="custom">Custom coverage</option>
          </select>
        </label>

        <label v-if="paintType === 'custom'" class="custom-coverage">
          Custom coverage (m² / L)
          <input type="number" step="0.1" v-model.number="customCoverage" />
        </label>

        <label>
          Surface type
          <select v-model="surfaceType">
            <option value="smooth">Smooth</option>
            <option value="textured">Textured</option>
            <option value="rough">Rough / porous</option>
          </select>
        </label>

        <label>
          Number of coats
          <input type="number" min="1" v-model.number="coats" />
        </label>
      </div>
    </section>

    <!-- EXTRA -->
    <section>
      <h2>Extra</h2>
      <div class="form-grid single-column">
        <label>
          Waste percentage (%)
          <input type="number" v-model.number="wastePercent" />
        </label>

        <div class="primer-toggle">
         <span class="checkbox-label"><b>Include primer calculation</b></span>
          <input
            type="checkbox"
            class="checkbox-input"
            v-model="usePrimer"
            id="usePrimer"
         />
        </div>

      </div>
    </section>

    <!-- RESULT -->
    <section class="result">
      <div><strong>Paintable area:</strong> {{ netWallArea.toFixed(2) }} m²</div>
      <div><strong>Total paint:</strong> {{ paintLiters.toFixed(1) }} L</div>
      <div>
        <strong>10 L paint cans:</strong>
        <span class="highlight">{{ paintCans10L }}</span>
      </div>

      <div v-if="usePrimer" style="margin-top: 10px;">
        <strong>Primer:</strong>
        {{ primerLiters.toFixed(1) }} L
        ({{ primerCans10L }} × 10 L)
      </div>
    </section>
  </article>

  <!-- MODAL -->
  <div v-if="showVoidModal" class="modal-backdrop">
    <div class="modal">
      <h3>Add non-paintable area</h3>

      <div class="form-grid single-column">
        <label>
          Width (m)
          <input type="number" step="0.1" v-model.number="voidWidth" />
        </label>

        <label>
          Height (m)
          <input type="number" step="0.1" v-model.number="voidHeight" />
        </label>
      </div>

      <p class="preview">
        Area: {{ voidAreaPreview.toFixed(2) }} m²
      </p>

      <div class="modal-actions">
        <button @click="showVoidModal = false">Cancel</button>
        <button class="confirm" @click="addVoidArea">Add</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: rgba(120, 20, 20, 0.25);
  backdrop-filter: blur(2px);
  border-radius: 14px;
  padding-left: 20px;
}

.title{
    margin-top: 0px;
}

.form-row {
  display: flex;
  gap: 12px;
}

.form-grid {
  display: grid;
  gap: 12px;
}

.single-column {
  grid-template-columns: 1fr;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
select {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.25);
  color: white;
}

.primer-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.checkbox-label {
  font-size: 0.9rem;
  color: #f0f0f0;
  opacity: 0.9;
}

/* Custom checkbox look */
.checkbox-input {
  width: 18px;
  height: 22px;
  cursor: pointer;

  /* Remove default white background */
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.25);

  /* Remove native appearance */
  appearance: none;
  -webkit-appearance: none;

  position: relative;
}

/* Checked state */
.checkbox-input:checked {
  background-color: rgba(255, 80, 80, 0.9);
  border-color: rgba(255, 80, 80, 1);
}

/* Checkmark */
.checkbox-input:checked::after {
  content: "✓";
  color: #fff;
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -58%);
}

.checkbox-input:hover{
 background: rgba(255, 80, 80, 0.25);
  border-color: rgba(255, 80, 80, 0.7);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(255, 80, 80, 0.15);
}



.void-boxes {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.void-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(0,0,0,0.35);
}

.remove {
  background: none;
  border: none;
  color: #ff7070;
  font-size: 18px;
  cursor: pointer;
}

.result {
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(0,0,0,0.35);
}

.highlight {
  font-size: 26px;
  font-weight: 800;
}

/* MODAL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn {
  background: rgba(255, 80, 80, 0.15);
  border: 1px solid rgba(255, 80, 80, 0.45);
  color: #fff;

  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;

  cursor: pointer;
  transition:
    background 0.25s ease,
    transform 0.15s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

/* Hover */
.add-btn:hover {
  background: rgba(255, 80, 80, 0.25);
  border-color: rgba(255, 80, 80, 0.7);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(255, 80, 80, 0.15);
}

/* Click / active */
.add-btn:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(255, 80, 80, 0.2);
}

/* Optional focus (keyboard users) */
.add-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 80, 80, 0.4);
}


.modal {    
  background: rgba(0,0,0,0.85);
  padding: 20px;
  border-radius: 14px;
  width: 320px;
}

.preview {
  margin: 12px 0;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.confirm {
  background: #c94a4a;
}

@keyframes softAppear {
  0% {
    opacity: 0;
    transform: translateY(-4px);
  }
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
  }
}

@keyframes softPulse {
  0% {
    box-shadow: 0 0 0 0 rgb(255, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 6px rgba(227, 9, 9, 0);
  }
}

.custom-coverage {
  animation:
    softAppear 0.5s ease-out,
    softPulse 0.6s ease-out 0.2s;
}





</style>
