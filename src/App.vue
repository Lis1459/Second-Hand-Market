<script setup lang="ts">
import { RouterView } from "vue-router";

import TheHeader from "./layouts/components/TheHeader.vue";
import CategoryTabs from "./components/CategoryTabs.vue";
</script>

<template>
  <TheHeader />
  <CategoryTabs />
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
</style>
