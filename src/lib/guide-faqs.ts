// Guide FAQs. Each list is rendered visibly via <GuideFAQ /> and emitted
// as FAQPage JSON-LD so the answers are eligible for Google's FAQ rich
// results. Answers must stay short, factual and match what's visible on
// the page.

export interface GuideFAQ {
  question: string;
  answer: string;
}

export const guideFAQs: Record<string, GuideFAQ[]> = {
  "mother-sauces": [
    {
      question: "What are the five French mother sauces?",
      answer:
        "Béchamel, Velouté, Espagnole, Hollandaise and Sauce Tomat. They were codified by Auguste Escoffier and almost every classical French sauce is built from one of these five bases.",
    },
    {
      question: "Why are they called mother sauces?",
      answer:
        "Because they are the parents of dozens of \"daughter\" sauces. Add cheese to Béchamel and you have Mornay; add tarragon and shallot to Hollandaise and you have Béarnaise. Learn the mothers and you unlock the family.",
    },
    {
      question: "Which mother sauce should a beginner learn first?",
      answer:
        "Béchamel. It teaches you how to make a roux, how to whisk milk in without lumps, and how to season a finished sauce. Once you can make a smooth Béchamel, Velouté and Espagnole follow the same logic.",
    },
    {
      question: "Is Hollandaise really one of the mother sauces?",
      answer:
        "Yes. It's the only emulsion among the five and the trickiest to make, but Escoffier included it for good reason — it underpins Béarnaise, Maltaise and every classic egg-and-butter sauce in the French repertoire.",
    },
  ],
  "french-techniques": [
    {
      question: "What is mise en place and why does it matter?",
      answer:
        "Mise en place means \"everything in its place\" — chopping, measuring and grouping every ingredient before the pan goes on. It removes panic from cooking and is the single biggest upgrade for home cooks.",
    },
    {
      question: "What's the difference between julienne and brunoise?",
      answer:
        "Julienne is matchstick cuts, roughly 2mm by 2mm by 5cm. Brunoise is the same matchsticks turned and cut into tiny dice, around 2mm cubes. One is for garnish and quick cooking, the other for even, fast-cooking aromatics.",
    },
    {
      question: "What does it mean to deglaze a pan?",
      answer:
        "Deglazing means pouring liquid — usually wine, stock or vinegar — into a hot pan after searing, then scraping up the browned bits stuck to the bottom. Those fond particles are pure flavour and form the base of most pan sauces.",
    },
    {
      question: "Is flambéing actually worth doing at home?",
      answer:
        "Yes, when done safely. Burning off the alcohol concentrates the flavour of brandy, rum or Calvados and slightly caramelises the surface of the food. Pull the pan off the heat before adding spirits and keep the lid nearby.",
    },
  ],
  "garam-masala": [
    {
      question: "What exactly is garam masala?",
      answer:
        "Garam masala is a warming North Indian spice blend, usually built from cardamom, cinnamon, cloves, black pepper, cumin and coriander. \"Garam\" means warm — it refers to the spices' character, not chilli heat.",
    },
    {
      question: "Should I buy garam masala or make my own?",
      answer:
        "Make your own if you can. Whole spices toasted and ground at home keep their oils and smell several orders of magnitude livelier than supermarket blends, which are often stale by the time they reach the shelf.",
    },
    {
      question: "When do you add garam masala in cooking?",
      answer:
        "Most of the time, near the end. Garam masala is a finishing blend — stir it in during the last few minutes of cooking so the aromatics stay bright. Adding it at the start dulls the cardamom and clove notes.",
    },
    {
      question: "How long does garam masala stay fresh?",
      answer:
        "Around three months if you grind your own and store it in a sealed jar away from light and heat. After that it's still safe to use but the perfume fades fast — make small batches rather than one big one.",
    },
  ],
  "how-to-use-spices": [
    {
      question: "Should I buy whole spices or ground?",
      answer:
        "Whole, almost always. Ground spices lose their volatile oils within months. Whole spices keep for a year or more and taste dramatically better when toasted and ground just before you use them.",
    },
    {
      question: "What does toasting spices actually do?",
      answer:
        "Heating whole spices in a dry pan for thirty seconds releases their aromatic oils and deepens their flavour. You'll smell the difference immediately — toast cumin or coriander seeds once and you'll never skip the step again.",
    },
    {
      question: "When in a recipe should I add spices?",
      answer:
        "It depends on the spice. Hard, woody spices like cinnamon and cloves go in early to infuse. Ground spices like turmeric and chilli go in with the aromatics. Finishing spices like garam masala go in at the end.",
    },
    {
      question: "How should I store spices at home?",
      answer:
        "In airtight jars, away from light, heat and the hob. Heat and sunlight are the main enemies — a cupboard at room temperature is better than a rack above the cooker, no matter how good it looks.",
    },
  ],
  "proper-stock": [
    {
      question: "What's the difference between white and brown stock?",
      answer:
        "White stock uses raw bones and vegetables, giving a clean, pale, gently flavoured liquid. Brown stock uses bones and vegetables roasted first, which gives a deeper colour and a richer, more savoury flavour from the Maillard reaction.",
    },
    {
      question: "How long should I simmer chicken or beef stock?",
      answer:
        "Chicken stock needs around three to four hours. Beef and veal stocks need six to eight to extract gelatin from the bones. Vegetable stock is much faster — forty-five minutes is plenty before the flavour turns bitter.",
    },
    {
      question: "Should stock ever come to a rolling boil?",
      answer:
        "No. A bare simmer keeps it clear; boiling emulsifies the fat into the liquid and makes it cloudy and greasy. You want the occasional lazy bubble, not a rolling boil.",
    },
    {
      question: "How long does homemade stock keep?",
      answer:
        "Up to five days in the fridge or three months in the freezer. Freeze it in ice cube trays or 500ml tubs so you can pull out exactly the amount you need for a sauce, soup or braise.",
    },
  ],
  "proper-sauce": [
    {
      question: "What is a roux and what does it do?",
      answer:
        "A roux is equal parts butter and flour cooked together. It's the classical thickener for sauces like Béchamel and Velouté — cooking the flour first removes the raw taste and gives you a glossy, lump-free finish.",
    },
    {
      question: "How do you fix a broken or split sauce?",
      answer:
        "Whisk a tablespoon of warm water or cold cream into a fresh bowl, then dribble the broken sauce in slowly while whisking constantly. For emulsions like Hollandaise, start with a fresh egg yolk and rebuild.",
    },
    {
      question: "Why deglaze the pan when making a sauce?",
      answer:
        "Because the browned fond stuck to the bottom of the pan after searing meat is concentrated flavour. Adding wine, stock or vinegar and scraping it up turns those bits into the backbone of a proper pan sauce.",
    },
    {
      question: "How do you make a sauce glossy?",
      answer:
        "Finish it off the heat with a small knob of cold butter, swirled in gently. The technique is called \"monter au beurre\" and it gives sauces the sheen and silkiness you see in restaurant plates.",
    },
  ],
  "choosing-pans": [
    {
      question: "What pans does a home cook really need?",
      answer:
        "Four cover almost everything: a heavy 28cm frying pan, a 24cm non-stick for eggs, a 24cm saucepan with a lid, and a large casserole or Dutch oven for braising. Anything beyond that is a luxury, not a necessity.",
    },
    {
      question: "Is cast iron really worth the effort?",
      answer:
        "Yes. A well-seasoned cast iron pan holds heat like nothing else, sears beautifully and lasts generations. The downsides are weight and the need to keep it dry and lightly oiled — but the trade-off is worth it.",
    },
    {
      question: "When should I use stainless steel over non-stick?",
      answer:
        "Stainless steel is for searing, building fond and making pan sauces — non-stick coatings can't take the heat or build the browning. Reserve non-stick for eggs, pancakes and delicate fish.",
    },
    {
      question: "How do I stop food sticking to a stainless steel pan?",
      answer:
        "Heat the pan properly before adding the oil. A drop of water should bead and dance across the surface before you add fat. Add the food only when the oil shimmers — it'll release naturally once it's seared.",
    },
  ],
  "kitchen-knives": [
    {
      question: "Which kitchen knives do I actually need?",
      answer:
        "Three: a 20cm chef's knife for almost everything, a small paring knife for fiddly work, and a serrated bread knife for crusts and tomatoes. A good chef's knife alone will handle ninety per cent of home cooking.",
    },
    {
      question: "How often should I sharpen my knives?",
      answer:
        "Hone with a steel before each use to realign the edge, and sharpen on a whetstone every two to three months depending on use. A blunt knife is more dangerous than a sharp one — it slips.",
    },
    {
      question: "What's the difference between a Western and a Japanese knife?",
      answer:
        "Western knives are heavier with a thicker, more durable edge ground around 20 degrees. Japanese knives are lighter, harder steel ground around 15 degrees — sharper and more precise, but more brittle and demanding to maintain.",
    },
    {
      question: "Are expensive knives really worth it?",
      answer:
        "A good knife in the £80-150 range will outperform anything cheaper and last decades if cared for. Beyond that you're paying for steel quality and craftsmanship — lovely to own, but unnecessary for most home cooks.",
    },
  ],
  "understanding-olive-oil": [
    {
      question: "What does \"extra virgin\" actually mean?",
      answer:
        "Extra virgin olive oil is mechanically pressed from olives with no heat or chemical extraction, with a free acidity below 0.8 per cent. It's the highest grade and the only one worth buying for both cooking and finishing.",
    },
    {
      question: "Can you cook with extra virgin olive oil?",
      answer:
        "Yes. The smoke point is around 190-210°C — well above sautéing, roasting and most pan-frying temperatures. The myth that you can't cook with it is just marketing for cheaper, refined oils.",
    },
    {
      question: "Should I use the same olive oil for cooking and finishing?",
      answer:
        "Ideally, no. Use a sound, mid-priced extra virgin for cooking, and keep a peppery, single-estate bottle to finish dishes raw — drizzled on salads, soups and grilled bread. The character of a finishing oil is wasted in a hot pan.",
    },
    {
      question: "How should I store olive oil at home?",
      answer:
        "In a dark glass or tin bottle, in a cool cupboard away from the hob. Light, heat and air are the enemies — once opened, use a good bottle within a few months for the freshest flavour.",
    },
  ],
  "how-to-cook-pasta": [
    {
      question: "How much salt should I add to pasta water?",
      answer:
        "About a tablespoon of fine salt per litre of water — it should taste like the sea. Under-salted water is the single biggest reason home-cooked pasta tastes flat, no matter how good the sauce is.",
    },
    {
      question: "Should I add oil to the pasta water?",
      answer:
        "No. Oil floats on top and does nothing for the pasta, but it coats the strands when you drain them and stops the sauce sticking. Stir the pasta in the first minute and it won't clump.",
    },
    {
      question: "Why save the pasta cooking water?",
      answer:
        "Because it's full of starch. A few tablespoons stirred into the sauce at the end binds it to the pasta and gives you that glossy, restaurant-style coating. Always reserve a mugful before draining.",
    },
    {
      question: "How do I know when pasta is al dente?",
      answer:
        "Bite a strand a minute before the packet time. You're looking for a tiny pale dot in the centre and a slight resistance to the tooth. Finish cooking it in the sauce for thirty seconds to bring it together.",
    },
  ],
  "how-to-make-bread": [
    {
      question: "What ingredients do I need to make bread?",
      answer:
        "Four: flour, water, salt and yeast. That's it. Everything else — milk, butter, eggs, seeds — is variation. Master the basic four-ingredient loaf first and the rest follows naturally.",
    },
    {
      question: "What's the difference between fresh, dried and instant yeast?",
      answer:
        "Fresh yeast is the traditional cake form, used quickly and kept refrigerated. Dried yeast needs activating in warm water first. Instant (or fast-action) yeast can go straight into the flour and is the easiest for home bakers.",
    },
    {
      question: "Why does my bread come out dense?",
      answer:
        "Usually under-proving or not enough kneading. Bread dough needs time to develop gluten and time to rise — rushing either step gives you a heavy, tight crumb. Trust the dough rather than the clock.",
    },
    {
      question: "Do I need a stand mixer to make bread?",
      answer:
        "No. Hand kneading takes around ten minutes and gives you a feel for the dough that a mixer never will. A stand mixer is convenient for larger batches and enriched doughs but it isn't essential for a good loaf.",
    },
  ],
  "what-to-cook-in-summer": [
    {
      question: "What British produce is in season in summer?",
      answer:
        "Tomatoes, courgettes, peas, broad beans, runner beans, new potatoes, cucumbers, lettuces, strawberries, raspberries and stone fruit. Cook around what's on the greengrocer's table rather than imposing a recipe from January.",
    },
    {
      question: "What makes a proper summer salad?",
      answer:
        "Genuinely ripe produce, a sharp dressing made just before serving, and restraint. Three or four good ingredients, well seasoned, with the dressing tossed through at the last moment — not a fridge clear-out in a bowl.",
    },
    {
      question: "What's the most common mistake when grilling at home?",
      answer:
        "Cooking on a grill that isn't hot enough. Get the coals or grill plate properly screaming before the food goes on, and don't fiddle — let it sear, lift cleanly, then turn it once.",
    },
    {
      question: "Which herbs work best in summer cooking?",
      answer:
        "Soft herbs — basil, mint, dill, tarragon, chives and parsley. They wilt under heat, so add them at the end or use them raw. A handful torn over a finished dish lifts almost anything you cook in summer.",
    },
  ],
};
