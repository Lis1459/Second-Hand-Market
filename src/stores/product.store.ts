import { productService } from "@/services/product.service";
import type { Product } from "@/types/product.types";
import { defineStore } from "pinia";

type CategoryItem = {
  label: string;
  value: string | null;
};

type CategoryGroup = {
  label: string;
  items: CategoryItem[];
};

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
    categories: [] as CategoryGroup[],
    selectedCategory: null as string | null,
    total: 0,
    loadingProducts: false,
    loadingCategories: false,
    error: null as string | null,
    limit: 10,
    skip: 0,
  }),

  actions: {
    async fetchProducts() {
      try {
        this.loadingProducts = true;
        this.error = null;

        const data = this.selectedCategory
          ? await productService.getProductsByCategory(this.selectedCategory, this.limit, this.skip)
          : await productService.getProducts(this.limit, this.skip);

        this.products = data.products;
        this.total = data.total;
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : "unknown Error";
      } finally {
        this.loadingProducts = false;
      }
    },

    async changePage(first: number, rows: number) {
      this.skip = first;
      this.limit = rows;
      await this.fetchProducts();
    },

    async fetchCategories() {
      try {
        this.loadingCategories = true;
        const data = await productService.getCategories();

        const mens: string[] = [];
        const womens: string[] = [];
        const other: string[] = [];

        data.forEach((cat) => {
          if (cat.startsWith("mens-")) {
            mens.push(cat);
          } else if (cat.startsWith("womens-")) {
            womens.push(cat);
          } else {
            other.push(cat);
          }
        });
        this.categories = [
          {
            label: "Mens",
            items: mens.map((c) => ({
              label: c.replace("mens-", ""),
              value: c,
            })),
          },
          {
            label: "Womens",
            items: womens.map((c) => ({
              label: c.replace("womens-", ""),
              value: c,
            })),
          },
          {
            label: "Other",
            items: other.map((c) => ({
              label: c,
              value: c,
            })),
          },
        ];
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : "Categories error";
      } finally {
        this.loadingCategories = false;
      }
    },

    async selectCategory(category: string | null) {
      this.selectedCategory = category;
      this.skip = 0;

      await this.fetchProducts();
    },
  },
});
