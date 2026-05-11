import { useEffect } from "react";

const CANONICAL_HOST = "www.stirandsimmer.co.uk";

/**
 * Client-side URL normaliser. On the production custom domain, redirects:
 *  - stirandsimmer.co.uk → www.stirandsimmer.co.uk
 *  - any path with a trailing slash (other than "/") → version without it
 * Lovable previews and localhost are left alone.
 */
const CanonicalRedirect = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { hostname, pathname, search, hash, protocol } = window.location;

    // Only enforce on the production apex/www domain.
    const isApex = hostname === "stirandsimmer.co.uk";
    const isWww = hostname === CANONICAL_HOST;
    if (!isApex && !isWww) return;

    let nextPath = pathname;
    // Strip trailing slash on every path except the root.
    if (nextPath.length > 1 && nextPath.endsWith("/")) {
      nextPath = nextPath.replace(/\/+$/, "") || "/";
    }

    const needsHostFix = isApex;
    const needsPathFix = nextPath !== pathname;
    if (!needsHostFix && !needsPathFix) return;

    const target = `${protocol}//${CANONICAL_HOST}${nextPath}${search}${hash}`;
    window.location.replace(target);
  }, []);

  return null;
};

export default CanonicalRedirect;
