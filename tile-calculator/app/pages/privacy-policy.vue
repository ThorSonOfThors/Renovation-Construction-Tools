<template>
  <div class="container readable legal-page">
    <h1>Privacy Policy</h1>

    <p>Last updated: {{ new Date().toLocaleDateString() }}</p>

    <h2>Information We Collect</h2>
    <p>
      We may collect non-personal information such as browser type,
      device information, and usage data for analytics and advertising purposes.
    </p>

    <h2>Cookies</h2>
    <p>
      This website uses cookies to improve user experience and to serve ads
      through Google AdSense. Cookies may be used to personalize ads.
    </p>

    <h2>Third-Party Advertising</h2>
    <p>
      We use Google AdSense to display advertisements. Google may use cookies
      and web beacons to collect information to serve personalized ads.
    </p>

    <p>
      You can learn more about how Google uses data here:
      <a href="https://policies.google.com/technologies/ads" target="_blank">
        https://policies.google.com/technologies/ads
      </a>
    </p>

    <h2>Your Rights (EU Users)</h2>
    <p>
      If you are located in the European Union, you have the right to request
      access, correction, or deletion of your personal data.
    </p>

    <h2>Contact</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact us.
    </p>
  </div>
</template>

<style scoped>
.legal-page {
  padding: 40px 0;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  background-color: rgb(0, 0, 0);
}

</style>
