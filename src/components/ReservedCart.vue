<script setup lang="ts">
import type { Cart } from "@/types/cart.types";
import ReservedCartItem from "@/components/ReservedCartItem.vue";

type Props = {
  cart: Cart;
};

const props = defineProps<Props>();
</script>

<template>
  <section class="reserved-cart">
    <header class="reserved-cart__header">
      <div class="reserved-cart__title">Cart #{{ props.cart.id }}</div>
      <div class="reserved-cart__meta">
        <span>User: {{ props.cart.userId }}</span>
        <span>Items: {{ props.cart.totalProducts }}</span>
        <span>Quantity: {{ props.cart.totalQuantity }}</span>
      </div>
      <div class="reserved-cart__total">Total: {{ props.cart.total }}€</div>
      <div class="reserved-cart__total">Discounted: {{ props.cart.discountedTotal }}€</div>
    </header>

    <div class="reserved-cart__products">
      <ReservedCartItem
        v-for="product in props.cart.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<style scoped>
.reserved-cart {
  min-width: 360px;
  background: #fbfbfb;
  border-radius: 40px;
  font-size: 12px;
}

.reserved-cart__header {
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
}

.reserved-cart__title {
  font-weight: 600;
  font-size: 16px;
  color: #222;
}

.reserved-cart__meta {
  display: flex;
  gap: 24px;
  color: #666;
}

.reserved-cart__total {
  color: #444;
}

.reserved-cart__products {
  padding: 16px 24px 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 48px;
}

@media (max-width: 768px) {
  .reserved-cart__products {
    grid-template-columns: 1fr;
  }
}
</style>
