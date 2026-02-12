<template>
  <article class="card intro-card">
    <h2>Plan Your Renovation with Precision</h2>

    <p>
    Our Paint Calculator helps homeowners, professional painters, and DIY enthusiasts accurately determine how much paint is needed for any renovation project. By entering wall width and height, the calculator automatically calculates the total coverage area, giving you a precise starting point for material estimation.
    </p>

    <p>
    To reflect real-world conditions, users can subtract non-paintable areas such as windows and doors by entering their dimensions. The calculator then adjusts the total paintable surface automatically. You can also input the paint’s coverage rate (m² per liter, as stated on the paint can), select surface type, and define the number of coats required.
    </p>

    <p>
    With accurate mathematical calculations and practical adjustments, this tool helps reduce material costs, avoid shortages, and streamline renovation planning. If you’ve ever wondered “how much paint do I need?”, this is a must-have tool for your home improvement project.
    </p>

  </article>
</template>

<style scoped>
.card {
  background: rgba(120, 20, 20, 0.25);
  backdrop-filter: blur(2px);
  border-radius: 12px;
  padding: 20px;
}

.intro-card {
  margin-bottom: 24px;
}

h2 {
  margin-top: 0;
}

p {
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.9;
}
@media (max-width: 480px) {
  p {
    font-size: 18px;
  }
}
</style>
