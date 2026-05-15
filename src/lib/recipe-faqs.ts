// Per-recipe FAQ entries. Targets long-tail question keywords with low
// competition so individual recipe pages can rank for "people also ask"
// style queries. Rendered visibly on the page and emitted as FAQPage
// JSON-LD for rich-results eligibility.

export interface RecipeFAQ {
  question: string;
  answer: string;
}

export const recipeFAQs: Record<string, RecipeFAQ[]> = {
  "cacio-e-pepe": [
    {
      question: "Can I use Parmesan for cacio e pepe?",
      answer:
        "Traditional cacio e pepe uses Pecorino Romano, which is sharper, saltier and more pungent than Parmesan. You can substitute Parmigiano Reggiano in a pinch, but the flavour will be milder and less distinctly Roman — for the closest result, use a 50/50 blend of Pecorino and Parmesan.",
    },
    {
      question: "How do you pronounce cacio e pepe?",
      answer:
        "It's pronounced KAH-choh eh PEH-peh. The Italian phrase literally means \"cheese and pepper\", which is exactly what the dish is built around.",
    },
    {
      question: "Is cacio e pepe vegetarian?",
      answer:
        "Yes — cacio e pepe contains only pasta, Pecorino Romano, black pepper and pasta water, so it is vegetarian. Note that traditional Pecorino Romano is made with animal rennet, so it is not strictly vegetarian by all definitions; look for a Pecorino labelled with vegetable rennet if that matters to you.",
    },
    {
      question: "Can you reheat cacio e pepe?",
      answer:
        "Cacio e pepe is best eaten immediately, as the cheese sauce can clump or split when reheated. If you must reheat it, do so gently in a pan with a splash of fresh pasta water or milk, stirring constantly over low heat until the sauce comes back together.",
    },
    {
      question: "Can you make cacio e pepe with penne or other pasta?",
      answer:
        "Traditionally cacio e pepe is made with tonnarelli or spaghetti, which hold the cheese sauce well. Penne, rigatoni or bucatini all work too — any pasta with a good surface area or ridges will help the sauce cling, though long pasta gives the most authentic result.",
    },
    {
      question: "Is cacio e pepe Roman?",
      answer:
        "Yes — cacio e pepe is one of the four classic Roman pasta dishes, alongside carbonara, amatriciana and gricia. It originated with Roman shepherds who carried dried pasta, aged Pecorino and peppercorns into the hills, ingredients that needed no refrigeration.",
    },
  ],
};
