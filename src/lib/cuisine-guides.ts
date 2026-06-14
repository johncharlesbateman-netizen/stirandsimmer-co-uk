// Editorial cuisine-guide content for the Kitchen Atlas region pages.
// One entry per region, keyed by URL slug. Used by /kitchen-atlas/:slug.

export type CuisineIngredient = {
  emoji: string;
  name: string;
  note: string;
};

export type CuisineGuide = {
  /** URL slug under /kitchen-atlas/. */
  slug: string;
  /** Display name in the hero. */
  name: string;
  /** Emoji shown alongside the name. */
  emoji: string;
  /** Region id used by the all-recipes RegionPage at /recipes/region/:id. */
  regionPageId: string;
  /** Adjective used in copy and the "Explore all X recipes" button. */
  adjective: string;
  /** cuisine_region tag value to match against the recipes table. */
  cuisineRegionTag: string;
  /** One-line character description used in the hero subtitle. */
  characterLine: string;
  /** Hero image — same picsum id used across the site. */
  imageId: string;
  imageAlt: string;
  /** SEO title and description (under 60 / 160 chars where possible). */
  seoTitle: string;
  seoDescription: string;
  /** Short, warm paragraphs about the cuisine. */
  about: string[];
  /** 6 defining ingredients. */
  keyIngredients: CuisineIngredient[];
  /** 2 related cuisine slugs for "You might also enjoy" cross-links. */
  relatedCuisines: string[];
  /**
   * Optional allowlist of exact recipe titles to feature in the
   * "Recipes from our kitchen to try" section. When set, only these
   * recipes are shown (and only if they exist + are published).
   * Use this to avoid surfacing mis-tagged or unrelated recipes.
   */
  featuredRecipeTitles?: string[];
};

export const CUISINE_GUIDES: CuisineGuide[] = [
  {
    slug: "italy",
    name: "Italy",
    emoji: "🇮🇹",
    regionPageId: "italy",
    adjective: "Italian",
    cuisineRegionTag: "italian",
    characterLine: "Pasta, sauces and the art of simplicity. Italian cooking that feeds the soul.",
    imageId: "36753771",
    imageAlt: "A rustic Italian table with pasta, tomatoes, basil and olive oil",
    seoTitle: "Italian Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Discover authentic Italian cooking with San Marzano tomatoes, olive oil and fresh pasta. From ragù to risotto, bring Italy home tonight.",
    about: [
      "There isn't really one Italian cuisine — there are twenty. The cooking of Sicily, with its capers, anchovies and citrus, has almost nothing in common with the butter, cream and slow-cooked ragùs of Emilia-Romagna. The north leans on rice, polenta and dairy; the south on tomatoes, olive oil and the sea. What ties it all together is a quiet respect for the ingredient — you cook to show it off, not to cover it up.",
      "The defining flavours are simpler than people think. Good olive oil, a tin of proper tomatoes, garlic, an onion, a piece of Parmigiano, a handful of herbs and decent dried pasta will carry you through most weeknights. The technique that matters most isn't fancy — it's patience. Letting onions soften slowly, letting a sauce reduce until it clings, finishing pasta in the pan with a splash of its own cooking water so everything binds together.",
      "That's why it works so well in a home kitchen. Italian food rewards attention rather than equipment. A heavy pan, twenty minutes and four good ingredients will give you something better than most restaurant pasta. It's the cuisine we cook from most often, and the one we'd recommend any new cook start with.",
    ],
    keyIngredients: [
      { emoji: "🍅", name: "Tomatoes", note: "Tinned San Marzano for sauces, ripe vine tomatoes in summer." },
      { emoji: "🫒", name: "Extra virgin olive oil", note: "Used for cooking, finishing and almost everything in between." },
      { emoji: "🧄", name: "Garlic", note: "Sliced thin for sauces, smashed for infusing oil — never burnt." },
      { emoji: "🌿", name: "Basil & parsley", note: "Torn at the end so the flavour stays bright and fresh." },
      { emoji: "🧀", name: "Parmigiano Reggiano", note: "Grated over pasta, stirred into risotto, the savoury backbone." },
      { emoji: "🍝", name: "Good dried pasta", note: "Bronze-die cut holds sauce better than supermarket smooth pasta." },
    ],
    relatedCuisines: ["france", "mediterranean"],
    featuredRecipeTitles: ["Roasted Pepper, White Beans and Tuna Salad"],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    emoji: "🇬🇧",
    regionPageId: "uk",
    adjective: "British",
    cuisineRegionTag: "british",
    characterLine: "Honest, seasonal and deeply comforting. The foundation of everything.",
    imageId: "19119797",
    imageAlt: "A traditional British table with pie, roast vegetables and gravy",
    seoTitle: "British Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Explore honest British cooking with seasonal roasts, flaky pastry and mature Cheddar. Comforting recipes for every day of the week.",
    about: [
      "British cooking has spent decades being underrated, mostly by people who haven't eaten it properly. The truth is it's one of the most seasonal cuisines in Europe — built around root vegetables in winter, asparagus and peas in spring, soft fruit in summer and game in autumn. Every region has its own thing: pies in the Midlands, fish and seafood on the coasts, oatcakes and cured fish in Scotland, Welsh cawl, Northern Irish soda bread.",
      "The defining flavours are quiet rather than loud. Butter, slow-cooked onions, a good stock, mustard, horseradish, decent bread, properly aged cheese. Sauces tend to be made from the cooking juices rather than poured over from a jar. The technique that matters most is patience — a real braise, a slow-roasted joint, a stock that's simmered all afternoon. Cut corners and it falls flat; give it time and it sings.",
      "It works beautifully at home because it's forgiving. A roast chicken with proper gravy, a fish pie, a bowl of soup with a hunk of bread — none of it needs special equipment or rare ingredients. Just a hot oven, a heavy pan and a willingness to taste as you go. It's the food we grew up on, and the food we still cook most weekends.",
    ],
    keyIngredients: [
      { emoji: "🧈", name: "Good butter", note: "Salted for spreading and roasting, unsalted for sauces and baking." },
      { emoji: "🥔", name: "Floury potatoes", note: "Maris Piper or King Edward — for mash, roasties and proper chips." },
      { emoji: "🧅", name: "Onions", note: "Sweated slowly into the base of almost every stew, pie and soup." },
      { emoji: "🌾", name: "Plain flour", note: "For pastry, scones, white sauce and thickening gravy." },
      { emoji: "🧀", name: "Mature Cheddar", note: "Cooked into pies and sauces, melted on toast, grated over greens." },
      { emoji: "🌿", name: "Fresh herbs", note: "Thyme, sage, parsley and rosemary — the backbone of British seasoning." },
    ],
    relatedCuisines: ["france", "mediterranean"],
    featuredRecipeTitles: [
      "Salmon with Garlic Leaf Pesto, Crushed Jersey Royals and Asparagus",
    ],
  },
  {
    slug: "france",
    name: "France",
    emoji: "🇫🇷",
    regionPageId: "france",
    adjective: "French",
    cuisineRegionTag: "french",
    characterLine: "Classical techniques that underpin all of western cooking.",
    imageId: "821365",
    imageAlt: "A French kitchen scene with butter, herbs, copper pans and a baguette",
    seoTitle: "French Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Master French cooking with butter, shallots and white wine. From mother sauces to pan sauce, bring classical technique home tonight.",
    about: [
      "French cooking is the grammar that almost every western kitchen still speaks. The sauces, the cuts, the way a stock is built, the order in which ingredients hit the pan — most of it was written down in France over the last two centuries, and most of it still holds. Beyond the textbook though, there are dozens of regional cuisines: the butter and cream of Normandy, the duck and beans of the south-west, the olive oil and tomatoes of Provence, the fish stews of Marseille.",
      "The defining flavours are richer than Italian, more restrained than British. Butter, shallots, white wine, a good chicken or veal stock, decent mustard, fresh tarragon or thyme. The technique that matters most is building flavour in layers — searing properly, deglazing the pan, reducing slowly, finishing with cold butter so the sauce turns silky. Skip a step and you can taste it.",
      "It's more approachable at home than its reputation suggests. A proper omelette, a roast chicken with a pan sauce, a quiche, a steak with shallots — these are weeknight dishes once you've cooked them a few times. The reward for putting the work in is food that tastes deliberate rather than thrown together.",
    ],
    keyIngredients: [
      { emoji: "🧈", name: "Unsalted butter", note: "Cold cubes whisked into sauces for that signature glossy finish." },
      { emoji: "🧅", name: "Shallots", note: "Milder and sweeter than onions — the base of almost every French sauce." },
      { emoji: "🍷", name: "Dry white wine", note: "For deglazing, braising and finishing — nothing you wouldn't drink." },
      { emoji: "🌿", name: "Tarragon & thyme", note: "Tarragon for chicken and fish, thyme for anything braised." },
      { emoji: "🥄", name: "Dijon mustard", note: "Stirred into vinaigrettes, sauces and crusted onto roasts." },
      { emoji: "🍞", name: "Good bread", note: "A proper baguette or sourdough — eaten with everything." },
    ],
    relatedCuisines: ["italy", "spain"],
    featuredRecipeTitles: ["Pistachio Sablés"],
  },
  {
    slug: "spain",
    name: "Spain",
    emoji: "🇪🇸",
    regionPageId: "spain",
    adjective: "Spanish",
    cuisineRegionTag: "spanish",
    characterLine: "Bold flavours, beautiful simplicity and the art of sharing.",
    imageId: "16743486",
    imageAlt: "A Spanish table with paella, chorizo, prawns and olive oil",
    seoTitle: "Spanish Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Explore Spanish cooking with smoked paprika, saffron and sofrito. From tapas to paella, bring bold flavour to your table tonight.",
    about: [
      "Spanish food is built around the table rather than the plate. A meal often arrives as half a dozen small things at once — olives, anchovies, jamón, a tortilla, prawns, bread to mop everything up — and that idea shapes the whole cuisine. The regions vary enormously: the Basque country leans on seafood and grilled meats, Andalusia on cold soups and fried fish, Valencia on rice, Catalonia on a Mediterranean mix of seafood, sausages and stews.",
      "The defining flavours are loud in the best way. Smoked paprika, saffron, garlic, sherry vinegar, good olive oil, decent chorizo, sweet onions cooked down to a sofrito. The technique that matters most is the sofrito itself — onion, garlic and tomato cooked slowly in olive oil until everything melts together. Get that right and most Spanish dishes more or less cook themselves.",
      "It's some of the easiest food to bring home. A few tapas with drinks, a one-pan rice on a Sunday, a tray of patatas bravas — none of it needs special skill, just decent Spanish pantry staples and a willingness to let things take their time.",
    ],
    keyIngredients: [
      { emoji: "🌶️", name: "Smoked paprika (pimentón)", note: "Sweet, bittersweet or hot — the defining Spanish spice." },
      { emoji: "🌾", name: "Saffron", note: "A pinch infused in warm stock turns rice golden and fragrant." },
      { emoji: "🧄", name: "Garlic", note: "Used generously, often raw in alioli or slow-cooked into sofrito." },
      { emoji: "🌶️", name: "Chorizo", note: "Cooking chorizo for stews and rice, cured chorizo for tapas." },
      { emoji: "🫒", name: "Spanish olive oil", note: "Fruity, peppery — the cooking medium and a finishing oil in one." },
      { emoji: "🍅", name: "Tomatoes", note: "Grated raw onto pan con tomate, slow-cooked into sofrito." },
    ],
    relatedCuisines: ["mediterranean", "france"],
  },
  {
    slug: "india",
    name: "India",
    emoji: "🇮🇳",
    regionPageId: "india",
    adjective: "Indian",
    cuisineRegionTag: "indian",
    characterLine: "Bold spices, fragrant herbs and layers of warmth and depth.",
    imageId: "28674690",
    imageAlt: "An Indian spice grinder with whole spices, fresh ginger and coriander",
    seoTitle: "Indian Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Discover Indian cooking with whole spices, ginger-garlic and slow-cooked onions. From curries to tandoori, cook bold food at home.",
    about: [
      "There is no single Indian cuisine — there are dozens, each as distinct as the languages spoken alongside them. The cooking of the Punjab, with its tandoors, butter and cream, looks nothing like the coconut-and-curry-leaf food of Kerala, or the mustard-oil fish curries of Bengal. The north leans on wheat, dairy and slow-cooked meats; the south on rice, lentils, tamarind and seafood. What runs through all of it is the careful layering of spice.",
      "The defining flavours come from whole spices toasted in hot oil — cumin, coriander, mustard seeds, cardamom, cloves, cinnamon — alongside ginger, garlic, fresh chilli and bunches of coriander stalks. The technique that matters most is the order. Build the base properly: onions cooked until truly brown, ginger-garlic paste fried until the raw smell goes, tomatoes broken down until the oil splits back out. Rush any of those steps and the curry tastes thin.",
      "It rewards home cooks more than almost any cuisine. A handful of whole spices, a tin of tomatoes, an onion and some yoghurt will give you something deeper than most takeaways. Build a small spice pantry once and you can cook this food on any weeknight.",
    ],
    keyIngredients: [
      { emoji: "🌶️", name: "Whole spices", note: "Cumin, coriander, mustard, cardamom — toasted in hot oil to start a curry." },
      { emoji: "🧄", name: "Ginger & garlic", note: "Pounded to a paste, fried until the raw edge cooks out." },
      { emoji: "🧅", name: "Onions", note: "Cooked slowly to a deep golden brown — the base of most curries." },
      { emoji: "🍅", name: "Tomatoes", note: "Tinned or fresh, broken down until the oil rises back to the surface." },
      { emoji: "🌿", name: "Fresh coriander", note: "Stalks chopped into the curry, leaves scattered at the end." },
      { emoji: "🥛", name: "Yoghurt", note: "Stirred in for richness, used to marinate meat and tenderise it." },
    ],
    relatedCuisines: ["middle-east", "thailand"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    emoji: "🇹🇭",
    regionPageId: "thailand",
    adjective: "Thai",
    cuisineRegionTag: "thai",
    characterLine: "Fragrant, fiery and beautifully balanced — sweet, sour, salty, spicy.",
    imageId: "18765531",
    imageAlt: "A Thai market table with lemongrass, chillies, lime and fish sauce",
    seoTitle: "Thai Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Explore Thai cooking with lemongrass, fish sauce and coconut milk. From green curry to stir-fry, balance sweet, sour, salty and heat.",
    about: [
      "Thai food makes more sense when you've eaten it where it comes from. Travelling through Thailand for work in the 1980s meant encountering the street food culture before it became something tourists sought out — small boats along the waterways selling and cooking their own food, each one its own kitchen, reaching out to offer whatever was on that day. The balance of sweet, sour, salty and heat wasn't a concept, it was just what everything tasted like.",
      "Bringing that home to a British kitchen takes a little understanding of why Thai food works — the fish sauce, the lime, the fresh herbs added at the end. Get those relationships right and the cuisine translates surprisingly well.",
    ],
    keyIngredients: [
      { emoji: "🌿", name: "Lemongrass", note: "The outer layers stripped, the tender heart bruised or finely sliced." },
      { emoji: "🍋", name: "Kaffir lime leaves", note: "Torn into curries, finely shredded over salads — bright and floral." },
      { emoji: "🌶️", name: "Bird's-eye chillies", note: "Small, fierce, used whole, sliced or pounded into pastes." },
      { emoji: "🐟", name: "Fish sauce", note: "The salt of Thai cooking — a few drops lift everything." },
      { emoji: "🥥", name: "Coconut milk", note: "Full-fat tins — the thick cream cracks first to fry the curry paste." },
      { emoji: "🌾", name: "Jasmine rice", note: "Fragrant, slightly sticky — the cornerstone of nearly every meal." },
    ],
    relatedCuisines: ["india", "mediterranean"],
  },
  {
    slug: "mediterranean",
    name: "Mediterranean",
    emoji: "🌊",
    regionPageId: "mediterranean",
    adjective: "Mediterranean",
    cuisineRegionTag: "mediterranean",
    characterLine: "The shared table around one sea — olive oil, vegetables, fish and herbs.",
    imageId: "1213710",
    imageAlt: "A Mediterranean table with olive oil, lemons, fish, herbs and vegetables",
    seoTitle: "Mediterranean Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Discover Mediterranean cooking with olive oil, lemon and fresh herbs. From grilled fish to mezze, bring the sea to your table tonight.",
    about: [
      "The Mediterranean isn't a country, it's a sea — and the cooking that sits around it has more in common than the politics on its shores suggest. Greek, southern Italian, Provençal, Catalan, Lebanese, Moroccan and Turkish cooking all draw on the same handful of ingredients: olive oil, lemons, vegetables, fish, herbs, lamb, grains. Each country pulls them in its own direction, but the underlying language is the same.",
      "The defining flavours are bright and clean. Good olive oil, lemon juice, fresh oregano and parsley, garlic, ripe tomatoes, plenty of fresh fish, lamb cooked slowly, grains like bulgur and farro, beans and pulses for warmth. The technique that matters most is restraint — a piece of fish needs salt, oil and a squeeze of lemon, not seven other things. Trust the ingredients and step back.",
      "It's some of the most forgiving food you can cook at home, and some of the healthiest. A bowl of beans dressed with good oil, a tray of roasted vegetables with feta, a piece of grilled fish with herbs and lemon — none of it is hard, and all of it tastes better than the effort suggests.",
    ],
    keyIngredients: [
      { emoji: "🫒", name: "Extra virgin olive oil", note: "Used by the bottleful — for cooking, dressing and finishing." },
      { emoji: "🍋", name: "Lemons", note: "Juice for dressings, zest for fish, preserved for stews." },
      { emoji: "🌿", name: "Oregano & parsley", note: "Dried oregano on grilled meats, fresh parsley scattered everywhere." },
      { emoji: "🧄", name: "Garlic", note: "Crushed into dressings, slow-roasted whole, rubbed onto warm bread." },
      { emoji: "🐟", name: "Fresh fish", note: "Whole, grilled simply or baked in the oven with lemon and herbs." },
      { emoji: "🫘", name: "Beans & pulses", note: "Chickpeas, white beans and lentils — protein, body and warmth." },
    ],
    relatedCuisines: ["italy", "spain"],
  },
  {
    slug: "middle-east",
    name: "Middle East",
    emoji: "🥙",
    regionPageId: "middleeast",
    adjective: "Middle Eastern",
    cuisineRegionTag: "middle-eastern",
    characterLine: "Warm spices, slow-cooked meats, fresh herbs and deep hospitality.",
    imageId: "6275158",
    imageAlt: "A Middle Eastern mezze table with flatbreads, herbs, lamb and spices",
    seoTitle: "Middle Eastern Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Explore Middle Eastern cooking with cumin, tahini and sumac. From slow lamb to mezze, bring warm spice and deep hospitality home.",
    about: [
      "The food of the Arabian Gulf is built around generosity — meals that arrive in abundance, shared without ceremony. Spending time across Bahrain, Kuwait, the UAE, Qatar, Oman and Saudi Arabia in the late 1970s and 1980s, before the region was transformed by development, meant encountering a food culture that was quieter and more local than it is today. The Asian influence ran deep — curries, rice dishes and spiced seafood sitting comfortably alongside Arabic traditions. Gulf prawns were extraordinary, the kind of size that stops a conversation. The biryanis were fragrant and serious. And the hospitality was absolute — food was never just food, it was the whole point of being together.",
      "Middle Eastern cooking at home is more achievable than most people think. The flavours are bold but the techniques are simple — slow cooking, layering spice, and leaving things alone long enough to work.",
    ],
    keyIngredients: [
      { emoji: "🌿", name: "Fresh herbs", note: "Parsley, mint and coriander used by the bunch, not the sprig." },
      { emoji: "🌶️", name: "Warm spices", note: "Cumin, coriander, allspice and cinnamon — toasted and ground." },
      { emoji: "🍋", name: "Lemon & sumac", note: "Juice in dressings, sumac scattered over salads and grilled meats." },
      { emoji: "🥣", name: "Tahini", note: "Whisked with lemon and garlic for dressings, stirred into stews." },
      { emoji: "🍅", name: "Pomegranate molasses", note: "Sweet, sour and dark — a few drops transform a dressing or stew." },
      { emoji: "🥩", name: "Lamb", note: "Slow-cooked until tender, grilled in pieces, or minced into kofte." },
    ],
    relatedCuisines: ["india", "mediterranean"],
  },
  {
    slug: "mexico",
    name: "Mexico",
    emoji: "🇲🇽",
    regionPageId: "mexico",
    adjective: "Mexican",
    cuisineRegionTag: "mexican",
    characterLine: "Vibrant, smoky and deeply satisfying. The bold flavours of Mexican cooking.",
    imageId: "8448339",
    imageAlt: "A Mexican table with tortillas, dried chillies, lime, coriander and avocado",
    seoTitle: "Mexican Cooking — Recipes, Ingredients & Techniques | Stir & Simmer",
    seoDescription:
      "Discover Mexican cooking with dried chillies, lime and corn tortillas. From mole to tacos, bring ancient, bold flavour to your table.",
    about: [
      "Mexican food is much older and much deeper than the version most of us grew up with. Beneath the tex-mex shortcuts sits one of the most varied cuisines in the Americas, built on corn, beans and chillies that have been cooked here for thousands of years. Each region has its own thing: the moles of Oaxaca, the seafood of the Yucatán, the grilled meats of the north, the masa-based street food of Mexico City.",
      "The defining flavours come from dried chillies — ancho, guajillo, pasilla, chipotle — toasted and rehydrated until they go fragrant and almost fruity. Add fresh lime, coriander, raw white onion, cumin, oregano, garlic, ripe avocado and a salsa with real bite, and you have the backbone of nearly every dish. The technique that matters most is toasting the chillies and spices properly — a minute too long and they're bitter; done well, they're transformative.",
      "It comes together at home more easily than the long ingredient lists suggest. A pot of properly cooked beans, a stack of warm corn tortillas, a sharp green salsa and something grilled is a full meal. Build a small Mexican pantry — dried chillies, masa harina, decent corn tortillas, good lime — and the cuisine opens up fast.",
    ],
    keyIngredients: [
      { emoji: "🌶️", name: "Dried chillies", note: "Ancho, guajillo, pasilla, chipotle — toasted and rehydrated for sauces." },
      { emoji: "🌽", name: "Corn tortillas", note: "Warmed on a dry pan until pliable — the base of almost every meal." },
      { emoji: "🫘", name: "Black & pinto beans", note: "Slow-cooked with onion and bay, refried for fillings and sides." },
      { emoji: "🍋", name: "Limes", note: "Squeezed over everything — tacos, soups, salsas and slaws." },
      { emoji: "🌿", name: "Fresh coriander", note: "Stalks and leaves chopped raw into salsas and scattered at the end." },
      { emoji: "🥑", name: "Avocado", note: "Mashed into guacamole, sliced over tacos, blended into green sauces." },
    ],
    relatedCuisines: ["spain", "mediterranean"],
  },
];

export const CUISINE_GUIDES_BY_SLUG: Record<string, CuisineGuide> = Object.fromEntries(
  CUISINE_GUIDES.map((g) => [g.slug, g]),
);
