import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Dashboard from "../views/Dashboard.vue";
import TicketManager from "../views/TicketManager.vue";

const routes = [
  { path: "/", name: "Home", component: LandingPage },
  { path: "/auth/login", name: "Login", component: Login },
  { path: "/auth/signup", name: "Signup", component: Signup },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/tickets", name: "Tickets", component: TicketManager, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("ticketapp_session");
  if (to.meta.requiresAuth && !session) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
