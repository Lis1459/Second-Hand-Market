<script setup lang="ts">
import Card from "@/components/Card.vue";
import { IconAngleBottom, IconAngleLeft, IconAngleRight } from "@/components/icons";
import { useProductStore } from "@/stores/product.store";
import { getVisiblePages } from "@/utils/helper";
import { storeToRefs } from "pinia";
import { Paginator } from "primevue";
import { computed, onMounted, ref } from "vue";
import PanelMenu from "primevue/panelmenu";

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

type PageEvent = {
  first: number;
  rows: number;
};

const onPageChange = (event: PageEvent) => {
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
          <Card
            v-for="product in productStore.products"
            :key="product.id"
            :title="product.title"
            :price="product.price"
            :discount-percentage="product.discountPercentage"
            :thumbnail-url="product.thumbnail"
          />
        </div>
        <Paginator
          class="paginator"
          :rows="rows"
          :first="first"
          :total-records="productStore.total"
          @page="onPageChange"
        >
          <template #container="slotProps">
            <div class="paginator__content">
              <div class="left-side">
                <button
                  class="nav-btn"
                  :disabled="slotProps.page === 0"
                  @click="slotProps.prevPageCallback"
                >
                  <IconAngleLeft class="nav-btn__icon" />
                </button>

                <template
                  v-for="(item, i) in getVisiblePages(slotProps.page + 1, slotProps.pageCount ?? 0)"
                  :key="i"
                >
                  <span v-if="item === 'dots'" class="dots">...</span>
                  <button
                    v-else
                    class="page-btn"
                    :class="{ 'page-btn--active': item === slotProps.page + 1 }"
                    @click="slotProps.changePageCallback(item - 1)"
                  >
                    {{ item }}
                  </button>
                </template>

                <button
                  class="nav-btn"
                  :disabled="slotProps.page === (slotProps.pageCount ?? 0) - 1"
                  @click="slotProps.nextPageCallback"
                >
                  <IconAngleRight class="nav-btn__icon" />
                </button>
              </div>
              <div class="right-side">
                <span class="message">
                  Showing {{ slotProps.first }} to {{ slotProps.last }} of
                  {{ slotProps.totalRecords }}
                </span>

                <div class="select-wrapper">
                  <select
                    class="rows-select"
                    :value="slotProps.rows"
                    @change="
                      slotProps.rowChangeCallback(
                        Number(($event.target as HTMLSelectElement).value),
                      )
                    "
                  >
                    <option v-for="opt in rowsPerPage" :key="opt" :value="opt">
                      {{ opt }} entries per page
                    </option>
                  </select>
                  <IconAngleBottom class="select__icon" />
                </div>
              </div>
            </div>
          </template>
        </Paginator>
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
  /* min-height: calc(100vh - 80px - 88px - 84px); */
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
  /* min-height: calc(100vh - 80px - 88px - 84px); */
  width: 100%;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.paginator {
  padding: 20px 0;
}

.paginator__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 1050px) {
  .paginator__content {
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 900px) {
  .catalog-wrapper {
    flex-direction: column;
  }
}

.left-side {
  display: flex;
  gap: 8px;
}

.dots {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #9ca3af;
  font-size: 18px;
}

.page-btn {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover {
  background-color: #111827;
  color: #fff;
}

.page-btn--active {
  background: #111827;
  color: #fff;
}

.page-btn--active:hover {
  background-color: transparent;
  color: inherit;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #f3f4f6;
}

.nav-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.nav-btn__icon {
  width: 24px;
  height: 24px;
}

.right-side {
  display: flex;
  align-items: center;
  gap: 24px;
}

.message {
  font-size: 14px;
  color: #6b7280;
}

.select-wrapper {
  position: relative;
  display: inline-block;
}

/* select */
.rows-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  height: 40px;
  padding: 8px 92px 8px 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}

.rows-select:focus {
  outline: 1px solid #000;
}

.rows-select:focus-visible {
  outline: 1px solid #000;
}

.select__icon {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
