<template>
  <div class="toast-root" aria-live="polite">
    <div v-for="t in toasts" :key="t.id" :class="['toast', `toast-${t.type}`]">
      <div>{{ t.message }}</div>
      <button class="toast-close" @click="remove(t.id)" aria-label="dismiss">✕</button>
    </div>
  </div>
</template>

<script>
import { useToast } from "../composables/useToast";

export default {
  setup() {
    const { toasts, remove } = useToast();
    return { toasts, remove };
  },
};
</script>
