import { isProductsResponse, type ProductsResponse } from "@/types/product.types";
import { api } from "./api";

export const productService = {
  async getProducts(limit = 10, skip = 0): Promise<ProductsResponse> {
    const { data } = await api.get<unknown>("/products", {
      params: { limit, skip },
    });

    if (isProductsResponse(data)) {
      return data;
    }

    throw new Error("Invalid API responce");
  },

  async getProductsByCategory(category: string, limit = 10, skip = 0): Promise<ProductsResponse> {
    const { data } = await api.get<unknown>(`/products/category/${category}`, {
      params: { limit, skip },
    });

    if (isProductsResponse(data)) {
      return data;
    }

    throw new Error("Invalid API response");
  },

  async getCategories(): Promise<string[]> {
    const { data } = await api.get<unknown>("/products/category-list");

    if (Array.isArray(data) && data.every((i) => typeof i === "string")) {
      return data;
    }

    throw new Error("Invalid categories response");
  },
};
