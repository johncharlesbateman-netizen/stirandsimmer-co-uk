export type CookingStep = {
  text: string;
  /** Optional countdown for this step, in seconds */
  durationSeconds?: number;
  /** Substrings within `text` to highlight in amber (key ingredients/techniques) */
  highlights?: string[];
  /** Optional chef tip shown beneath the step */
  tip?: string;
};

export type CompanionRecipe = {
  id: string;
  emoji: string;
  name: string;
  region: string;
  description: string;
  time: string;
  spice: "Mild" | "Medium" | "Hot";
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  steps: CookingStep[];
};

export const companionRecipes: CompanionRecipe[] = [
  {
    id: "chingri-do-piaza",
    emoji: "🦐",
    name: "Chingri Do Piaza",
    region: "Bengal · South Asia",
    description:
      "Plump prawns simmered with twice the onions, mustard oil and a whisper of Bengali garam masala. Slow, fragrant, and deeply warming.",
    time: "45 min",
    spice: "Medium",
    difficulty: "Medium",
    ingredients: [
      "500g large prawns, peeled and deveined",
      "3 onions — half finely sliced, half roughly chopped",
      "3 tbsp mustard oil",
      "2 tsp ginger-garlic paste",
      "1 tsp turmeric",
      "2 green chillies, slit",
      "1 tsp Bengali garam masala",
      "Fresh coriander to finish",
    ],
    steps: [
      {
        text: "Marinate the prawns with turmeric and a pinch of salt for ten minutes.",
        durationSeconds: 600,
        highlights: ["prawns", "turmeric"],
        tip: "A short marinade firms the prawns and lifts the colour — don't go longer or the salt will start to draw out moisture.",
      },
      {
        text: "Heat the mustard oil in a heavy pan until it just smokes, then lower the heat.",
        highlights: ["mustard oil"],
        tip: "Smoking mustard oil briefly mellows its raw bite. The flavour should still be present but rounded.",
      },
      {
        text: "Fry the sliced onions until deeply golden and sweet.",
        durationSeconds: 480,
        highlights: ["sliced onions", "deeply golden"],
      },
      {
        text: "Add the ginger-garlic paste and chopped onions; cook until softened and fragrant.",
        highlights: ["ginger-garlic paste", "chopped onions"],
      },
      {
        text: "Slide in the prawns and chillies, turning gently until they curl and turn pink.",
        durationSeconds: 240,
        highlights: ["prawns", "chillies"],
        tip: "Pull them off the heat the moment they curl — residual heat finishes the job and keeps them tender.",
      },
      {
        text: "Finish with garam masala, scatter with coriander and serve with steamed rice.",
        highlights: ["garam masala", "coriander"],
      },
    ],
  },
  {
    id: "miso-glazed-aubergine",
    emoji: "🍆",
    name: "Miso-Glazed Aubergine",
    region: "Japan",
    description:
      "Silky aubergine lacquered in a sweet-savoury miso glaze, blistered until caramelised at the edges.",
    time: "30 min",
    spice: "Mild",
    difficulty: "Easy",
    ingredients: [
      "2 large aubergines",
      "3 tbsp white miso",
      "2 tbsp mirin",
      "1 tbsp sake",
      "1 tbsp caster sugar",
      "Toasted sesame seeds",
      "Spring onion, finely sliced",
    ],
    steps: [
      { text: "Heat the grill to high. Halve the aubergines lengthways and score the flesh in a diamond pattern." },
      { text: "Brush with a little oil and grill, cut-side up, until softened and lightly charred.", durationSeconds: 600 },
      { text: "Whisk the miso, mirin, sake and sugar together in a small bowl." },
      { text: "Spoon the glaze generously over the aubergines and return to the grill until caramelised and bubbling.", durationSeconds: 240 },
      { text: "Rest for a moment, then scatter with sesame seeds and spring onion before serving." },
    ],
  },
  {
    id: "harissa-lamb-flatbreads",
    emoji: "🫓",
    name: "Harissa Lamb Flatbreads",
    region: "Morocco",
    description:
      "Charred flatbreads loaded with rose harissa lamb, herbed yoghurt and pickled onions.",
    time: "45 min",
    spice: "Medium",
    difficulty: "Medium",
    ingredients: [
      "400g minced lamb",
      "2 tbsp rose harissa",
      "4 flatbreads",
      "150g Greek yoghurt",
      "Handful mint and coriander",
      "1 red onion, pickled",
    ],
    steps: [
      { text: "Warm a heavy frying pan over a high heat and brown the lamb mince, breaking it up as it cooks.", durationSeconds: 360 },
      { text: "Stir the rose harissa through the lamb and season generously." },
      { text: "Char the flatbreads in a dry pan or under the grill until lightly blistered.", durationSeconds: 120 },
      { text: "Spread each flatbread with yoghurt, top with the harissa lamb and finish with herbs and pickled onion." },
    ],
  },
  {
    id: "thai-coconut-curry",
    emoji: "🍛",
    name: "Thai Coconut Curry",
    region: "Thailand",
    description:
      "Fragrant green curry with coconut, lime leaf and Thai basil — bright, hot and aromatic.",
    time: "35 min",
    spice: "Hot",
    difficulty: "Medium",
    ingredients: [
      "3 tbsp green curry paste",
      "400ml coconut milk",
      "300g chicken thigh",
      "1 aubergine, diced",
      "Fish sauce, palm sugar, lime",
      "Thai basil",
    ],
    steps: [
      { text: "Heat a splash of oil in a wok and fry the green curry paste until fragrant.", durationSeconds: 90 },
      { text: "Pour in the coconut milk and bring to a gentle simmer, stirring to combine." },
      { text: "Add the chicken and aubergine and simmer until the chicken is cooked through and tender.", durationSeconds: 900 },
      { text: "Season with fish sauce, palm sugar and a squeeze of lime, then scatter with Thai basil to serve." },
    ],
  },
];

export type Region = {
  id: string;
  name: string;
  flag: string;
  count: number;
};

export const regions: Region[] = [
  { id: "japan", name: "Japan", flag: "🇯🇵", count: 12 },
  { id: "thailand", name: "Thailand", flag: "🇹🇭", count: 9 },
  { id: "morocco", name: "Morocco", flag: "🇲🇦", count: 7 },
  { id: "italy", name: "Italy", flag: "🇮🇹", count: 14 },
  { id: "mexico", name: "Mexico", flag: "🇲🇽", count: 10 },
  { id: "india", name: "India", flag: "🇮🇳", count: 16 },
  { id: "france", name: "France", flag: "🇫🇷", count: 8 },
  { id: "vietnam", name: "Vietnam", flag: "🇻🇳", count: 6 },
  { id: "lebanon", name: "Lebanon", flag: "🇱🇧", count: 5 },
];

export type Tier = {
  name: string;
  threshold: number;
  blurb: string;
  criteria: string;
};

export const tiers: Tier[] = [
  {
    name: "Home Cook",
    threshold: 0,
    blurb: "Finding your feet in the kitchen.",
    criteria: "Cook your first 5 dishes",
  },
  {
    name: "Confident Cook",
    threshold: 5,
    blurb: "Comfortable with everyday flavours.",
    criteria: "Cook 15 dishes across 3 regions",
  },
  {
    name: "Adventurous Cook",
    threshold: 15,
    blurb: "Reaching for new ingredients and techniques.",
    criteria: "Cook 30 dishes across 6 regions",
  },
  {
    name: "Kitchen Creative",
    threshold: 30,
    blurb: "Improvising with confidence and curiosity.",
    criteria: "Cook 50 dishes across 10 regions",
  },
];

export const stats = {
  cooked: 8,
  regions: 4,
  toDiscover: 79,
};
