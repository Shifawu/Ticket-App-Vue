<template>
  <div class="app-wrapper">
    <Header />
    <main class="container" role="main">
      <router-view />
    </main>
    <Footer />
    <ToastContainer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ToastContainer from "./components/ToastContainer.vue";

export default {
  components: { Header, Footer, ToastContainer },
};
</script>
