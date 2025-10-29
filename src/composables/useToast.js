import { reactive } from "vue";

const state = reactive({
  toasts: [],
});

export function useToast() {
  function show(message, type = "info", timeout = 3500) {
    const id = Date.now() + Math.random();
    state.toasts.push({ id, message, type });
    setTimeout(() => remove(id), timeout);
  }
  function remove(id) {
    const idx = state.toasts.findIndex((t) => t.id === id);
    if (idx !== -1) state.toasts.splice(idx, 1);
  }
  return {
    toasts: state.toasts,
    show,
    remove,
  };
}
