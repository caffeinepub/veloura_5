import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useQueries";
import { formatPrice, getCategoryImage } from "../utils/productImages";

export default function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: products, isLoading } = useProducts();
  const { addToCart, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  const product = products?.find((p) => p.id.toString() === id);
  const related =
    products
      ?.filter(
        (p) => p.id.toString() !== id && p.category === product?.category,
      )
      .slice(0, 4) ?? [];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      product,
      selectedSize || product.sizes[0],
      selectedColor || product.colors[0],
    );
    setAdded(true);
    toast.success(`${product.name} added to your cart!`);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen py-12">
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6"
          data-ocid="product.loading_state"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center" data-ocid="product.error_state">
          <p className="font-serif text-xl text-muted-foreground">
            Product not found
          </p>
          <Button asChild variant="link" className="mt-4">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/shop"
          data-ocid="product.back.link"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="sticky top-24">
            <div className="aspect-square rounded-3xl overflow-hidden border border-border shadow-hover">
              <img
                src={getCategoryImage(product.category)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6" data-ocid="product.panel">
            <div>
              <Badge variant="secondary" className="capitalize mb-2">
                {product.category}
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-primary mt-2">
                {formatPrice(product.priceCents)}
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            {product.sizes.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      data-ocid="product.size.toggle"
                      className={`px-4 py-1.5 rounded-full border text-sm transition-all ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2">Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      data-ocid="product.color.toggle"
                      className={`px-4 py-1.5 rounded-full border text-sm transition-all ${selectedColor === color ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              {Number(product.stock) > 0
                ? `${product.stock} in stock`
                : "Currently out of stock"}
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={Number(product.stock) === 0}
                data-ocid="product.add_to_cart.button"
                className="flex-1 bg-primary text-primary-foreground hover:opacity-90 h-12 rounded-full text-base"
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                data-ocid="product.wishlist.button"
                className="h-12 w-12 rounded-full border-border hover:border-primary"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 pt-2 border-t border-border">
              {[
                "🌿 Sustainable yarns",
                "🤲 Handmade to order",
                "📦 Free US shipping over $75",
              ].map((badge) => (
                <span key={badge} className="text-xs text-muted-foreground">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section className="mt-20" data-ocid="product.related.section">
            <h2 className="font-serif text-2xl text-foreground mb-6">
              You Might Also Love
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((rp, i) => (
                <ProductCard
                  key={rp.id.toString()}
                  product={rp}
                  index={i + 1}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
