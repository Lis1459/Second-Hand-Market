<script setup lang="ts">
import Card from "primevue/card";
import { computed } from "vue";
import { IconCart, IconHeart } from "./icons";

const props = defineProps({
  thumbnailUrl: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
});

const discount = computed(() => {
  return ((props.discountPercentage / 100) * props.price + props.price).toFixed(2);
});
</script>

<template>
  <Card class="product-card">
    <template #header>
      <div class="image-wrapper">
        <img :src="props.thumbnailUrl" alt="product" />
        <IconHeart class="favorite" />
        <!-- <i class="pi pi-heart-fill favorite"></i> -->
      </div>
    </template>

    <template #content>
      <div class="title">{{ props.title }}</div>
    </template>

    <template #footer>
      <div class="footer">
        <div class="price-group">
          <span class="price">{{ props.price }}€</span>
          <span class="discount">{{ discount }}€</span>
        </div>
        <IconCart class="cart-icon" />
      </div>
    </template>
  </Card>
</template>

<style>
.product-card {
  background-color: var(--color-background-card);
  width: 220px;
  border-radius: 16px;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
}

.image-wrapper img {
  width: 100%;
  display: block;
  border-radius: 12px 12px 0 0;
}

.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  color: white;
  cursor: pointer;
}

.title {
  color: var(--color-card-text);
  opacity: 70%;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  margin: 12px 16px;
}

.brand {
  font-size: 13px;
  color: #777;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 16px;
}

.price-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.discount {
  opacity: 50%;
  text-decoration: line-through;
}

.cart-icon {
  color: #7d7d7d;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
