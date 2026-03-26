<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { onMounted, computed, ref } from "vue";

import TheHeader from "./layouts/components/TheHeader.vue";
import CategoryTabs from "./components/CategoryTabs.vue";
import Chat from "./components/Chat.vue";

const authStore = useAuthStore();
const route = useRoute();
const chatRef = ref();

// Инициализируем auth при загрузке приложения
onMounted(() => {
  authStore.initializeAuth();
});

// Определяем, нужно ли показывать header и categoryTabs
const showLayout = computed(() => {
  return route.name !== "login" && authStore.isAuthenticated;
});

const openChat = () => {
  chatRef.value?.openChat();
};
</script>

<template>
  <TheHeader v-if="showLayout" />
  <CategoryTabs v-if="showLayout" />
  <main class="main" :class="{ 'main--full': !showLayout }">
    <RouterView />
  </main>
  <Chat ref="chatRef" />
  <button v-if="showLayout" @click="openChat" class="chat-toggle-btn">💬</button>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

main.main--full {
  background-color: var(--color-background);
}

.chat-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.chat-toggle-btn:hover {
  background: #0056b3;
}
</style>
