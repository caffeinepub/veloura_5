import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";
import { formatPrice, getCategoryImage } from "../utils/productImages";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 1 }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id.toString() }}
      data-ocid={`product.item.${index}`}
      className="group block bg-card rounded-none overflow-hidden border border-border shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={getCategoryImage(product.category)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
        />
        <button
          type="button"
          onClick={handleAddToCart}
          data-ocid={`product.add_button.${index}`}
          className="absolute bottom-3 right-3 bg-ink text-white p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gold hover:text-ink"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">
        <p className="font-body text-[10px] text-muted-foreground capitalize mb-1.5 tracking-[0.12em] uppercase">
          {product.category}
        </p>
        <h3 className="font-display font-normal text-foreground text-base leading-tight mb-2">
          {product.name}
        </h3>
        <p className="font-body font-semibold text-gold text-sm">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </Link>
  );
}
