<script setup lang="ts">
import { RouterView } from "vue-router";

import TheHeader from "./components/TheHeader.vue";
import CategoryTabs from "./components/CategoryTabs.vue";
</script>

<template>
  <TheHeader />
  <CategoryTabs />
  <RouterView />
</template>

<style scoped></style>
