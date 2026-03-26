import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Instagram, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitForm = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitForm.mutateAsync(form);
      setSubmitted(true);
      toast.success("Message sent! I'll get back to you within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen">
      <section
        className="section-cream py-24 text-center"
        data-ocid="contact.header.section"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
              Contact
            </p>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-foreground">
            Let&rsquo;s Connect
          </h1>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Have a question or just want to say hi? I&rsquo;d love to hear from
            you.
          </p>
        </motion.div>
      </section>
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
              data-ocid="contact.info.panel"
            >
              <div>
                <h2 className="font-display text-2xl font-normal text-foreground mb-7">
                  Reach Out
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-5 items-start">
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.94 0.03 80)" }}
                    >
                      <Mail className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-xs tracking-[0.1em] uppercase text-foreground mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:hello@veloura.com"
                        className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        hello@veloura.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.94 0.03 80)" }}
                    >
                      <Instagram className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-xs tracking-[0.1em] uppercase text-foreground mb-1">
                        Instagram
                      </p>
                      <a
                        href="https://instagram.com/veloura"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        @veloura
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.94 0.03 80)" }}
                    >
                      <Clock className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-xs tracking-[0.1em] uppercase text-foreground mb-1">
                        Response Time
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        I reply within 24 hours, Mon&ndash;Fri.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              data-ocid="contact.form.panel"
            >
              {submitted ? (
                <div
                  data-ocid="contact.form.success_state"
                  className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                >
                  <CheckCircle className="h-12 w-12 text-gold" />
                  <h3 className="font-display italic text-2xl text-foreground">
                    Message Sent!
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Thank you for reaching out. I&rsquo;ll be in touch within 24
                    hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-2 rounded-none border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                    data-ocid="contact.form.reset.button"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 bg-card p-8 border border-border shadow-card"
                >
                  <h2 className="font-display italic text-xl font-normal text-foreground mb-2">
                    Send a Message
                  </h2>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="font-body text-xs tracking-[0.1em] uppercase font-semibold text-foreground"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="contact.name.input"
                      className="rounded-none border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="font-body text-xs tracking-[0.1em] uppercase font-semibold text-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      data-ocid="contact.email.input"
                      className="rounded-none border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-message"
                      className="font-body text-xs tracking-[0.1em] uppercase font-semibold text-foreground"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="A question about an order, or just say hello!"
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      data-ocid="contact.message.textarea"
                      className="resize-none rounded-none border-border"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitForm.isPending}
                    data-ocid="contact.form.submit_button"
                    className="w-full bg-ink text-white hover:bg-foreground/90 h-11 rounded-none font-body tracking-[0.08em] uppercase text-xs font-semibold"
                  >
                    {submitForm.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
