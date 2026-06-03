// Site author identity for E-E-A-T. Use AUTHOR_PERSON_SCHEMA to embed
// the full Person node (on the About page) and AUTHOR_REFERENCE to
// link to it from Article/Recipe author fields on other pages.

export const SITE_ORIGIN = "https://stirandsimmer.co.uk";

export const AUTHOR_PERSON_ID = `${SITE_ORIGIN}/about#person`;

export const AUTHOR_NAME = "John Bateman";

export const AUTHOR_SAME_AS = [
  "https://www.instagram.com/stirandsimmeruk",
];

/** Full Person node — embed once on the About page. */
export const AUTHOR_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": AUTHOR_PERSON_ID,
  name: AUTHOR_NAME,
  url: `${SITE_ORIGIN}/about`,
  jobTitle: "Recipe developer and writer",
  worksFor: {
    "@type": "Organization",
    name: "Stir & Simmer",
    url: SITE_ORIGIN,
  },
  sameAs: AUTHOR_SAME_AS,
};

/** Lightweight reference for author fields in Article / Recipe schemas. */
export const AUTHOR_REFERENCE = {
  "@type": "Person",
  "@id": AUTHOR_PERSON_ID,
  name: AUTHOR_NAME,
  url: `${SITE_ORIGIN}/about`,
  sameAs: AUTHOR_SAME_AS,
};
