<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { onMounted, computed } from "vue";

import TheHeader from "./layouts/components/TheHeader.vue";
import CategoryTabs from "./components/CategoryTabs.vue";

const authStore = useAuthStore();
const route = useRoute();

// Инициализируем auth при загрузке приложения
onMounted(() => {
  authStore.initializeAuth();
});

// Определяем, нужно ли показывать header и categoryTabs
const showLayout = computed(() => {
  return route.name !== "login" && authStore.isAuthenticated;
});
</script>

<template>
  <TheHeader v-if="showLayout" />
  <CategoryTabs v-if="showLayout" />
  <main class="main" :class="{ 'main--full': !showLayout }">
    <RouterView />
  </main>
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
</style>
