<script setup lang="ts">
import TileAdhesiveIntroCard from '@/components/descriptionCards/TileAdhesiveIntroCard.vue'
useSeoMeta({
  title: 'Tile Adhesive Calculator – Professional Glue Estimation',
  description:
    'Professional tile adhesive calculator with trowel and adhesive recommendations based on tile size and installation type.',
})

/* -----------------------
   BASIC INPUTS
------------------------ */
const roomWidth = ref(3.1)
const roomLength = ref(4.1)

const tileWidth = ref(30)
const tileLength = ref(30)

const wastePercent = ref(10)

/* -----------------------
   INSTALLATION TYPE
------------------------ */
type SurfaceType = 'floor' | 'wall'
const surfaceType = ref<SurfaceType>('floor')

type ApplicationType = 'single' | 'double'
const applicationType = ref<ApplicationType>('single')

/* -----------------------
   ADHESIVE TYPES (EN 12004)
------------------------ */
type AdhesiveCategory = 'C1' | 'C2' | 'C2TE' | 'C2TES1' | 'C2TES2'
const adhesiveCategory = ref<AdhesiveCategory>('C2')

const adhesiveInfo: Record<
  AdhesiveCategory,
  { label: string; strength: number }
> = {
  C1: { label: 'C1 – Basic cement adhesive', strength: 1 },
  C2: { label: 'C2 – Improved cement adhesive', strength: 2 },
  C2TE: { label: 'C2TE – Improved, slip-resistant', strength: 2 },
  C2TES1: { label: 'C2TES1 – Flexible (S1)', strength: 3 },
  C2TES2: { label: 'C2TES2 – Highly flexible (S2)', strength: 4 },
}

/* -----------------------
   TROWEL DATA
------------------------ */
type TrowelSize = 4 | 6 | 8 | 10 | 12
const trowelSize = ref<TrowelSize>(6)

const trowelConsumption: Record<TrowelSize, number> = {
  4: 2.2,
  6: 3.2,
  8: 4.2,
  10: 5.5,
  12: 6.8,
}

/* -----------------------
   COMPUTED GEOMETRY
------------------------ */
const area = computed(() => roomWidth.value * roomLength.value)

const tileAreaCm2 = computed(() => tileWidth.value * tileLength.value)
const maxTileSide = computed(() => Math.max(tileWidth.value, tileLength.value))

/* -----------------------
   TROWEL RECOMMENDATION
------------------------ */
const recommendedTrowel = computed<TrowelSize>(() => {
  if (tileAreaCm2.value <= 100) return 4
  if (tileAreaCm2.value <= 900) return 6
  if (tileAreaCm2.value <= 3600) return 8
  if (maxTileSide.value <= 120) return 10
  return 12
})

/* -----------------------
   ADHESIVE RECOMMENDATIONS
------------------------ */
const adhesiveRecommendations = computed<string[]>(() => {
  const recs: string[] = []
  const strength = adhesiveInfo[adhesiveCategory.value].strength

  if (surfaceType.value === 'floor' && strength < 2) {
    recs.push('Floors require at least C2 class adhesive.')
  }

  if (tileAreaCm2.value > 900 && strength < 2) {
    recs.push('Large tiles require at least C2 adhesive.')
  }

  if (maxTileSide.value >= 60 && strength < 3) {
    recs.push('Large-format tiles (≥ 60 cm) should use flexible adhesive (C2 S1).')
  }

  if (maxTileSide.value >= 120 && strength < 4) {
    recs.push('Very large tiles or slabs perform best with highly flexible adhesive (C2 S2).')
  }

  if (tileAreaCm2.value > 900 && applicationType.value === 'single') {
    recs.push('Consider double spreading (back-buttering) for improved coverage.')
  }

  return recs
})

/* -----------------------
   VALIDATION
------------------------ */
const adhesiveWarnings = computed<string[]>(() => {
  const warnings: string[] = []
  const selectedStrength = adhesiveInfo[adhesiveCategory.value].strength

  if (surfaceType.value === 'floor' && selectedStrength < 2) {
    warnings.push('Selected adhesive is not suitable for floor installations.')
  }

  if (maxTileSide.value >= 60 && selectedStrength < 3) {
    warnings.push('Large-format tiles require flexible adhesive (C2 S1 or higher).')
  }

  return warnings
})

/* -----------------------
   CONSUMPTION
------------------------ */
const baseConsumption = computed(() => {
  let base = trowelConsumption[trowelSize.value]
  if (applicationType.value === 'double') base *= 1.2
  return base
})

const totalAdhesiveKg = computed(() => {
  return area.value * baseConsumption.value * (1 + wastePercent.value / 100)
})

const bagsNeeded = computed(() => Math.ceil(totalAdhesiveKg.value / 25))
</script>



<template>
  <TileAdhesiveIntroCard/>
  <article class="card">
    
    <header>
      <h1 class="title">Tile Adhesive Calculator</h1>
      <p>
        Calculate tile glue quantity with professional recommendations based on
        tile size and installation type.
      </p>
      <p class="assumption">
        Assumption: substrate is flat, primed, and requires minimal correction.
      </p>
    </header>

    <section>
      <h2>Room size</h2>
      <div class="form-grid">
        <label class="inline-label">
          <span>Room width (m)</span>
          <input type="number" step="0.1" v-model.number="roomWidth" />
        </label>

        <label class="inline-label">
          <span>Room length (m)</span>
          <input type="number" step="0.1" v-model.number="roomLength" />
        </label>
      </div>
    </section>

    <section>
      <h2>Tile size</h2>
      <div class="form-grid">
        <label class="inline-label">
          <span>Tile width (cm)</span>
          <input type="number" v-model.number="tileWidth" />
        </label>

        <label class="inline-label">
          <span>Tile length (cm)</span>
          <input type="number" v-model.number="tileLength" />
        </label>
      </div>
    </section>

    <section>
      <h2>Installation</h2>
      <div class="form-grid">
        <label class="inline-label">
          <span>Surface type</span>
          <select v-model="surfaceType">
            <option value="floor">Floor</option>
            <option value="wall">Wall</option>
          </select>
        </label>

        <label class="inline-label">
          <span>Application method</span>
          <select v-model="applicationType">
            <option value="single">Single spreading</option>
            <option value="double">Double spreading</option>
          </select>
        </label>
      </div>
    </section>

    <section>
      <h2>Adhesive & Trowel</h2>
      <div class="form-grid">
        <label class="inline-label">
          <span>Adhesive category</span>
          <select v-model="adhesiveCategory">
            <option
              v-for="(info, key) in adhesiveInfo"
              :key="key"
              :value="key"
            >
              {{ info.label }}
            </option>
          </select>
        </label>

        <label class="inline-label">
          <span>Trowel size (mm)</span>
          <div class="field-with-hint">
            <select v-model.number="trowelSize">
              <option :value="4">4 × 4 mm</option>
              <option :value="6">6 × 6 mm</option>
              <option :value="8">8 × 8 mm</option>
              <option :value="10">10 × 10 mm</option>
              <option :value="12">12 × 12 mm</option>
            </select>
            <small class="hint">Recommended: {{ recommendedTrowel }} mm</small>
          </div>
        </label>
      </div>
    </section>

    <section>
      <h2>Extra</h2>
      <label class="inline-label tight">
        <span>Waste percentage (%)</span>
        <input type="number" v-model.number="wastePercent" />
      </label>
    </section>

    <section v-if="adhesiveRecommendations.length" class="info">
      <strong>Professional recommendations:</strong>
      <ul>
        <li v-for="(rec, i) in adhesiveRecommendations" :key="i">
          {{ rec }}
        </li>
      </ul>
    </section>

    <section v-if="adhesiveWarnings.length" class="warning">
      <strong>Warnings:</strong>
      <ul>
        <li v-for="(warn, i) in adhesiveWarnings" :key="i">
          {{ warn }}
        </li>
      </ul>
    </section>

    <section class="result">
      <div><strong>Room area:</strong> {{ area.toFixed(2) }} m²</div>
      <div><strong>Total adhesive:</strong> {{ totalAdhesiveKg.toFixed(1) }} kg</div>
      <div>
        <strong>25 kg bags needed:</strong>
        <span class="bags">{{ bagsNeeded }}</span>
      </div>
    </section>
  </article>
</template>

<style scoped>

.title {
  margin-top: 0px;
}

.assumption {
  font-size: 13px;
  opacity: 0.85;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.inline-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

/* tighter spacing specifically for waste percentage */
.inline-label.tight {
  gap: 6px;
}

.inline-label span {
  flex: 1;
  font-size: 14px;
  opacity: 0.9;
}

.inline-label input,
.inline-label select {
  flex: 1;
  min-width: 120px;
}

.field-with-hint {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

select,
input {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.25);
  color: white;
}

.hint {
  font-size: 12px;
  opacity: 0.75;
}

.info {
  margin-top: 16px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(80, 160, 255, 0.12);
}

.warning {
  margin-top: 16px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 80, 80, 0.15);
  border: 1px solid rgba(255, 80, 80, 0.4);
}

/* darker, emphasized result block */
.result {
  margin-top: 20px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.45);
}

.bags {
  font-size: 26px;
  font-weight: 800;
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

</style>
