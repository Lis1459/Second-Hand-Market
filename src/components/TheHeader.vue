<script setup lang="ts">
import InputText from "primevue/inputtext";
import { RouterLink } from "vue-router";
</script>
<template>
  <header class="header">
    <div class="header__left">
      <div class="logo">
        <img src="../assets/icons/LogoIcon.svg" alt="Logo" class="logo__icon" />
        <div class="logo__text">
          <div>2ND</div>
          <div>HAND</div>
          <div>MARKET</div>
        </div>
      </div>

      <div class="search">
        <img src="../assets/icons/SearchIcon.svg" alt="Search" />
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
          <img src="../assets/icons/HeartIcon.svg" alt="Favorites" />
          <p class="favorites-count">0</p>
        </div>
        <div class="cart-group">
          <img src="../assets/icons/CartIcon.svg" alt="Cart" />
          <p class="cart-count">0</p>
        </div>
        <img src="../assets/icons/ProfileIcon.svg" alt="Profile" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  color: var(--color_header-text);
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

.search-input {
  width: 190px;
}

.favorites-group,
.cart-group {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
}
</style>
