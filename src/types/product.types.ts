export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  category: string;
}

export interface ProductsResponce {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isProductArray(data: unknown): data is Product[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item["id"] === "number" &&
        typeof item["title"] === "string" &&
        typeof item["price"] === "number" &&
        typeof item["discountPercentage"] === "number" &&
        typeof item["thumbnail"] === "string",
    )
  );
}

export function isProductsResponce(data: unknown): data is ProductsResponce {
  if (!isRecord(data)) return false;

  return (
    isProductArray(data["products"]) &&
    typeof data["limit"] === "number" &&
    typeof data["total"] === "number" &&
    typeof data["skip"] === "number"
  );
}
