<script setup lang="ts">
const categoryList = ["Women", "Men", "Unisex", "Children", "New"];
</script>
<template>
  <section class="category-tabs">
    <div class="category-tabs__wrapper">
      <span v-for="category in categoryList" class="category">{{ category }}</span>
    </div>
  </section>
</template>
<style>
.category-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  background-color: var(--color-background-tabs);
}

.category-tabs__wrapper {
  border: 1px solid var(--color-border-tabs);
  border-radius: 40px;
}

.category {
  display: inline-block;
  padding: 13px 24px;
  cursor: pointer;
  border-left: 1px solid #dbdbdb;
}

.category:first-child {
  border: none;
}

@media (max-width: 500px) {
  .category {
    padding: 7px 11px;
  }
}
</style>
