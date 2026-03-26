import { defineStore } from "pinia";
import { cartService } from "@/services/cart.service";
import type { Cart } from "@/types/cart.types";

export const useCartStore = defineStore("cart", {
  state: () => ({
    carts: [] as Cart[],
    loadingCarts: false,
    cartsError: null as string | null,
  }),

  getters: {
    hasCarts: (state) => state.carts.length > 0,
  },

  actions: {
    async fetchCarts() {
      try {
        this.loadingCarts = true;
        this.cartsError = null;

        const response = await cartService.getCarts();
        this.carts = response.carts;
      } catch (error: unknown) {
        this.cartsError = error instanceof Error ? error.message : "Failed to load carts";
      } finally {
        this.loadingCarts = false;
      }
    },
  },
});
