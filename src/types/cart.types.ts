import type { Product } from "./product.types";
export interface CartProduct extends Omit<Product, "category"> {
  discountedTotal: number;
  total: number;
  quantity: number;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}
