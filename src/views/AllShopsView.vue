<script setup lang="ts">
import Card from "@/components/Card.vue";
import { IconAngleBottom, IconAngleLeft, IconAngleRight } from "@/components/icons";
import { useProductStore } from "@/stores/product.store";
import { getVisiblePages } from "@/utils/helper";
import { Paginator } from "primevue";
import { onMounted, ref } from "vue";
// import PanelMenu from "primevue/panelmenu";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});

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
    <div class="catalog-wrapper">
      <aside class="categories"></aside>
      <div class="catalog">
        <div v-if="productStore.loading">Loading...</div>
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

<style scoped>
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
  background: #f3f4f6;
}

.page-btn--active {
  background: #111827;
  color: #fff;
  border-color: #111827;
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
