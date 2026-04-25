import { PROJECTS, type MediaTone } from "./projects";

export type ProjectImageItem = {
  /** Omit or leave empty to show a device-frame placeholder in that column. */
  src?: string;
  alt: string;
  objectPosition?: string;
  /** When true, image is clipped inside the same phone frame as placeholders (default: full-bleed in slot). */
  device?: boolean;
  /** Cover vs contain: device screen clips, or full-bleed slot (e.g. composite PNG). */
  objectFit?: "cover" | "contain";
  /**
   * When `device` is true, set to false if the asset is already a full mockup (screen + bezel in one image).
   * Skips the CSS phone frame so we do not double-stack bezels.
   */
  showDeviceFrame?: boolean;
  /** Label below the device, inside the grey card (e.g. Before / After). */
  caption?: string;
  /** Override native lazy-load (GIFs default to eager). */
  loading?: "eager" | "lazy";
};

export type ProjectBodyBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "images"; items: ProjectImageItem[] };

export type ProjectPageData = {
  slug: string;
  name: string;
  mediaTone: MediaTone;
  date: string;
  role: string;
  intro: string;
  blocks: ProjectBodyBlock[];
};

const emptyGallery = (): ProjectBodyBlock => ({ type: "images", items: [] });

/** Same rhythm as Fun Concepts: images → Problem → images → Approach → images → Impact. */
function problemApproachImpactLayout(
  problem: string,
  approach: string,
  impact: string,
): ProjectBodyBlock[] {
  return [
    emptyGallery(),
    { type: "text", title: "Problem", body: problem },
    emptyGallery(),
    { type: "text", title: "Approach", body: approach },
    emptyGallery(),
    { type: "text", title: "Impact", body: impact },
  ];
}

/** Full case-study content: alternate `images` and `text` blocks for process narrative. */
export const PROJECT_PAGE_BY_SLUG: Partial<Record<string, ProjectPageData>> = {
  "gallery-view": {
    slug: "gallery-view",
    name: "Gallery View",
    mediaTone: "grey",
    date: "Q2 2025",
    role: "Product Designer",
    intro:
      "Redesigned the Uber Eats storefront to make menus faster to scan by introducing a photo-coverage–aware gallery view. The solution adapts layout per menu section, showing image-first grids where photos are strong and falling back to text where they aren’t.",
    blocks: [
      {
        type: "images",
        items: [
          {
            src: "/work/gallery-view/gallery-comparison.png",
            alt: "Blank Street Coffee — list view before and gallery grid view after redesign",
            objectFit: "contain",
          },
        ],
      },
      ...problemApproachImpactLayout(
        [
          "Users spend <1 minute deciding what to order, but menus are large (~44 items) and text-heavy. Most users only see a handful of items before choosing, leading to:",
          "• Low scan efficiency and excessive scrolling\n• Underutilized menu photos\n• One-size-fits-all layouts that hurt low-photo (often SMB) stores\n• Missed opportunities to surface high-value or relevant items",
        ].join("\n\n"),
        [
          "Designed a dynamic, subsection-level layout system that adapts based on photo coverage and menu size:",
          "• Introduced gallery view (2-column image grid) for high photo-coverage sections\n• Kept text-based list view for low-coverage or context-heavy sections (e.g., search results, offers)\n• Added guardrails (coverage thresholds, item count rules) to protect SMB stores and avoid poor layouts\n• Iterated through multiple experiment variants, balancing density, whitespace, and performance",
          "Final direction:",
          "• Apply gallery view only when coverage ≥80% and section has enough items\n• Optimize layout consistency (e.g., filling rows, reducing empty space)",
        ].join("\n\n"),
        [
          "Launched T3 globally, improving efficiency without hurting core business metrics:",
          "• ↑ Visit-level conversion rate and add-to-cart rate\n• ↑ Store view sessions (+0.06%) with neutral session CVR\n• ↑ Order value mix (VC w/o ads) (+0.43%) by surfacing higher-value items\n• ↑ Upsell attach rate and new item discovery",
          "Behavioral shifts:",
          "• Users scroll less, decide faster, and visit fewer stores—but convert more effectively",
        ].join("\n\n"),
      ).slice(1),
    ],
  },

  "multi-sku-offers": {
    slug: "multi-sku-offers",
    name: "Multi SKU Offers",
    mediaTone: "peach",
    date: "2024 — 2025",
    role: "Product Designer",
    intro:
      "Designed and launched Multi-SKU Offers, a new promotions system that enables “mix & match” deals (e.g., Spend $X, Save $Y) across multiple products. The solution brings in-store–style promotions to Uber Eats, helping CPGs and merchants run more effective campaigns while improving affordability and basket building for users.",
    blocks: problemApproachImpactLayout(
      [
        "Uber Eats lacked support for common in-store promotions like “buy multiple items and save,” leading to:",
        "• Limited ability for CPGs and merchants to drive category-level sales\n• Missed promo budget opportunities (e.g., $16M+ blocked demand)\n• Fewer compelling grocery deals compared to competitors and in-store\n• User confusion or friction when trying to understand eligibility and savings",
        "Existing offers were mostly single-SKU or simple discounts, making it hard to encourage larger, multi-item baskets.",
      ].join("\n\n"),
      [
        "Designed a collection-based, multi-SKU offer system that enables flexible promotion structures and clear user understanding:",
        "• Introduced core constructs like Spend X Save Y (SxSy) and later Buy X for Y (BxFy)\n• Built a collection-driven model, allowing merch teams to group eligible items and manage offers at scale",
        "Designed end-to-end UX across surfaces:",
        "• Storefront & Deals Hub: discovery via carousels and tags\n• PDP & modal: clear eligibility and progress tracking\n• Cart & checkout: grouped items with “threshold met / not met” states",
        "Added guardrails (e.g., single redemption, stacking logic, profitability constraints) to balance flexibility with clarity and business health.",
      ].join("\n\n"),
      [
        "Launched globally with strong early adoption and clear product–market fit:",
        "• ~16.9K offers created across 21 merchants\n• $1.84M in offer spend across CPG, merchant, and Uber funding\n• Unlocked new CPG and merchant promo budgets and campaign types\n• Enabled larger, more intentional baskets and improved category penetration",
        "Strategic impact:",
        "• Established Multi-SKU as a core offers capability\n• Closed a major gap with in-store and competitor promotions\n• Created a scalable foundation for future constructs and funding models",
      ].join("\n\n"),
    ),
  },

  promotions: {
    slug: "promotions",
    name: "Promotions",
    mediaTone: "peach",
    date: "2019 — 2026",
    role: "Lead Product Designer",
    intro:
      "Led the design of a 0→1 Promotions & Incentives system for Cornershop, enabling users to apply discounts (free delivery, % off, fixed amount) across the shopping experience.\n\nThe solution introduced a centralized promotions flow across account, checkout, and automatic application, establishing promotions as a new core capability in the product.",
    blocks: problemApproachImpactLayout(
      [
        "Cornershop did not support promotions or incentives, resulting in:",
        "• Low perceived affordability compared to competitors\n• No way for users to discover, manage, or apply discounts\n• Missed opportunity to drive demand through marketing incentives",
        "Users lacked both visibility into available offers and control over how to use them.",
      ].join("\n\n"),
      [
        "As the lead designer, I defined and delivered the end-to-end promotions experience across platforms:",
        "New Promotions hub (Account)\n• Centralized place to view available offers and enter promo codes\n• Clear structure for different promotion types",
        "Checkout integration\n• Users can select and apply promotions before placing an order\n• Clear separation between applicable and non-applicable offers",
        "Promotion system design\n• Supported multiple types: free delivery, % discount, fixed amount\n• Introduced automatic application logic to reduce friction",
        "Cross-platform delivery\n• Designed flows for iOS, Android, and Uber integration\n• Collaborated with stakeholders and developers to define functionality and implementation",
      ].join("\n\n"),
      "• Launched promotions as a foundational product capability\n• Improved affordability perception by enabling visible and usable discounts\n• Created a system for marketing and growth teams to run incentive campaigns\n• Established the groundwork for future offer systems and experimentation",
    ),
  },

  "featured-stores": {
    slug: "featured-stores",
    name: "Featured Stores",
    mediaTone: "mist",
    date: "2019 — 2026",
    role: "Product Designer",
    intro:
      "Revamped the featured stores carousel to align with new verticals: maximize store density, improve customer selection, and keep a cohesive design with richer metadata.",
    blocks: problemApproachImpactLayout(
      "The carousel was a critical entry to store choice, but it didn’t reflect new verticals or surface enough useful context—users scrolled past merchants that could have been a strong match.\n\nWe needed more density without clutter, and metadata that actually helps comparison at a glance.",
      "We audited carousel usage and selection funnels, then explored layouts that increase visible stores while preserving legibility. Typography, imagery, and badges were tuned so “why this store” reads in one pass.\n\nCross-functional reviews with vertical owners kept the pattern flexible as the catalog evolved.",
      "The updated carousel exposes more relevant stores with consistent metadata, improving scanability and confidence.\n\nWe’d validate with lift in store opens from the module, better diversity of merchants surfaced, and qualitative gains in perceived relevance.",
    ),
  },

  thumbnails: {
    slug: "thumbnails",
    name: "Improving Item Thumbnail",
    mediaTone: "grey",
    date: "2019 — 2026",
    role: "Product Designer",
    intro:
      "Redesigned item thumbnails for clarity and consistency across catalog views so users can decide faster—with clearer hierarchy and stronger promotion visibility.",
    blocks: problemApproachImpactLayout(
      "Thumbnails varied wildly across surfaces—sometimes hiding key facts, sometimes crowding the tile—so people hesitated or tapped in just to understand what they were seeing.\n\nDeals and attributes competed visually, slowing comparison in dense menus.",
      "We established a thumbnail system: fixed information architecture for title, price, promos, and dietary or portion cues, with rules for imagery and fallbacks. Prototypes in Figma covered grid, list, and search contexts.\n\nWe validated with research sessions and engineering for image pipelines, caching, and accessibility.",
      "Catalog views became easier to parse at a glance, with promotions and metadata visible in a predictable hierarchy.\n\nExpected signals include higher engagement on tiles, faster add-to-cart, and improved recognition of offers without sacrificing clarity.",
    ),
  },

  "home-banners": {
    slug: "home-banners",
    name: "Home Banners",
    mediaTone: "warm",
    date: "2019 — 2026",
    role: "Product Designer",
    intro:
      "Dynamic section on the feed for key events, featured restaurants, and updates—so essential merchandising does not get lost.",
    blocks: problemApproachImpactLayout(
      "Important campaigns and updates competed with organic feed content without a dedicated, flexible surface—so high-priority messaging was easy to miss or implement inconsistently.\n\nTeams needed a single, attention-worthy module that still felt native to browsing.",
      "We designed a banner system with clear specs for imagery, copy, tap targets, and rotation—plus states for scheduling, expiration, and measurement. Collaboration with marketing and eng ensured the module could be operated without bespoke work each time.\n\nWe explored density and motion carefully so the feed stayed calm but informative.",
      "Banners became a dependable home for launches, crises, and seasonal moments without breaking the feed’s rhythm.\n\nSuccess means higher visibility for critical programs, fewer missed communications, and clean analytics on impressions and downstream actions.",
    ),
  },

  "quick-add": {
    slug: "quick-add",
    name: "Quick Add",
    mediaTone: "grey",
    date: "2019 — 2026",
    role: "Product Designer",
    intro:
      "Designed Quick Add, a feature that allows users to add products directly from the store grid without navigating into product detail pages.\n\nThe solution streamlined the shopping experience by enabling faster item selection, quantity control, and cart visibility directly from the browsing view.",
    blocks: problemApproachImpactLayout(
      [
        "On mobile, users could not add items directly from the product grid. To add a product, they had to:",
        "• Open the product detail page\n• Add the item from there\n• Navigate back to continue browsing",
        "This created:",
        "• Friction and extra steps for simple actions\n• Slower shopping experience\n• Difficulty managing multiple items quickly",
      ].join("\n\n"),
      [
        "I designed a faster, more intuitive add-to-cart experience directly within the grid:",
        "Inline add-to-cart interaction\n• Introduced a “+” button on product cards to add items instantly\n• Enabled adding multiple quantities without leaving the grid",
        "State-based interaction system\nDesigned clear states across platforms:\n• Add item\n• Adding items\n• Added (with quantity indicator)\n• Return to default state",
        "Cart visibility improvements\n• Added badge on cart icon to reflect item count\n• Helped users understand how many products are in their cart at all times",
        "Feedback & confirmation\n• Explored overlay/interstitial feedback when items are added\n• Updated “Add to Cart” behavior to reflect item state and allow quick edits",
        "Cross-platform consistency\n• Designed flows for iOS, Android, and Uber versions, adapting patterns per platform",
      ].join("\n\n"),
      "• Reduced friction by enabling faster, in-context product selection\n• Improved efficiency for users adding multiple items in a single session\n• Increased clarity around cart state and quantity management\n• Established a scalable interaction pattern for grid-based shopping experiences",
    ),
  },

  "quantity-selector": {
    slug: "quantity-selector",
    name: "Quantity Selector",
    mediaTone: "grey",
    date: "2019 — 2026",
    role: "Product Designer",
    intro:
      "Redesigned the Quantity Selector experience across product detail pages (PDP) to improve usability, reduce confusion, and enable faster item selection.\n\nThe solution introduced a persistent, state-driven quantity selector that keeps pricing, actions, and feedback visible throughout the interaction.",
    blocks: problemApproachImpactLayout(
      [
        "The existing quantity selector created friction and confusion, especially in grocery and restaurant contexts:",
        "• Adding multiple items felt disconnected from the add-to-cart action\n• Quantity selection was often hidden behind product details or customizations",
        "Users lacked clear feedback for:",
        "• Required selections\n• Current quantity\n• Cart state",
        "This resulted in a less efficient experience and potential drop-offs during item selection.",
      ].join("\n\n"),
      [
        "Designed a unified, state-based quantity selector system optimized for clarity and flexibility:",
        "Persistent (sticky) selector\n• Kept quantity controls and price always visible, even while scrolling\n• Provided constant context for decision-making",
        "State-driven interaction model\nDefined clear component states:\n• Default (Add to cart)\n• Multiple items\n• Required selections (e.g., customization needed)\n• In-cart / update / remove",
        "Improved feedback & clarity\n• Surface real-time price updates based on quantity\n• Clear transitions between adding, updating, and removing items",
        "Adapted to different verticals\nDesigned for both:\n• Grocery (simple quantity, weight-based items)\n• Restaurants (customizations, required options)",
        "Exploration & iteration\n• Evaluated multiple interaction patterns and layouts\n• Refined component behavior to balance flexibility and simplicity",
      ].join("\n\n"),
      "• Improved clarity and usability of quantity selection\n• Reduced friction when adding multiple or customized items\n• Created a consistent interaction model across grocery and restaurant experiences\n• Established a scalable component for future add-to-cart and PDP interactions",
    ),
  },

  "fun-concepts": {
    slug: "fun-concepts",
    name: "Fun Concepts",
    mediaTone: "sand",
    date: "December 2023",
    role: "Product Designer",
    intro:
      "Fun concepts explored the expansion of the shopping experience beyond food into other verticals. The project is strategically centered on delivering dynamic content to users, with a primary focus on making it effortless for them to discover new products. Additionally, the initiative aims to optimize the overall shopping process, ensuring a seamless and enjoyable user journey.",
    blocks: [
      {
        type: "images",
        items: [
          {
            src: "/work/fun-concepts/hero-dual.png",
            alt: "Mezcal Paloma — lifestyle and product context",
            objectPosition: "25% center",
          },
          {
            src: "/work/fun-concepts/hero-dual.png",
            alt: "Mezcal Paloma — recipe and shopping UI",
            objectPosition: "75% center",
          },
        ],
      },
      {
        type: "text",
        title: "Problem",
        body: "The marketplace needed a credible way to introduce non-food verticals without breaking the mental model users already trusted for meals. Discovery felt tuned for restaurants, not for new categories—so expansion risked feeling bolted on rather than intentional.\n\nWe reframed the challenge around trust and clarity: how might browsing feel as motivating for specialty goods as it does for dinner, without turning the feed into a generic catalog?",
      },
      {
        type: "images",
        items: [
          {
            src: "/work/fun-concepts/hero-dual.png",
            alt: "Problem framing — audit of existing patterns and gaps",
            objectPosition: "20% center",
          },
          {
            src: "/work/fun-concepts/hero-dual.png",
            alt: "Problem framing — opportunity areas in the experience",
            objectPosition: "80% center",
          },
        ],
      },
      {
        type: "text",
        title: "Approach",
        body: "We partnered with research to validate category entry points and mental models, then iterated on layout density, metadata hierarchy, and editorial modules in Figma. Workshops with product and marketing aligned on what “good” discovery looks like for each vertical.\n\nEngineering joined early to stress-test performance with image-heavy feeds, skeleton states, and personalization—so the design system could scale without surprise at build time.",
      },
      {
        type: "images",
        items: [
          {
            src: "/work/fun-concepts/hero-dual.png",
            alt: "Approach — mid-fidelity flows and component exploration",
            objectPosition: "center top",
          },
          {
            src: "/work/fun-concepts/hero-dual.png",
            alt: "Approach — interaction and layout refinements",
            objectPosition: "center 55%",
          },
        ],
      },
      {
        type: "text",
        title: "Impact",
        body: "The direction clarified how dynamic modules could scale across verticals while keeping checkout and cart behavior consistent. Stakeholders gained a shared vocabulary for “discovery” versus “search,” which shortened critique cycles.\n\nNext steps would be phased rollout with metrics on discovery-to-cart, add-to-cart from new verticals, and time-to-first meaningful interaction—using the same modules with vertical-specific content.",
      },
    ],
  },
};

export function resolveProjectPage(slug: string | undefined): ProjectPageData | null {
  if (!slug) return null;
  const fromMap = PROJECT_PAGE_BY_SLUG[slug];
  if (fromMap) return fromMap;
  const base = PROJECTS.find((p) => p.slug === slug);
  if (!base) return null;
  return {
    slug: base.slug,
    name: base.name,
    mediaTone: base.mediaTone,
    date: "2019 — 2026",
    role: "Product Designer",
    intro: base.description,
    blocks: problemApproachImpactLayout(
      `${base.description}\n\nThe team needed a shared picture of user and business constraints before committing to a new experience.`,
      "We ran discovery with research and partners, mapped journeys and edge cases, then iterated in Figma with regular engineering reviews. Prototypes and system notes kept handoff and feasibility aligned.",
      "The work reduced ambiguity for build and launch, aligned stakeholders on success signals, and set up validation with product metrics after release.",
    ),
  };
}
