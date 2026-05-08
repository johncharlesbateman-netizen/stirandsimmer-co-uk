import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

interface NewsletterSignupProps {
  className?: string;
  eyebrow?: string;
  headline?: string;
  description?: string;
  variant?: "default" | "compact";
}

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

const SUCCESS_MESSAGE = "You're in! 🎉 Your first recipes will be on their way soon.";
const ERROR_MESSAGE = "Something went wrong — please try again.";

/**
 * Submit to Mailchimp via JSONP (their `/subscribe/post` endpoint does not
 * support CORS, but `/subscribe/post-json` does support a JSONP callback).
 * Returns true on success, false on Mailchimp-reported error.
 */
const submitToMailchimp = (params: Record<string, string>): Promise<boolean> => {
  return new Promise((resolve) => {
    const jsonUrl = MAILCHIMP_FORM_ACTION.replace("/post?", "/post-json?");
    const cb = `mc_cb_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const query = new URLSearchParams(params);
    query.set("c", cb);

    const script = document.createElement("script");
    let settled = false;
    const cleanup = () => {
      delete (window as any)[cb];
      script.remove();
    };
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(false);
    }, 10000);

    (window as any)[cb] = (data: { result?: string }) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      cleanup();
      resolve(data?.result === "success");
    };

    script.onerror = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      cleanup();
      resolve(false);
    };

    script.src = `${jsonUrl}&${query.toString()}`;
    document.body.appendChild(script);
  });
};

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
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const result = schema.safeParse({ fname, email, consent });
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Please check your details");
      return;
    }

    setStatus("submitting");
    const params: Record<string, string> = {
      EMAIL: email.trim(),
      "gdpr[consent]": "Y",
    };
    if (fname.trim()) params.FNAME = fname.trim();
    if (MAILCHIMP_HIDDEN_BOT_FIELD) params[MAILCHIMP_HIDDEN_BOT_FIELD] = "";

    const ok = await submitToMailchimp(params);
    if (ok) {
      setStatus("success");
      setFname("");
      setEmail("");
      setConsent(false);
    } else {
      setStatus("idle");
      setError(ERROR_MESSAGE);
    }
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

          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="max-w-md mx-auto p-6 bg-background border border-border text-foreground"
            >
              <p className="text-base">{SUCCESS_MESSAGE}</p>
            </div>
          ) : (
            <form
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
                disabled={status === "submitting"}
                className="w-full min-h-[44px] px-6 py-3 bg-foreground text-background text-sm font-bold tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
