<template>
  <header class="site-header" role="banner">
    <div class="container header-inner">
      <div class="brand">
        <router-link to="/" class="brand-link" @click.native="closeMenu"><strong>TicketPro</strong></router-link>
      </div>

      <button class="menu-toggle" @click="toggle" :aria-expanded="open" aria-label="Toggle navigation">
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
      </button>

      <nav :class="['main-nav', open ? 'open' : '']" aria-label="Main navigation">
        <router-link to="/" class="nav-link" :class="{ 'active-link': isActive('/') }" @click.native="closeMenu">Home</router-link>

        <template v-if="!isAuthenticated">
          <router-link to="/auth/login" class="nav-link" :class="{ 'active-link': isActive('/auth/login') }" @click.native="closeMenu">Login</router-link>
          <router-link to="/auth/signup" class="nav-link" :class="{ 'active-link': isActive('/auth/signup') }" @click.native="closeMenu">Get Started</router-link>
        </template>

        <template v-else>
          <router-link to="/dashboard" class="nav-link" :class="{ 'active-link': isActive('/dashboard') }" @click.native="closeMenu">Dashboard</router-link>
          <router-link to="/tickets" class="nav-link" :class="{ 'active-link': isActive('/tickets') }" @click.native="closeMenu">Tickets</router-link>
          <button class="nav-link btn-link" @click="handleLogout">Logout</button>
          <span class="user-pill" aria-hidden>{{ user?.name }}</span>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "../composables/useAuth";

export default {
  setup() {
    const open = ref(false);
    const toggle = () => (open.value = !open.value);
    const closeMenu = () => (open.value = false);
    const router = useRouter();
    const route = useRoute();
    const { isAuthenticated, user, logout } = useAuth();

    const isActive = (path) => route.path === path;

    function handleLogout() {
      logout();
      closeMenu();
      router.push("/auth/login");
    }

    return { open, toggle, closeMenu, isAuthenticated, user, logout, handleLogout, isActive };
  },
};
</script>
