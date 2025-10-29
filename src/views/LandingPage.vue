<template>
  <section class="landing">
    <div class="hero">
      <div class="hero-inner container">
        <div class="hero-content">
          <h1>TicketPro — Manage support tickets with ease</h1>
          <p class="lead">Create, track, and resolve tickets. Built for Frontend Stage 2 — consistent across frameworks.</p>
          <div class="hero-cta">
            <router-link to="/auth/signup" class="btn btn-primary">Get Started</router-link>
            <router-link to="/auth/login" class="btn btn-ghost">Login</router-link>
          </div>
        </div>
        <div class="hero-art" aria-hidden>
          <div class="decor-circle decor-circle-1"></div>
          <div class="decor-circle decor-circle-2"></div>
        </div>
      </div>

      <svg class="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,32 C360,120 1080,0 1440,64 L1440 120 L0 120 Z" fill="#f4f7ff"></path>
      </svg>
    </div>

    <section class="features container">
      <div class="card"><h3>Fast Setup</h3><p>Simulated auth & local CRUD — no backend required.</p></div>
      <div class="card"><h3>Responsive</h3><p>Mobile-first layout with collapsible navigation.</p></div>
      <div class="card"><h3>Accessible</h3><p>Semantic HTML, visible focus states, and contrast.</p></div>
    </section>
  </section>
</template>

<script>
export default { name: "LandingPage" };
</script>
