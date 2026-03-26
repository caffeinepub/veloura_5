import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Review } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { useFadeIn } from "../hooks/useFadeIn";
import {
  useProducts,
  useReviews,
  useSubscribeEmail,
} from "../hooks/useQueries";

function FadeSection({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function StarRating({ rating }: { rating: bigint }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${
            n <= Number(rating) ? "fill-gold text-gold" : "text-border"
          }`}
        />
      ))}
    </div>
  );
}

const categories = [
  {
    label: "Bags",
    to: "/shop" as const,
    desc: "Totes, pouches & crossbodies",
  },
  {
    label: "Clothing",
    to: "/shop" as const,
    desc: "Cozy sweaters & cardigans",
  },
  {
    label: "Accessories",
    to: "/shop" as const,
    desc: "Hats, scarves & more",
  },
];

export default function Home() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: reviews, isLoading: reviewsLoading } = useReviews();
  const subscribe = useSubscribeEmail();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const featuredProducts = products?.slice(0, 4) ?? [];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await subscribe.mutateAsync(newsletterEmail);
      toast.success("Welcome to the list.");
      setNewsletterEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main>
      {/* ===== HERO ===== */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-background"
        data-ocid="home.hero.section"
      >
        {/* Decorative gold line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Floating character — subtle accent */}
        <img
          src="/assets/generated/cute-char-yarny-transparent.dim_400x400.png"
          alt=""
          aria-hidden="true"
          className="float-gentle absolute right-[5%] top-[15%] w-24 md:w-36 opacity-25 pointer-events-none select-none"
        />
        <img
          src="/assets/generated/cute-char-froggo-transparent.dim_400x400.png"
          alt=""
          aria-hidden="true"
          className="float-gentle-slow absolute right-[10%] bottom-[15%] w-16 md:w-24 opacity-20 pointer-events-none select-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-10"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-gold" />
                <span className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                  Handmade Crochet
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.05] text-foreground">
                Hey, I&rsquo;m Dhiya
              </h1>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal italic leading-[1.05] text-foreground/60">
                I crochet goofs.
              </h1>
            </div>

            <p className="font-body text-base md:text-lg leading-relaxed max-w-md text-muted-foreground">
              A young crocheter with a hook, some yarn, and absolutely unhinged
              creative energy — dropping one-of-a-kind pieces into the world.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="font-body font-semibold text-xs tracking-[0.1em] uppercase rounded-none px-10 h-12 bg-ink text-white hover:bg-foreground/90 transition-colors"
                data-ocid="home.hero.primary_button"
              >
                <Link to="/shop">Shop the Collection</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-body font-semibold text-xs tracking-[0.1em] uppercase rounded-none px-10 h-12 border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-colors"
                data-ocid="home.hero.secondary_button"
              >
                <Link to="/about">About Dhiya</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom decorative rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section
        className="py-28 bg-background"
        data-ocid="home.featured.section"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <FadeSection className="mb-16">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-gold" />
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                    New Arrivals
                  </p>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
                  Fresh Drops
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden sm:inline-flex font-body text-xs tracking-[0.12em] uppercase font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                View all &rarr;
              </Link>
            </div>
          </FadeSection>

          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="space-y-3"
                  data-ocid="home.featured.loading_state"
                >
                  <Skeleton className="aspect-square" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {featuredProducts.map((product, i) => (
                <FadeSection key={product.id.toString()}>
                  <ProductCard product={product} index={i + 1} />
                </FadeSection>
              ))}
            </div>
          )}

          <FadeSection className="text-center mt-12 sm:hidden">
            <Button
              asChild
              size="lg"
              className="font-body font-semibold text-xs tracking-[0.1em] uppercase rounded-none px-10 h-12 bg-ink text-white hover:bg-foreground/90"
              data-ocid="home.view_all.button"
            >
              <Link to="/shop">See Everything</Link>
            </Button>
          </FadeSection>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section
        className="py-24 section-cream"
        data-ocid="home.categories.section"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <FadeSection className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                Collections
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
              Find Your Style
            </h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {categories.map((cat, i) => (
              <FadeSection key={cat.label}>
                <Link
                  to={cat.to}
                  data-ocid={`home.category.item.${i + 1}`}
                  className="flex items-center justify-between p-8 bg-background hover:bg-cream transition-colors duration-200 group"
                >
                  <div>
                    <h3 className="font-display text-lg font-normal mb-1 text-foreground group-hover:text-gold transition-colors">
                      {cat.label}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground">
                      {cat.desc}
                    </p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-gold transition-colors text-sm ml-4">
                    &rarr;
                  </span>
                </Link>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT TEASER ===== */}
      <section className="py-28 bg-background" data-ocid="home.about.section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <FadeSection className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-gold" />
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                    The Creator
                  </p>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-normal leading-tight text-foreground">
                  Hi, I&rsquo;m Dhiya
                </h2>
              </div>
              <p className="font-body leading-relaxed text-base md:text-lg text-muted-foreground">
                A young crocheter with a hook, some yarn, and absolutely
                unhinged creative energy. Every piece I make is goofy,
                one-of-a-kind, and made to bring a little joy into your world.
              </p>
              <Button
                asChild
                className="font-body font-semibold text-xs tracking-[0.1em] uppercase rounded-none px-10 h-12 bg-ink text-white hover:bg-foreground/90 w-fit transition-colors"
                data-ocid="home.about.primary_button"
              >
                <Link to="/about">Get to know me</Link>
              </Button>
            </FadeSection>

            {/* Decorative brand panel — replaces selfie photo */}
            <FadeSection>
              <div className="relative flex justify-center">
                <div
                  className="relative z-10 w-full max-w-sm flex flex-col items-center justify-center gap-6"
                  style={{
                    aspectRatio: "3/4",
                    background: "oklch(0.97 0.015 80)",
                  }}
                >
                  {/* Top rule */}
                  <div className="absolute top-8 left-8 right-8 h-px bg-gold/30" />
                  {/* Bottom rule */}
                  <div className="absolute bottom-8 left-8 right-8 h-px bg-gold/30" />

                  {/* Brand initial monogram */}
                  <div
                    className="w-28 h-28 flex items-center justify-center border"
                    style={{ borderColor: "oklch(0.72 0.08 75)" }}
                  >
                    <span
                      className="font-display text-6xl font-normal"
                      style={{ color: "oklch(0.72 0.08 75)" }}
                    >
                      V
                    </span>
                  </div>

                  {/* Brand name */}
                  <div className="text-center space-y-2">
                    <p
                      className="font-display text-2xl font-normal tracking-wide"
                      style={{ color: "oklch(0.25 0.02 80)" }}
                    >
                      Veloura
                    </p>
                    <p
                      className="font-body text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: "oklch(0.72 0.08 75)" }}
                    >
                      Handmade Crochet
                    </p>
                  </div>

                  {/* Froggo accent — bottom right */}
                  <img
                    src="/assets/generated/cute-char-froggo-transparent.dim_400x400.png"
                    alt=""
                    aria-hidden="true"
                    className="float-gentle-slow absolute -bottom-6 -right-6 z-20 w-16 opacity-60"
                  />
                </div>

                {/* Gold accent line */}
                <div className="absolute -left-6 top-1/4 bottom-1/4 w-px bg-gold/40" />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ===== STYLE CORNER ===== */}
      <section className="py-24 section-cream" data-ocid="home.style.section">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeSection className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                Wearables
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
              Style Yourself
            </h2>
            <p className="font-body text-muted-foreground text-base mt-3 max-w-md">
              Dhiya makes accessories that hit different.
            </p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <FadeSection>
              <div className="flex flex-col items-center gap-5 text-center group">
                <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
                  <img
                    src="/assets/generated/dhiya-specs-transparent.dim_500x200.png"
                    alt="Crochet Glasses"
                    className="w-48 float-gentle drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="font-display italic text-base font-normal text-foreground block mb-1">
                    Crochet Specs
                  </span>
                  <p className="font-body text-xs text-muted-foreground">
                    Oversized frames. Handmade. Very you.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="flex flex-col items-center gap-5 text-center group">
                <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
                  <img
                    src="/assets/generated/dhiya-crochet-accessories-transparent.dim_600x400.png"
                    alt="Crochet Accessories"
                    className="w-56 float-gentle-delayed drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="font-display italic text-base font-normal text-foreground block mb-1">
                    Bags &amp; Hats
                  </span>
                  <p className="font-body text-xs text-muted-foreground">
                    Totes, beanies, clips &amp; more.
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection>
              <div className="flex flex-col items-center gap-5 text-center group">
                <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
                  <img
                    src="/assets/generated/dhiya-bunny-headband-transparent.dim_400x300.png"
                    alt="Bunny Headband"
                    className="w-44 float-gentle-slow drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="font-display italic text-base font-normal text-foreground block mb-1">
                    Bunny Headband
                  </span>
                  <p className="font-body text-xs text-muted-foreground">
                    The softest head game in town.
                  </p>
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section
        className="py-24 bg-background"
        data-ocid="home.testimonials.section"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <FadeSection className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                Reviews
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
              What People Are Saying
            </h2>
          </FadeSection>
          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <Skeleton
                  key={n}
                  className="h-40"
                  data-ocid="home.testimonials.loading_state"
                />
              ))}
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review: Review, i: number) => (
                <FadeSection key={`review-${review.name}-${i}`}>
                  <div
                    data-ocid={`home.testimonial.item.${i + 1}`}
                    className="p-8 border border-border hover:shadow-card transition-shadow"
                  >
                    <StarRating rating={review.rating} />
                    <p className="font-body text-muted-foreground mt-5 leading-relaxed text-sm italic">
                      &ldquo;{review.content}&rdquo;
                    </p>
                    <p className="font-body font-semibold text-xs tracking-[0.1em] uppercase mt-5 text-foreground">
                      {review.name}
                    </p>
                  </div>
                </FadeSection>
              ))}
            </div>
          ) : (
            <div
              data-ocid="home.testimonials.empty_state"
              className="text-center text-muted-foreground py-8"
            >
              <p className="font-body text-sm">
                Reviews coming soon — be the first!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section
        className="py-28 section-cream"
        data-ocid="home.newsletter.section"
      >
        <div className="max-w-xl mx-auto px-6 sm:px-8 text-center">
          <FadeSection className="space-y-7">
            <div className="flex justify-center mb-2">
              <img
                src="/assets/generated/cute-char-beary-transparent.dim_400x400.png"
                alt=""
                aria-hidden="true"
                className="float-gentle w-14 h-14 opacity-50"
              />
            </div>
            <div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold" />
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                  Newsletter
                </p>
                <div className="h-px w-8 bg-gold" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
                Stay in the Loop
              </h2>
            </div>
            <p className="font-body text-muted-foreground text-base">
              Early access to new drops, restocks, and behind-the-scenes
              goodness.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-0 pt-2 border border-border"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                data-ocid="home.newsletter.input"
                className="flex-1 border-0 rounded-none px-5 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
              />
              <Button
                type="submit"
                disabled={subscribe.isPending}
                data-ocid="home.newsletter.submit_button"
                className="font-body font-semibold text-xs tracking-[0.1em] uppercase rounded-none px-8 h-12 bg-ink text-white hover:bg-foreground/90 shrink-0"
              >
                {subscribe.isPending ? "Joining..." : "Subscribe"}
              </Button>
            </form>
          </FadeSection>
        </div>
      </section>
    </main>
  );
}
