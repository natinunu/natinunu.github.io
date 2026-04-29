export type MediaTone = "grey" | "peach" | "mist" | "warm" | "sage" | "sand";

export type Project = {
  slug: string;
  name: string;
  mediaTone: MediaTone;
  description: string;
  /** Optional hero image inside the work card device frame (path under `public/`). */
  coverSrc?: string;
};

/** Newest first in the Work feed; `WORK_PAGE_PROJECTS` only lists entries with `coverSrc`. */
export const PROJECTS: Project[] = [
  {
    slug: "gallery-view",
    name: "Gallery View",
    mediaTone: "grey",
    coverSrc: "/work/gallery-view/gallery-view-cover.png",
    description:
      "Redesign of the Uber Eats storefront that makes menus faster to browse and easier to understand. By shifting from a text-heavy list to a dynamic, image-driven system, we helped users find something appealing within seconds while maintaining a healthy marketplace across both large and small merchants.",
  },
  {
    slug: "multi-sku-offers",
    name: "Multi SKU Offers",
    mediaTone: "peach",
    coverSrc: "/work/multi-sku-offers/multi-sku-cover.gif",
    description:
      "Designed and launched a promotions system for mix-and-match deals (e.g., Spend $X, Save $Y) across multiple products—bringing in-store-style offers to Uber Eats so CPGs and merchants can run stronger campaigns and users get clearer savings on larger baskets.",
  },
  {
    slug: "quantity-selector",
    name: "Quantity Selector",
    mediaTone: "grey",
    coverSrc: "/work/quantity-selector/cover.png",
    description:
      "PDP quantity control redesign—a sticky, state-driven selector with clear pricing and feedback for grocery and restaurant flows, and a scalable pattern for add-to-cart.",
  },
  {
    slug: "thumbnails",
    name: "Improving Item Thumbnail",
    mediaTone: "grey",
    coverSrc: "/work/item-thumbnail/cover.png",
    description:
      "Redesigned item thumbnails for clarity and consistency across catalog views so users can decide faster—with clearer hierarchy and stronger promotion visibility.",
  },
  {
    slug: "fun-concepts",
    name: "Fun Concepts",
    mediaTone: "sand",
    description:
      "Explored expanding the shopping experience beyond food—dynamic content and discovery across verticals with a smoother end-to-end journey.",
  },
  {
    slug: "promotions",
    name: "Promotions",
    mediaTone: "peach",
    description:
      "0→1 Promotions & Incentives for Cornershop—discounts across account, checkout, and automatic application—with a centralized hub, checkout integration, and cross-platform flows on iOS, Android, and Uber.",
  },
  {
    slug: "featured-stores",
    name: "Featured Stores",
    mediaTone: "mist",
    description:
      "Revamped the featured stores carousel to align with new verticals: maximize store density, improve customer selection, and keep a cohesive design with richer metadata.",
  },
  {
    slug: "home-banners",
    name: "Home Banners",
    mediaTone: "warm",
    description:
      "Dynamic section on the feed for key events, featured restaurants, and updates—so essential merchandising does not get lost.",
  },
  {
    slug: "quick-add",
    name: "Quick Add",
    mediaTone: "grey",
    description:
      "Add from the store grid without opening PDPs—inline “+”, quantity and cart state on the card, clearer cart badge, and consistent flows on iOS, Android, and Uber.",
  },
];

/** Shown on the Work page only; add `coverSrc` when the cover is ready. */
export const WORK_PAGE_PROJECTS: Project[] = PROJECTS.filter((p) => Boolean(p.coverSrc?.trim()));
