import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useFadeIn } from "../hooks/useFadeIn";

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

const values = [
  {
    icon: Heart,
    title: "100% Handmade",
    desc: "Every single stitch is placed by Dhiya's hands. No machines, no factories — just pure hand-crafted magic.",
  },
  {
    icon: Zap,
    title: "Goofy by Design",
    desc: "Boring is not in the vocabulary. Each piece is quirky, fun, and made to make you smile.",
  },
  {
    icon: Sparkles,
    title: "One-of-a-Kind",
    desc: "Nothing is mass-produced. Every creation is unique — you get something nobody else in the world has.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen">
      {/* ===== HERO ===== */}
      <section
        className="relative py-28 overflow-hidden bg-background"
        data-ocid="about.hero.section"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Decorative character */}
        <img
          src="/assets/generated/cute-char-yarny-transparent.dim_400x400.png"
          alt=""
          aria-hidden="true"
          className="float-gentle absolute right-8 bottom-8 w-20 opacity-15 pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-gold" />
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                    About the Creator
                  </p>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight text-foreground">
                  The Hook, the Yarn,
                  <br />
                  <span className="italic text-foreground/60">
                    &amp; the Chaos
                  </span>
                </h1>
              </div>
              <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
                Hi! I&rsquo;m{" "}
                <strong className="text-foreground font-semibold">Dhiya</strong>{" "}
                &mdash; a young crocheter with a hook, some yarn, and absolutely
                unhinged creative energy. I make goofy, one-of-a-kind crochet
                pieces that actually slap. No boring stuff here.
              </p>
            </motion.div>

            {/* Decorative monogram panel — replaces founder photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Main decorative panel */}
                <div
                  className="relative z-10 w-64 md:w-80 flex flex-col items-center justify-center gap-6"
                  style={{
                    aspectRatio: "3/4",
                    background: "oklch(0.97 0.015 80)",
                  }}
                >
                  {/* Top rule */}
                  <div className="absolute top-10 left-10 right-10 h-px bg-gold/30" />
                  {/* Bottom rule */}
                  <div className="absolute bottom-10 left-10 right-10 h-px bg-gold/30" />

                  {/* Monogram */}
                  <div
                    className="w-24 h-24 flex items-center justify-center border-2"
                    style={{ borderColor: "oklch(0.72 0.08 75)" }}
                  >
                    <span
                      className="font-display text-5xl font-normal"
                      style={{ color: "oklch(0.72 0.08 75)" }}
                    >
                      V
                    </span>
                  </div>

                  {/* Brand copy */}
                  <div className="text-center space-y-1 px-6">
                    <p
                      className="font-display text-xl font-normal"
                      style={{ color: "oklch(0.25 0.02 80)" }}
                    >
                      Veloura
                    </p>
                    <p
                      className="font-body text-[9px] tracking-[0.3em] uppercase"
                      style={{ color: "oklch(0.72 0.08 75)" }}
                    >
                      by Dhiya
                    </p>
                  </div>
                </div>

                {/* Gold accent lines */}
                <div className="absolute -right-5 top-8 bottom-8 w-px bg-gold/40" />
                <div className="absolute -bottom-5 left-8 right-8 h-px bg-gold/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-24 section-cream" data-ocid="about.values.section">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <FadeSection className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                Why Dhiya?
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
              The Dhiya Difference
            </h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {values.map((val, i) => (
              <FadeSection key={val.title}>
                <div
                  data-ocid={`about.value.item.${i + 1}`}
                  className="p-8 bg-background hover:bg-cream transition-colors space-y-5"
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center"
                    style={{ background: "oklch(0.94 0.03 80)" }}
                  >
                    <val.icon className="h-4 w-4 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-normal text-foreground">
                    {val.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHARACTERS ===== */}
      <section
        className="py-24 bg-background"
        data-ocid="about.characters.section"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <FadeSection className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
                Signature Creations
              </p>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
              Meet the Crew
            </h2>
            <p className="font-body text-muted-foreground text-base mt-4 max-w-md mx-auto">
              These little goofballs are Dhiya&rsquo;s signature characters.
              Each one has its own personality &mdash; just like their maker.
            </p>
          </FadeSection>
          <div className="flex justify-center items-end gap-10 md:gap-16">
            <div className="flex flex-col items-center gap-4">
              <img
                src="/assets/generated/cute-char-yarny-transparent.dim_400x400.png"
                alt="Yarn ball character"
                className="float-gentle w-28 md:w-36"
              />
              <span className="font-body text-xs tracking-[0.15em] uppercase font-medium text-foreground">
                Yarny
              </span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                src="/assets/generated/cute-char-beary-transparent.dim_400x400.png"
                alt="Goofy bear plushie"
                className="float-gentle-delayed w-36 md:w-48"
              />
              <span className="font-body text-xs tracking-[0.15em] uppercase font-medium text-gold">
                Beary
              </span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                src="/assets/generated/cute-char-froggo-transparent.dim_400x400.png"
                alt="Derpy frog plushie"
                className="float-gentle-slow w-28 md:w-36"
              />
              <span className="font-body text-xs tracking-[0.15em] uppercase font-medium text-foreground">
                Froggo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className="py-24 section-cream text-center"
        data-ocid="about.cta.section"
      >
        <FadeSection className="max-w-xl mx-auto px-6 space-y-7">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground">
            Ready to find your piece?
          </h2>
          <p className="font-body text-muted-foreground text-base">
            Browse the full collection and find your new goofy little companion.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="font-body font-semibold text-xs tracking-[0.1em] uppercase rounded-none px-10 h-12 bg-ink text-white hover:bg-foreground/90 transition-colors"
              data-ocid="about.shop.primary_button"
            >
              <Link to="/shop">Shop the Collection</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-body font-semibold text-xs tracking-[0.1em] uppercase rounded-none px-10 h-12 border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-colors"
              data-ocid="about.contact.secondary_button"
            >
              <Link to="/contact">Say Hello</Link>
            </Button>
          </div>
        </FadeSection>
      </section>
    </main>
  );
}
