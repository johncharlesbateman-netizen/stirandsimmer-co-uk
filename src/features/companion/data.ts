export type CookingStep = {
  text: string;
  /** Optional countdown for this step, in seconds */
  durationSeconds?: number;
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
