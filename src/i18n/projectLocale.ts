import type { Locale } from "./LanguageProvider";
import { PROJECTS, type Project } from "../data/projects";

/** Spanish names and blurbs for project cards and project page titles. */
const PROJECT_ES: Partial<Record<string, { name: string; description: string }>> = {
  "gallery-view": {
    name: "Vista galería",
    description:
      "Rediseño del escaparate de Uber Eats para recorrer menús más rápido y entenderlos mejor. Pasamos de listas muy textuales a un sistema dinámico con imágenes para que la gente encuentre algo atractivo en segundos, cuidando el equilibrio del marketplace entre grandes y pequeños comercios.",
  },
  "multi-sku-offers": {
    name: "Ofertas multi-SKU",
    description:
      "Diseño y lanzamiento de un sistema de promociones mix-and-match (p. ej. gasta X, ahorra Y) en varios productos: ofertas estilo tienda física en Uber Eats para marcas y comercios, con ahorro más claro en cestas más grandes.",
  },
  "quantity-selector": {
    name: "Selector de cantidad",
    description:
      "Rediseño del control de cantidad en la ficha de producto: selector persistente con precio y feedback claros para retail y restaurantes, y un patrón reutilizable para añadir al carrito.",
  },
  thumbnails: {
    name: "Miniaturas de producto",
    description:
      "Rediseño de miniaturas en catálogo para leer más rápido: jerarquía más clara y promociones más visibles en vistas densas.",
  },
  "fun-concepts": {
    name: "Conceptos exploratorios",
    description:
      "Exploración para llevar la experiencia más allá de la comida: contenido dinámico y descubrimiento en más verticales con un recorrido más fluido.",
  },
  promotions: {
    name: "Promociones",
    description:
      "Promociones e incentivos de 0 a 1 en Cornershop: descuentos en cuenta, checkout y aplicación automática, con hub central e integración en iOS, Android y Uber.",
  },
  "featured-stores": {
    name: "Tiendas destacadas",
    description:
      "Renovación del carrusel de tiendas destacadas para nuevas verticales: más densidad, mejor elección y metadatos más útiles.",
  },
  "home-banners": {
    name: "Banners de inicio",
    description:
      "Sección dinámica en el feed para campañas, locales destacados y novedades, para que el merchandising importante no se pierda.",
  },
  "quick-add": {
    name: "Añadir rápido",
    description:
      "Añadir desde la rejilla sin abrir la ficha: botón “+”, cantidad y estado del carrito en la tarjeta, badge más claro y flujos coherentes en iOS, Android y Uber.",
  },
};

export function projectName(project: Project, locale: Locale): string {
  if (locale === "es") {
    const o = PROJECT_ES[project.slug];
    if (o) return o.name;
  }
  return project.name;
}

export function projectDescription(project: Project, locale: Locale): string {
  if (locale === "es") {
    const o = PROJECT_ES[project.slug];
    if (o) return o.description;
  }
  return project.description;
}

/** Project page `<h1>` / title when Spanish is selected (falls back to catalog name). */
export function projectPageTitle(slug: string | undefined, defaultName: string, locale: Locale): string {
  if (!slug || locale !== "es") return defaultName;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return defaultName;
  return projectName(p, locale);
}
