import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  /** Optional className for outer wrapper to control surrounding spacing. */
  className?: string;
  /** Optional eyebrow above headline. */
  eyebrow?: string;
  /** Optional override headline (default fits the homepage). */
  headline?: string;
  /** Optional override description copy. */
  description?: string;
  /** Compact variant — used at the bottom of recipe pages. */
  variant?: "default" | "compact";
}

/**
 * Mailchimp embedded form action URL.
 * Configure once in src/lib/mailchimp.ts so every signup point posts to the
 * same audience. Falls back to a no-op (toast) until configured.
 */
import { MAILCHIMP_FORM_ACTION, MAILCHIMP_HIDDEN_BOT_FIELD } from "@/lib/mailchimp";

const schema = z.object({
  fname: z.string().trim().max(60).optional(),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick the box to subscribe" }),
  }),
});

const NewsletterSignup = ({
  className = "",
  eyebrow = "Newsletter",
  headline,
  description,
  variant = "default",
}: NewsletterSignupProps) => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const isConfigured =
    MAILCHIMP_FORM_ACTION &&
    !MAILCHIMP_FORM_ACTION.includes("REPLACE_WITH_YOUR_MAILCHIMP_URL");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    const result = schema.safeParse({ fname, email, consent });
    if (!result.success) {
      e.preventDefault();
      const first = result.error.errors[0];
      setError(first?.message || "Please check your details");
      return;
    }
    if (!isConfigured) {
      e.preventDefault();
      toast({
        title: "Almost there",
        description:
          "Add your Mailchimp form URL to src/lib/mailchimp.ts to enable subscriptions.",
      });
    }
    // Otherwise let the browser POST to the configured provider.
  };

  const isCompact = variant === "compact";

  return (
    <section
      className={`no-print bg-secondary border-t border-border ${className}`}
      aria-labelledby="newsletter-heading"
    >
      <div
        className={`container mx-auto px-6 md:px-12 lg:px-20 ${
          isCompact ? "py-12 md:py-14" : "py-16 md:py-20"
        }`}
      >
        <div className="max-w-2xl mx-auto text-center">
          {eyebrow && <p className="micro-caption mb-4">{eyebrow}</p>}
          <h2
            id="newsletter-heading"
            className={isCompact ? "heading-section mb-3" : "heading-editorial mb-4"}
          >
            {headline || "Get Weekly Recipes Delivered Free"}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {description ||
              "One short email a week with new recipes, seasonal ideas and the occasional kitchen tip. No spam, unsubscribe anytime."}
          </p>

          <form
            action={MAILCHIMP_FORM_ACTION || undefined}
            method="post"
            target="_blank"
            noValidate
            onSubmit={handleSubmit}
            className="space-y-4 max-w-md mx-auto text-left"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="sm:w-2/5">
                <label htmlFor="newsletter-fname" className="sr-only">
                  First name (optional)
                </label>
                <input
                  id="newsletter-fname"
                  type="text"
                  name="FNAME"
                  maxLength={60}
                  autoComplete="given-name"
                  placeholder="First name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="w-full min-h-[44px] px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30 transition-shadow"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="EMAIL"
                  required
                  maxLength={255}
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[44px] px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30 transition-shadow"
                />
              </div>
            </div>

            {/* Honeypot — Mailchimp's required hidden bot field */}
            {MAILCHIMP_HIDDEN_BOT_FIELD && (
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name={MAILCHIMP_HIDDEN_BOT_FIELD}
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>
            )}

            <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                name="gdpr[consent]"
                value="Y"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 w-4 h-4 flex-shrink-0 accent-foreground cursor-pointer"
              />
              <span>
                I agree to receive Stir &amp; Simmer's recipe newsletter and
                accept the{" "}
                <Link to="/privacy" className="underline hover:text-foreground">
                  privacy policy
                </Link>
                . You can unsubscribe at any time.
              </span>
            </label>

            {error && (
              <p className="text-xs text-destructive" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-[44px] px-6 py-3 bg-foreground text-background text-sm font-bold tracking-wide hover:bg-foreground/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
