import { reactive, computed } from "vue";
import { useToast } from "./useToast";

const state = reactive({
  user: null,
  token: null,
});

const AUTH_KEY = "ticketapp_session";
const USERS_KEY = "ticketapp_users";

function loadFromStorage() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (raw) {
    const s = JSON.parse(raw);
    state.user = s.user;
    state.token = s.token;
  } else {
    state.user = null;
    state.token = null;
  }
}
loadFromStorage();

export function useAuth() {
  const { show } = useToast();

  const isAuthenticated = computed(() => !!state.token);
  const user = computed(() => state.user);

  function signup({ name, email, password }) {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    if (all.find((u) => u.email === email)) {
      show("User already exists", "error");
      return false;
    }
    const newUser = { id: Date.now(), name, email, password };
    all.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(all));
    show("Account created. Please login.", "success");
    return true;
  }

  function login({ email, password }) {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const found = all.find((u) => u.email === email && u.password === password);
    if (!found) {
      show("Invalid credentials", "error");
      return false;
    }
    const session = { token: btoa(email + ":" + Date.now()), user: { id: found.id, name: found.name, email: found.email } };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    state.user = session.user;
    state.token = session.token;
    show("Welcome back!", "success");
    return true;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    state.user = null;
    state.token = null;
    show("Logged out", "success");
  }

  return { isAuthenticated, user, signup, login, logout };
}
