<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/product.store";
import { storeToRefs } from "pinia";
import { type PageState } from "primevue";
import { computed, onMounted, ref } from "vue";
import PanelMenu from "primevue/panelmenu";
import BasePaginator from "@/components/BasePaginator.vue";

const productStore = useProductStore();
const { categories } = storeToRefs(productStore);

onMounted(async () => {
  await Promise.all([productStore.fetchProducts(), productStore.fetchCategories()]);
});

const menuItems = computed(() =>
  categories.value.map((group) => ({
    label: group.label,
    items: group.items.map((item) => ({
      label: item.label,
      command: () => productStore.selectCategory(item.value),
    })),
  })),
);

const onPageChange = (event: PageState) => {
  first.value = event.first;
  rows.value = event.rows;

  productStore.changePage(event.first, event.rows);
};

const first = ref(0);
const rows = ref(10);
const rowsPerPage = [10, 20, 30, 40, 50];
</script>

<template>
  <section class="all-shops">
    <div v-if="productStore.loadingCategories" class="loader">Loading...</div>
    <div v-else class="catalog-wrapper">
      <aside class="categories">
        <div class="categories__title">Categories</div>
        <PanelMenu
          :model="menuItems"
          :pt="{
            root: { class: 'pm' },

            panel: { class: 'pm__panel' },

            header: { class: 'pm__header' },
            headerContent: { class: 'pm__header-content' },
            headerLink: { class: 'pm__header-link' },
            headerLabel: { class: 'pm__header-label' },
            submenuIcon: ({ context }) => ({
              class: ['pm__submenu-icon', context.active ? 'pm__submenu-icon--open' : ''],
            }),

            contentContainer: { class: 'pm__content-container' },
            content: { class: 'pm__content' },

            rootList: { class: 'pm__list' },

            item: { class: 'pm__item' },
            itemContent: { class: 'pm__item-content' },
            itemLink: { class: 'pm__item-link' },
            itemLabel: { class: 'pm__item-label' },

            submenu: { class: 'pm__submenu' },
          }"
        />
      </aside>
      <div class="catalog">
        <div v-if="productStore.loadingProducts" class="loader">Loading...</div>
        <div v-else class="catalog-grid">
          <ProductCard
            v-for="product in productStore.products"
            :key="product.id"
            :title="product.title"
            :price="product.price"
            :discount-percentage="product.discountPercentage"
            :thumbnail-url="product.thumbnail"
          />
        </div>
        <BasePaginator
          :rows-per-page="rowsPerPage"
          class="paginator"
          :rows="rows"
          :first="first"
          :total-records="productStore.total"
          @page="onPageChange"
        />
      </div>
    </div>
    <div class="message"></div>
  </section>
</template>

<style>
.pm {
  width: 204px;
  background: transparent;
}

/* panel */
.pm__panel {
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 0px;
}

.pm__panel:last-child {
  border: none;
}

/* header */
.pm__header {
  user-select: none;
}

.pm__header-content {
  display: flex;
}

.pm__header-link {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  cursor: pointer;
  text-decoration: none;
  color: #111827;
}

.pm__header-link:hover {
  background: #f3f4f6;
}

.pm__header-label {
  height: 20px;
  flex: 1;
  font-size: 14px;
  font-weight: 600;
}

/* arrow */
.pm__submenu-icon {
  transform: rotate(90deg);
  transition: transform 0.2s ease;
}

.pm__submenu-icon--open {
  transform: rotate(180deg);
}

/* content */
.pm__content-container {
  overflow: hidden;
}

.pm__content {
  padding-top: 16px;
}

/* list */
.pm__list {
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* item */
.pm__item {
  list-style: none;
}

.pm__item-content {
  display: flex;
  text-transform: capitalize;
}

.pm__item-link {
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;

  text-decoration: none;
  color: #374151;

  border-radius: 6px;
  cursor: pointer;
}

.pm__item-link:hover {
  background: #f3f4f6;
}
</style>

<style scoped>
.all-shops {
  width: 100%;
  padding: 48px 48px 0px 48px;
  display: flex;
  flex-direction: column;
}

.loader {
  align-self: center;
  min-height: calc(100vh - 80px - 33px);
  font-size: 20px;
}

.categories {
  color: var(--color-category-filter-text);
}

.catalog-wrapper {
  display: flex;
  flex-direction: row;
  gap: 48px;
}

.categories__title {
  font-size: 12px;
  opacity: 0.5;
}

.catalog {
  width: 100%;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.paginator {
  padding: 20px 0px;
}

.message {
  font-size: 14px;
  color: #6b7280;
}
</style>
