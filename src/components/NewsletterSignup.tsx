import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  /** Optional className for outer wrapper to control surrounding spacing. */
  className?: string;
  /** Optional eyebrow above headline. */
  eyebrow?: string;
}

/**
 * Reusable newsletter sign-up block.
 * The form action URL is intentionally a placeholder — replace with your
 * Mailchimp or Brevo embed URL when ready.
 */
const NewsletterSignup = ({
  className = "",
  eyebrow = "Newsletter",
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // TODO: replace with your Mailchimp or Brevo form action URL.
  const FORM_ACTION = "REPLACE_WITH_YOUR_MAILCHIMP_OR_BREVO_URL";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (FORM_ACTION === "REPLACE_WITH_YOUR_MAILCHIMP_OR_BREVO_URL") {
      e.preventDefault();
      toast({
        title: "Almost there",
        description:
          "Add your Mailchimp or Brevo form URL to enable subscriptions.",
      });
    }
    // Otherwise let the browser POST to the configured provider.
  };

  return (
    <section className={`no-print bg-secondary border-t border-border ${className}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {eyebrow && <p className="micro-caption mb-4">{eyebrow}</p>}
          <h2 className="heading-editorial mb-4">
            Get Weekly Recipes Delivered Free
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            One short email a week with new recipes, seasonal ideas and the
            occasional kitchen tip. No spam, unsubscribe anytime.
          </p>

          <form
            action={FORM_ACTION}
            method="post"
            target="_blank"
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
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
              className="flex-1 px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30 transition-shadow"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-foreground text-background text-sm font-bold tracking-wide hover:bg-foreground/90 transition-colors"
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
