// Curated recipe collections.
// The values in `name` are stored verbatim in the `recipes.collections`
// text[] column, so they must match what the auto-assignment seed used.

export type CollectionSlug =
  | "weeknight-suppers"
  | "italian-meals"
  | "vegetarian-options"
  | "romantic-meals";

export interface CollectionDef {
  slug: CollectionSlug;
  name: string; // stored value
  title: string; // display
  tagline: string;
  description: string;
}

export const collections: CollectionDef[] = [
  {
    slug: "weeknight-suppers",
    name: "Weeknight Suppers",
    title: "Weeknight Suppers",
    tagline: "Quick, comforting meals for busy nights",
    description:
      "Fuss-free recipes that come together quickly with everyday ingredients — perfect for school nights and after-work cooking.",
  },
  {
    slug: "italian-meals",
    name: "Italian Meals",
    title: "Italian Meals",
    tagline: "Pasta, risotto and the flavours of Italy",
    description:
      "From silky carbonara to creamy risotto and slow-cooked ragù — classic Italian dishes you can make at home.",
  },
  {
    slug: "vegetarian-options",
    name: "Vegetarian Options",
    title: "Vegetarian Options",
    tagline: "Plant-forward dishes without the meat",
    description:
      "Vegetable-led recipes and sweet bakes that prove a meat-free meal can be every bit as satisfying.",
  },
  {
    slug: "romantic-meals",
    name: "Romantic Meals",
    title: "Romantic Meals",
    tagline: "Elegant plates for special occasions",
    description:
      "Fillet steaks, hand-dived scallops, soufflés and other show-stoppers for date night and celebrations.",
  },
];

export const collectionNames: string[] = collections.map((c) => c.name);

export const collectionBySlug: Record<CollectionSlug, CollectionDef> =
  Object.fromEntries(collections.map((c) => [c.slug, c])) as Record<
    CollectionSlug,
    CollectionDef
  >;

export const collectionByName: Record<string, CollectionDef> =
  Object.fromEntries(collections.map((c) => [c.name, c]));

export const isCollectionSlug = (s: string | undefined): s is CollectionSlug =>
  !!s && s in collectionBySlug;
