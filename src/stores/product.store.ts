import { productService } from "@/services/product.service";
import type { Product } from "@/types/product.types";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
    total: 0,
    loading: false,
    error: null as string | null,
    limit: 10,
    skip: 0,
  }),

  actions: {
    async fetchProducts() {
      try {
        this.loading = true;
        this.error = null;

        const data = await productService.getProducts(this.limit, this.skip);

        this.products = data.products;
        this.total = data.total;
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : "unknown Error";
      } finally {
        this.loading = false;
      }
    },

    async changePage(first: number, rows: number) {
      try {
        this.loading = true;
        this.error = null;

        this.skip = first;
        this.limit = rows;

        const data = await productService.getProducts(this.limit, this.skip);

        this.products = data.products;
        this.total = data.total;
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : "Unknown error";
      } finally {
        this.loading = false;
      }
    },
  },
});
