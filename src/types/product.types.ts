export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  category: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isProductArray(data: unknown): data is Product[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        isRecord(item) &&
        typeof item["id"] === "number" &&
        typeof item["title"] === "string" &&
        typeof item["price"] === "number" &&
        typeof item["discountPercentage"] === "number" &&
        typeof item["thumbnail"] === "string",
    )
  );
}

export function isProductsResponse(data: unknown): data is ProductsResponse {
  if (!isRecord(data)) return false;

  return (
    isProductArray(data["products"]) &&
    typeof data["limit"] === "number" &&
    typeof data["total"] === "number" &&
    typeof data["skip"] === "number"
  );
}
