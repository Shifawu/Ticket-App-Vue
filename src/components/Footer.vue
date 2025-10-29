<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-inner">
      <p>© {{ year }} TicketPro — Frontend Stage 2 Task</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return { year: new Date().getFullYear() };
  },
};
</script>
