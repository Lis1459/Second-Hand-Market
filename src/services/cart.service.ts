import type { CartsResponse } from "@/types/cart.types";
import { api } from "./api";

export const cartService = {
  async getCarts(): Promise<CartsResponse> {
    const { data } = await api.get<CartsResponse>("/carts");

    if (!data || !Array.isArray(data.carts)) {
      throw new Error("Invalid carts response");
    }

    return data;
  },
};
