<script setup lang="ts">
import type { CartProduct } from "@/types/cart.types";

interface Props {
  product: CartProduct;
}

const props = defineProps<Props>();
console.log(props.product);
</script>

<template>
  <div class="reserved-cart-item">
    <div class="reserved-cart-item__image-wrapper">
      <img :src="product.thumbnail" alt="" class="reserved-cart-item__image-placeholder" />
    </div>

    <div class="reserved-cart-item__content">
      <div class="reserved-cart-item__row reserved-cart-item__title">{{ props.product.title }}</div>
      <div class="reserved-cart-item__row">
        <div class="reserved-cart-item__row">
          <span class="reserved-cart-item__label">Quantity:</span>
          <span class="reserved-cart-item__value">{{ props.product.quantity }}</span>
        </div>
        <div class="reserved-cart-item__row">
          <span class="reserved-cart-item__label">Price:</span>
          <span class="reserved-cart-item__value">{{ props.product.price }} €</span>
        </div>
      </div>
      <div class="reserved-cart-item__row">
        <span class="reserved-cart-item__label">Total:</span>
        <span class="reserved-cart-item__value">{{ props.product.total.toFixed(2) }} €</span>
      </div>
      <div class="reserved-cart-item__row">
        <span class="reserved-cart-item__label">Discount:</span>
        <span class="reserved-cart-item__value">{{ props.product.discountPercentage }}%</span>
      </div>
      <div class="reserved-cart-item__row">
        <span class="reserved-cart-item__label">Discounted total:</span>
        <span class="reserved-cart-item__discounted">{{ props.product.discountedTotal }} €</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reserved-cart-item {
  min-width: 360px;
  display: flex;
  gap: 24px;
  color: var(--color-reserved-cart-text);
}

.reserved-cart-item__image-wrapper {
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 160px;
  aspect-ratio: 16/18;
  height: 180px;
  min-width: 120px;
}

.reserved-cart-item__image-placeholder {
  height: 100%;
}

.reserved-cart-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.reserved-cart-item__row {
  display: flex;
  font-size: 12px;
  /* justify-content: space-between; */
  gap: 8px;
}

.reserved-cart-item__title {
  font-size: 16px;
}

.reserved-cart-item__label {
  opacity: 0.5;
  font-weight: 600;
}

.reserved-cart-item__discounted {
  font-weight: 600;
}
</style>
