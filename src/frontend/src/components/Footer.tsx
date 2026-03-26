import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiInstagram, SiPinterest, SiTiktok } from "react-icons/si";
import { toast } from "sonner";
import { useSubscribeEmail } from "../hooks/useQueries";

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeEmail();
  const year = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribe.mutateAsync(email);
      toast.success("You're in the gang!");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-ink border-t border-ink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-5">
          <Link
            to="/"
            className="font-display text-2xl italic font-semibold text-white hover:text-gold transition-colors"
          >
            Veloura
          </Link>
          <p className="text-sm text-white/50 leading-relaxed">
            Goofy handmade crochet pieces crafted with pure creative energy, one
            stitch at a time.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/veloura"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/40 hover:text-gold transition-colors"
            >
              <SiInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://pinterest.com/veloura"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="text-white/40 hover:text-gold transition-colors"
            >
              <SiPinterest className="h-4 w-4" />
            </a>
            <a
              href="https://tiktok.com/@veloura"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-white/40 hover:text-gold transition-colors"
            >
              <SiTiktok className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-body text-xs tracking-[0.15em] uppercase font-semibold text-white/60 mb-5">
            Navigate
          </h4>
          <ul className="flex flex-col gap-3">
            {(
              [
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "About Dhiya" },
                { to: "/contact", label: "Contact" },
              ] as const
            ).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/50 hover:text-gold transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs tracking-[0.15em] uppercase font-semibold text-white/60 mb-2">
            Stay in the Loop
          </h4>
          <p className="text-sm text-white/40 mb-5">
            New drops, restocks &mdash; right to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-ocid="footer.newsletter.input"
              className="bg-white/8 flex-1 border border-white/15 text-white placeholder:text-white/30 rounded-none px-4 text-sm"
            />
            <Button
              type="submit"
              disabled={subscribe.isPending}
              data-ocid="footer.newsletter.submit_button"
              className="font-body font-semibold rounded-none px-5 text-sm bg-gold text-ink hover:bg-goldmuted transition-colors"
            >
              {subscribe.isPending ? "..." : "Join"}
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/8 py-5 text-center text-xs text-white/30">
        &copy; {year}. Built with <span className="text-gold">&hearts;</span>{" "}
        using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : "",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors font-semibold"
        >
          caffeine.ai
        </a>
      </div>
    </footer>
  );
}
