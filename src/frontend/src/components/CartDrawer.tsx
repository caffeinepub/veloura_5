import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { formatPrice, getCategoryImage } from "../utils/productImages";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={closeCart}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full z-50 w-full max-w-md bg-background shadow-2xl flex flex-col"
            data-ocid="cart.panel"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl font-normal italic">
                Your Cart
                {totalItems > 0 && (
                  <span className="text-sm font-body not-italic text-muted-foreground ml-1.5">
                    ({totalItems})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                data-ocid="cart.close_button"
                className="p-2 hover:text-foreground text-muted-foreground transition-colors"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div
                  data-ocid="cart.empty_state"
                  className="flex flex-col items-center justify-center h-full gap-5 text-center"
                >
                  <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-30" />
                  <p className="font-display italic text-lg text-muted-foreground">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add some beautiful pieces to get started.
                  </p>
                  <Button
                    variant="outline"
                    onClick={closeCart}
                    data-ocid="cart.continue_shopping.button"
                    className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-5" data-ocid="cart.list">
                  {items.map((item, idx) => (
                    <li
                      key={item.product.id.toString()}
                      data-ocid={`cart.item.${idx + 1}`}
                      className="flex gap-4 items-start"
                    >
                      <img
                        src={getCategoryImage(item.product.category)}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover border border-border"
                      />
                      <div className="flex-1">
                        <p className="font-body font-medium text-sm text-foreground">
                          {item.product.name}
                        </p>
                        {item.selectedSize && (
                          <p className="text-xs text-muted-foreground">
                            Size: {item.selectedSize}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-gold mt-1">
                          {formatPrice(item.product.priceCents)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            data-ocid={`cart.qty_minus.${idx + 1}`}
                            className="p-1 border border-border hover:border-foreground transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            data-ocid={`cart.qty_plus.${idx + 1}`}
                            className="p-1 border border-border hover:border-foreground transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        data-ocid={`cart.delete_button.${idx + 1}`}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-display italic text-lg">Subtotal</span>
                  <span className="font-body font-semibold text-lg">
                    ${(totalPrice / 100).toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full bg-ink text-white hover:bg-foreground/90 h-11 rounded-none font-body tracking-[0.08em] uppercase text-xs font-semibold"
                  data-ocid="cart.checkout.button"
                  onClick={() => toast.info("Checkout coming soon!")}
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
