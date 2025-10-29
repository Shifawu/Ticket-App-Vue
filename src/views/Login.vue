<template>
  <section class="auth container" aria-labelledby="login-title">
    <div class="auth-card card">
      <h2 id="login-title">Login</h2>

      <form @submit.prevent="handleSubmit" novalidate>
        <label>
          <span>Email</span>
          <input v-model="form.email" type="email" :aria-invalid="errors.email ? 'true' : 'false'" />
          <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
        </label>

        <label>
          <span>Password</span>
          <input v-model="form.password" type="password" :aria-invalid="errors.password ? 'true' : 'false'" />
          <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
        </label>

        <div class="form-actions">
          <button class="btn btn-primary" type="submit">Login</button>
          <router-link to="/auth/signup" class="btn btn-ghost">Create account</router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

export default {
  setup() {
    const form = reactive({ email: "", password: "" });
    const errors = reactive({});
    const router = useRouter();
    const { login } = useAuth();

    function validate() {
      errors.email = !form.email.trim() ? "Email is required" : "";
      errors.password = !form.password ? "Password is required" : "";
      return !errors.email && !errors.password;
    }

    function handleSubmit() {
      if (!validate()) return;
      const ok = login({ email: form.email, password: form.password });
      if (ok) router.push("/dashboard");
    }

    return { form, errors, handleSubmit };
  },
};
</script>
