import { ProductCategory } from "../backend.d";

export function getCategoryImage(category: ProductCategory): string {
  switch (category) {
    case ProductCategory.bags:
      return "/assets/generated/product-bag.dim_600x600.jpg";
    case ProductCategory.clothing:
      return "/assets/generated/product-sweater.dim_600x600.jpg";
    case ProductCategory.accessories:
      return "/assets/generated/product-hat.dim_600x600.jpg";
    default:
      return "/assets/generated/product-plushie.dim_600x600.jpg";
  }
}

export function formatPrice(priceCents: bigint): string {
  return `$${(Number(priceCents) / 100).toFixed(2)}`;
}
