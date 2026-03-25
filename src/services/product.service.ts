import { isProductsResponce, type ProductsResponce } from "@/types/product.types";
import { api } from "./api";

export const productService = {
  async getProducts(limit = 10, skip = 0): Promise<ProductsResponce> {
    const { data } = await api.get<unknown>("/products", {
      params: { limit, skip },
    });

    if (isProductsResponce(data)) {
      return data;
    }

    throw new Error("Invalid API responce");
  },
};
