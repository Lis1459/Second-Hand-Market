<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Button, InputText } from "primevue";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");

const isVisible = ref(false);
const toggle = () => {
  isVisible.value = !isVisible.value;
};

const handleLogin = async () => {
  const success = await authStore.login({
    username: username.value,
    password: password.value,
  });

  if (success) {
    router.push("/");
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <InputText
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password">
            <input
              :type="isVisible ? 'text' : 'password'"
              v-model="password"
              class="form-input password__input"
              placeholder="Введите пароль"
            />

            <button type="button" class="password__toggle" @click="toggle">
              <i v-if="isVisible" class="pi pi-eye"></i>
              <i v-else class="pi pi-eye-slash"></i>
            </button>
          </div>
        </div>

        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>

        <Button
          type="submit"
          label="Sign In"
          class="login-button"
          :disabled="!username || !password"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-background);
  padding: 20px;
}

.login-card {
  background-color: var(--color-header-background);
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
  color: var(--color-header-text);
}

.login-header h1 {
  font-size: 28px;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.login-header p {
  font-size: 14px;
  margin: 0;
  opacity: 0.7;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-header-text);
}

.form-input {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid var(--color-border, #e0e0e0);
  font-size: 14px;
  background-color: var(--color-background);
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary, #007bff);
}

.error-message {
  padding: 10px 12px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: #c33;
  font-size: 13px;
}

.login-button {
  border: none;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  margin-top: 10px;
  cursor: pointer;
}

.password {
  position: relative;
  width: 100%;
}

.password__input {
  width: 100%;
  padding: 10px 36px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.password__toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
}
</style>
