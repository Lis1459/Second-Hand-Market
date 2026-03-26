<script setup lang="ts">
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cart.store";
import ReservedCart from "@/components/ReservedCart.vue";

const cartStore = useCartStore();

onMounted(async () => {
  await cartStore.fetchCarts();
});
</script>

<template>
  <section class="reserved-page">
    <div v-if="cartStore.loadingCarts" class="reserved-page__loading">Loading carts...</div>
    <div v-else-if="cartStore.cartsError" class="reserved-page__error">
      {{ cartStore.cartsError }}
    </div>
    <div v-else-if="!cartStore.hasCarts" class="reserved-page__empty">No reserved carts found.</div>

    <div class="reserved-page__list">
      <ReservedCart v-for="cart in cartStore.carts" :key="cart.id" :cart="cart" />
    </div>
  </section>
</template>

<style scoped>
.reserved-page {
  width: 100%;
  padding: 48px;
}

.reserved-page__loading,
.reserved-page__error,
.reserved-page__empty {
  font-size: 20px;
}

.reserved-page__list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 500px) {
  .reserved-page {
    padding: 5px;
  }
}
</style>
