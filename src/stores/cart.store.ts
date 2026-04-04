import { defineStore } from "pinia";
import { cartService } from "@/services/cart.service";
import type { Cart } from "@/types/cart.types";

interface CartStoreState {
  carts: Cart[];
  loadingCarts: boolean;
  cartsError: string | null;
}

export const useCartStore = defineStore("cart", {
  state: (): CartStoreState => ({
    carts: [],
    loadingCarts: false,
    cartsError: null,
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
