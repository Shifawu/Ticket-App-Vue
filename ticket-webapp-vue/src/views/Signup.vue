<template>
  <section class="auth container" aria-labelledby="signup-title">
    <div class="auth-card card">
      <h2 id="signup-title">Create Account</h2>

      <form @submit.prevent="handleSubmit" novalidate>
        <label>
          <span>Full name</span>
          <input v-model="form.name" />
          <div v-if="errors.name" class="field-error">{{ errors.name }}</div>
        </label>

        <label>
          <span>Email</span>
          <input v-model="form.email" type="email" />
          <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
        </label>

        <label>
          <span>Password</span>
          <input v-model="form.password" type="password" />
          <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
        </label>

        <div class="form-actions">
          <button class="btn btn-primary" type="submit">Sign up</button>
          <router-link to="/auth/login" class="btn btn-ghost">Have an account?</router-link>
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
    const { signup } = useAuth();
    const router = useRouter();
    const form = reactive({ name: "", email: "", password: "" });
    const errors = reactive({});

    function validate() {
      errors.name = !form.name.trim() ? "Name is required" : "";
      errors.email = !form.email.trim() ? "Email is required" : "";
      errors.password = !form.password || form.password.length < 6 ? "Password must be at least 6 characters" : "";
      return !errors.name && !errors.email && !errors.password;
    }

    function handleSubmit() {
      if (!validate()) return;
      const ok = signup({ name: form.name, email: form.email, password: form.password });
      if (ok) router.push("/auth/login");
    }

    return { form, errors, handleSubmit };
  },
};
</script>
