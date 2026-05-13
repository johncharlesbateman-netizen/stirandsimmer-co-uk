import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "ss_cookie_consent_v1";
const COOKIE_OFFSET_VAR = "--cookie-consent-offset";

type Choice = "all" | "essential" | null;

const readChoice = (): Choice => {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "all" || v === "essential") return v;
  } catch {
    /* ignore */
  }
  return null;
};

const writeChoice = (c: Exclude<Choice, null>) => {
  try {
    localStorage.setItem(STORAGE_KEY, c);
  } catch {
    /* ignore */
  }
};

/**
 * Brand-styled cookie consent banner. Persists the user's choice in
 * localStorage so the banner only appears until first interaction.
 */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (readChoice() === null) {
      // Defer slightly so it doesn't compete with first paint.
      const t = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(t);
    }
  }, []);

  // While the banner is visible, reserve exactly the space it occupies and
  // expose that offset to other fixed mobile UI so nothing sits underneath it.
  useEffect(() => {
    if (!visible) return;

    const prev = document.body.style.paddingBottom;
    const prevOffset = document.documentElement.style.getPropertyValue(COOKIE_OFFSET_VAR);

    const apply = () => {
      const bannerHeight = bannerRef.current?.getBoundingClientRect().height ?? 0;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const reservedSpace = Math.ceil(bannerHeight) + (isMobile ? 16 : 24);

      document.body.style.paddingBottom = `${reservedSpace}px`;
      document.documentElement.style.setProperty(COOKIE_OFFSET_VAR, `${reservedSpace}px`);
    };

    apply();

    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => apply())
      : null;

    if (bannerRef.current) {
      observer?.observe(bannerRef.current);
    }

    window.addEventListener("resize", apply);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", apply);
      document.body.style.paddingBottom = prev;
      if (prevOffset) {
        document.documentElement.style.setProperty(COOKIE_OFFSET_VAR, prevOffset);
      } else {
        document.documentElement.style.removeProperty(COOKIE_OFFSET_VAR);
      }
    };
  }, [visible, showPrefs]);

  const acceptAll = () => {
    writeChoice("all");
    setVisible(false);
  };
  const rejectAll = () => {
    writeChoice("essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      aria-label="Cookie consent"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] px-4 pb-4 pt-3 md:px-6 md:pb-6"
    >
      <div
        className="pointer-events-auto mx-auto w-full max-w-3xl rounded-lg border shadow-2xl px-5 py-4 md:px-6 md:py-5"
        style={{
          backgroundColor: "#1a0e00",
          color: "#f5ead6",
          borderColor: "rgba(245, 234, 214, 0.12)",
        }}
      >
        {!showPrefs ? (
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="flex-1 text-[13px] leading-6 md:text-sm md:leading-relaxed" style={{ color: "#f5ead6" }}>
              We use cookies to improve your experience, analyse traffic and
              show relevant content. See our{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-2 hover:opacity-90"
                style={{ color: "#f5ead6" }}
              >
                privacy policy
              </Link>
              .
            </div>
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center md:justify-end md:gap-x-5 md:gap-y-2 md:shrink-0">
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="col-span-2 text-left text-xs underline underline-offset-2 hover:opacity-90 md:col-span-1 md:text-sm md:text-center"
                style={{ color: "rgba(245, 234, 214, 0.7)" }}
              >
                Manage preferences
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-xs font-medium transition-opacity hover:opacity-90 md:min-h-11 md:text-sm"
                style={{
                  color: "rgba(245, 234, 214, 0.88)",
                  borderColor: "rgba(245, 234, 214, 0.18)",
                }}
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-xs font-semibold tracking-wide transition-opacity hover:opacity-90 md:min-h-11 md:px-5 md:py-2.5 md:text-sm"
                style={{ backgroundColor: "#C97B1A", color: "#1a0e00" }}
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-sm" style={{ color: "#f5ead6" }}>
            <h2 className="font-display text-lg" style={{ color: "#f5ead6" }}>
              Cookie preferences
            </h2>
            <ul className="space-y-2">
              <li>
                <strong style={{ color: "#f5ead6" }}>Essential</strong>{" "}
                <span style={{ color: "rgba(245, 234, 214, 0.75)" }}>
                  — always on. Required for the site to work.
                </span>
              </li>
              <li>
                <strong style={{ color: "#f5ead6" }}>Analytics & marketing</strong>{" "}
                <span style={{ color: "rgba(245, 234, 214, 0.75)" }}>
                  — help us improve the site and show relevant content.
                </span>
              </li>
            </ul>
            <div className="flex flex-col items-stretch gap-2 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-5 sm:gap-y-2">
              <button
                type="button"
                onClick={() => setShowPrefs(false)}
                className="text-left text-sm underline underline-offset-2 hover:opacity-90 sm:text-center"
                style={{ color: "rgba(245, 234, 214, 0.7)" }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="text-left text-sm underline underline-offset-2 hover:opacity-90 sm:text-center"
                style={{ color: "rgba(245, 234, 214, 0.7)" }}
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#C97B1A", color: "#1a0e00" }}
              >
                Accept all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
