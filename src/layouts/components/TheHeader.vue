<script setup lang="ts">
import { IconCart, IconHeart, IconProfile, IconSearch } from "@/components/icons";
import InputText from "primevue/inputtext";
import { RouterLink } from "vue-router";
</script>
<template>
  <header class="header">
    <div class="header__left">
      <div class="logo">
        <img src="../../assets/icons/LogoIcon.svg" alt="Logo" class="logo__icon" />
        <div class="logo__text">
          <div>2ND</div>
          <div>HAND</div>
          <div>MARKET</div>
        </div>
      </div>

      <div class="search">
        <IconSearch class="search-icon" />
        <InputText class="search-input" />
      </div>
    </div>
    <div class="header__right">
      <nav class="navigation">
        <RouterLink to="#" class="navigation__item">About us</RouterLink>
        <RouterLink to="#" class="navigation__item">All shops</RouterLink>
        <RouterLink to="#" class="navigation__item">Become a merchant</RouterLink>
      </nav>
      <div class="icon-group">
        <div class="favorites-group">
          <IconHeart class="favorites-icon" />
          <p class="favorites-count">0</p>
        </div>
        <div class="cart-group">
          <IconCart class="cart-icon" />
          <p class="cart-count">0</p>
        </div>
        <IconProfile class="profile-icon" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  color: var(--color-header-text);
  background-color: var(--color-header-background);
  display: flex;
  padding: 0px 48px;
  justify-content: space-between;
  align-items: center;
  height: 88px;
}

.header__left {
  display: flex;
  gap: 31px;
  align-items: center;
}

.logo {
  display: flex;
  gap: 12px;
}

.header__right {
  display: flex;
  gap: 40px;
  align-items: center;
}

.navigation,
.icon-group {
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 12px;
}

.navigation__item {
  border-bottom: 1px solid #ffffff31;
}

.logo__text {
  font-size: 14px;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  line-height: 93%;
  text-transform: uppercase;
}

.search {
  display: flex;
  align-items: center;
  background-color: #ffffff4d;
  gap: 10px;
  border-radius: 20px;
  padding: 8px 12px;
  height: 32px;
}

.search-icon {
  width: 16px;
  height: 16px;
}

.favorites-icon,
.cart-icon,
.profile-icon {
  width: 20px;
  height: 20px;
  color: inherit;
  cursor: pointer;
}

.favorites-icon {
  color: #bb464e;
}

.search-input {
  border: none;
  background-color: transparent;
  width: 190px;
  color: inherit;
  font-size: 16px;
}

.search-input:focus,
.search-input:focus-visible {
  outline: none;
  caret-color: white;
}

.favorites-group,
.cart-group {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
}

@media (max-width: 900px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 10px;
    gap: 10px;
  }
}

@media (max-width: 450px) {
  .header__left {
    flex-direction: column;
    gap: 10px;
  }
  .header__right {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
