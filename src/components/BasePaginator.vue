<script lang="ts" setup>
import { getVisiblePages } from "@/utils/helper";
import { IconAngleBottom, IconAngleLeft, IconAngleRight } from "@/components/icons";
import { Paginator } from "primevue";

interface Props {
  rowsPerPage: number[];
}

const { rowsPerPage } = defineProps<Props>();
</script>
<template>
  <Paginator>
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
                slotProps.rowChangeCallback(Number(($event.target as HTMLSelectElement).value))
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
</template>

<style scoped>
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
