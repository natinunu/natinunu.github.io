import type { Project } from "../data/projects";
import { PROJECTS } from "../data/projects";
import type { ProjectBodyBlock, ProjectPageData } from "../data/projectDetail";
import type { Locale } from "./LanguageProvider";
import { projectDescription } from "./projectLocale";

/** Spanish-only patches; block titles stay EN keys so `blockTitle` mapping works. */
export type ProjectDetailEsPatch = {
  intro: string;
  role?: string;
  date?: string;
  blocks: Record<
    number,
    | { text: { body: string } }
    | { images: Record<number, { alt: string }> }
  >;
};

const FALLBACK_ES = {
  teamNeedsContext:
    "El equipo necesitaba una visión compartida de las restricciones del usuario y del negocio antes de comprometerse con una nueva experiencia.",
  approach:
    "Hicimos descubrimiento con investigación y socios, mapeamos recorridos y casos límite, e iteramos en Figma con revisiones periódicas de ingeniería. Los prototipos y las notas del sistema mantuvieron alineados la entrega y la viabilidad.",
  impact:
    "El trabajo redujo la ambigüedad para construir y lanzar, alineó a las partes interesadas en las señales de éxito y preparó la validación con métricas de producto después del lanzamiento.",
};

function mergeDetail(base: ProjectPageData, patch: ProjectDetailEsPatch): ProjectPageData {
  const blocks: ProjectBodyBlock[] = base.blocks.map((block, i): ProjectBodyBlock => {
    const p = patch.blocks[i];
    if (!p) return block;
    if ("text" in p && block.type === "text") {
      return { type: "text", title: block.title, body: p.text.body };
    }
    if ("images" in p && block.type === "images") {
      return {
        type: "images",
        items: block.items.map((item, j) => ({
          ...item,
          alt: p.images[j]?.alt ?? item.alt,
        })),
      };
    }
    return block;
  });
  return {
    ...base,
    intro: patch.intro,
    role: patch.role ?? base.role,
    date: patch.date ?? base.date,
    blocks,
  };
}

function mergeFallbackEs(data: ProjectPageData, project: Project): ProjectPageData {
  const intro = projectDescription(project, "es");
  const blocks: ProjectBodyBlock[] = data.blocks.map((block, index): ProjectBodyBlock => {
    if (block.type !== "text") return block;
    if (index === 1) {
      return {
        type: "text",
        title: block.title,
        body: `${intro}\n\n${FALLBACK_ES.teamNeedsContext}`,
      };
    }
    if (index === 3) {
      return { type: "text", title: block.title, body: FALLBACK_ES.approach };
    }
    if (index === 5) {
      return { type: "text", title: block.title, body: FALLBACK_ES.impact };
    }
    return block;
  });
  return {
    ...data,
    intro,
    role: "Diseñadora de producto",
    blocks,
  };
}

/** Full Spanish case-study copy keyed by slug (intro, role, text bodies, image alts). */
export const PROJECT_DETAIL_ES: Record<string, ProjectDetailEsPatch> = {
  "gallery-view": {
    intro:
      "Rediseñamos el escaparate de Uber Eats para que los menús se escaneen más rápido con una vista galería que tiene en cuenta la cobertura de fotos. La solución adapta el diseño por sección de menú: rejillas con imagen principal donde las fotos son sólidas y vuelve al texto donde no lo son.",
    role: "Diseñadora de producto",
    blocks: {
      0: {
        images: {
          0: {
            alt: "Blank Street Coffee: vista de lista antes y vista en rejilla tipo galería después del rediseño (animado)",
          },
        },
      },
      1: {
        text: {
          body: [
            "Los usuarios dedican menos de un minuto a decidir qué pedir, pero los menús son grandes (~44 ítems) y muy textuales. La mayoría solo ve unos pocos ítems antes de elegir, lo que genera:",
            "• Baja eficiencia de escaneo y demasiado desplazamiento\n• Fotos de menú poco aprovechadas\n• Diseños únicos para todos que perjudican a comercios con pocas fotos (a menudo pymes)\n• Oportunidades perdidas para mostrar ítems de alto valor o relevantes",
          ].join("\n\n"),
        },
      },
      2: {
        images: {
          0: {
            alt: "Maqueta en dispositivo: menú de restaurante en vista lista con cobertura desigual de fotos de ítems; varios platos muestran marcadores de posición en lugar de fotografía",
          },
        },
      },
      3: {
        text: {
          body: [
            "Diseñamos un sistema de diseño dinámico a nivel de subsección que se adapta según la cobertura de fotos y el tamaño del menú:",
            "• Vista galería (rejilla de dos columnas con imagen) para secciones con mucha cobertura fotográfica\n• Vista de lista basada en texto para secciones con poca cobertura o mucho contexto (p. ej. resultados de búsqueda, ofertas)\n• Barreras de seguridad (umbrales de cobertura, reglas por cantidad de ítems) para proteger a pymes y evitar diseños pobres\n• Iteración con múltiples variantes de experimento, equilibrando densidad, espacio en blanco y rendimiento",
            "Dirección final:",
            "• Aplicar la vista galería solo cuando la cobertura ≥80% y la sección tiene suficientes ítems\n• Optimizar la coherencia del diseño (p. ej. filas completas, menos espacio vacío)",
          ].join("\n\n"),
        },
      },
      4: {
        images: {
          0: {
            alt: "Exploración de diseño de menú: diseño anterior con marcadores de imagen frente a la dirección con fotografía completa, valoraciones y tarjetas de ítem más ricas",
          },
        },
      },
      5: {
        text: {
          body: [
            "Lanzamiento T3 global que mejora la eficiencia sin dañar las métricas centrales del negocio:",
            "• ↑ Tasa de conversión a nivel de visita y tasa de añadir al carrito\n• ↑ Sesiones de vista de tienda (+0,06%) con CVR de sesión neutro\n• ↑ Mix de valor de pedido (VC sin anuncios) (+0,43%) al mostrar ítems de mayor valor\n• ↑ Tasa de venta cruzada y descubrimiento de ítems nuevos",
            "Cambios de comportamiento:",
            "• Los usuarios se desplazan menos, deciden más rápido y visitan menos tiendas, pero convierten de forma más efectiva",
          ].join("\n\n"),
        },
      },
    },
  },

  "multi-sku-offers": {
    intro:
      "Diseñamos y lanzamos Ofertas multi-SKU, un sistema de promociones que permite ofertas tipo “combina y ahorra” (p. ej. gasta X, ahorra Y) en varios productos. Acerca promociones estilo tienda física a Uber Eats: marcas y comercios pueden campañas más efectivas y los usuarios ganan claridad en el ahorro y en armar la cesta.",
    role: "Diseñadora de producto",
    blocks: {
      0: {
        images: {
          0: {
            alt: "Patrones de promoción de competidores y tienda física — contexto de categoría y vacío en Uber Eats",
          },
        },
      },
      1: {
        text: {
          body: [
            "Uber Eats no cubría promociones habituales en tienda como “compra varios ítems y ahorra”, lo que implicaba:",
            "• Poca capacidad de marcas y comercios para impulsar ventas a nivel de categoría\n• Presupuesto promocional sin usar (p. ej. más de 16 M$ de demanda bloqueada)\n• Menos ofertas de supermercado convincentes frente a competencia y tienda física\n• Confusión o fricción al entender elegibilidad y ahorro",
            "Las ofertas existentes eran sobre todo de un solo SKU o descuentos simples, lo que dificultaba fomentar cestas más grandes con varios ítems.",
          ].join("\n\n"),
        },
      },
      2: {
        images: {
          0: {
            alt: "Ofertas multi-SKU: escaparate final, colecciones y presentación de la oferta",
          },
        },
      },
      3: {
        text: {
          body: [
            "Diseñamos un sistema de ofertas multi-SKU basado en colecciones, con estructuras flexibles y comprensión clara para el usuario:",
            "• Constructos como Gasta X Ahorra Y (GxAy) y después Compra X por Y (CxPy)\n• Modelo orientado a colecciones para que merchandising agrupe ítems elegibles y gestione ofertas a escala",
            "UX de extremo a extremo en superficies:",
            "• Escaparate y centro de ofertas: descubrimiento con carruseles y etiquetas\n• PDP y modal: elegibilidad clara y seguimiento del progreso\n• Carrito y checkout: ítems agrupados con estados “umbral cumplido / no cumplido”",
            "Añadimos barreras (p. ej. una sola redención, lógica de acumulación, restricciones de rentabilidad) para equilibrar flexibilidad, claridad y salud del negocio.",
          ].join("\n\n"),
        },
      },
      4: {
        images: {
          0: {
            alt: "Detalle de producto y progreso — elegibilidad, ahorro e ítems agrupados en el flujo de la oferta",
          },
        },
      },
      5: {
        text: {
          body: [
            "Lanzamiento global con buena adopción temprana y encaje claro producto–mercado:",
            "• ~16,9 K ofertas creadas en 21 comercios\n• 1,84 M$ en gasto de ofertas entre financiación de marca, comercio y Uber\n• Nuevos presupuestos y tipos de campaña para marcas y comercios\n• Cestas más grandes e intencionadas y mejor penetración por categoría",
            "Impacto estratégico:",
            "• Multi-SKU como capacidad central de ofertas\n• Cierre de una brecha importante con tienda física y competidores\n• Base escalable para futuros constructos y modelos de financiación",
          ].join("\n\n"),
        },
      },
    },
  },

  promotions: {
    intro:
      "Lideré el diseño de un sistema de Promociones e incentivos de 0 a 1 para Cornershop, permitiendo aplicar descuentos (envío gratis, % de descuento, importe fijo) en toda la experiencia de compra.\n\nLa solución introdujo un flujo centralizado de promociones entre cuenta, checkout y aplicación automática, estableciendo las promociones como una capacidad central del producto.",
    role: "Diseñadora líder de producto",
    blocks: {
      1: {
        text: {
          body: [
            "Cornershop no admitía promociones ni incentivos, lo que generaba:",
            "• Menor sensación de asequibilidad frente a la competencia\n• Sin forma de que los usuarios descubrieran, gestionaran o aplicaran descuentos\n• Oportunidad perdida de impulsar la demanda con incentivos de marketing",
            "Faltaba visibilidad de las ofertas disponibles y control sobre cómo usarlas.",
          ].join("\n\n"),
        },
      },
      3: {
        text: {
          body: [
            "Como diseñadora líder definí y entregué la experiencia de promociones de extremo a extremo en todas las plataformas:",
            "Nuevo centro de Promociones (Cuenta)\n• Lugar centralizado para ver ofertas disponibles e introducir códigos\n• Estructura clara para distintos tipos de promoción",
            "Integración en checkout\n• Selección y aplicación de promociones antes de confirmar el pedido\n• Separación clara entre ofertas aplicables y no aplicables",
            "Diseño del sistema de promociones\n• Varios tipos: envío gratis, % de descuento, importe fijo\n• Lógica de aplicación automática para reducir fricción",
            "Entrega multiplataforma\n• Flujos para iOS, Android e integración con Uber\n• Colaboración con stakeholders y desarrollo para definir funcionalidad e implementación",
          ].join("\n\n"),
        },
      },
      5: {
        text: {
          body:
            "• Lanzamiento de promociones como capacidad base del producto\n• Mejora de la percepción de asequibilidad con descuentos visibles y utilizables\n• Sistema para que marketing y growth ejecuten campañas de incentivos\n• Base para futuros sistemas de ofertas y experimentación",
        },
      },
    },
  },

  "featured-stores": {
    intro:
      "Renovamos el carrusel de tiendas destacadas para alinearlo con nuevas verticales: más densidad de tiendas, mejor elección del cliente y un diseño coherente con metadatos más ricos.",
    role: "Diseñadora de producto",
    blocks: {
      1: {
        text: {
          body:
            "El carrusel era una entrada crítica a la elección de tienda, pero no reflejaba las nuevas verticales ni ofrecía suficiente contexto útil: los usuarios pasaban de largo comercios que podrían haber encajado bien.\n\nNecesitábamos más densidad sin desorden y metadatos que ayuden a comparar de un vistazo.",
        },
      },
      3: {
        text: {
          body:
            "Auditamos el uso del carrusel y los embudos de selección; exploramos diseños que muestran más tiendas manteniendo legibilidad. Tipografía, imagen y distintivos se afinaron para que “por qué esta tienda” se lea en un solo paso.\n\nRevisiones con los responsables de cada vertical mantuvieron el patrón flexible al evolucionar el catálogo.",
        },
      },
      5: {
        text: {
          body:
            "El carrusel actualizado muestra más tiendas relevantes con metadatos coherentes, mejorando escaneabilidad y confianza.\n\nValidaríamos con aumento de aperturas de tienda desde el módulo, mayor diversidad de comercios mostrados y mejoras cualitativas en la relevancia percibida.",
        },
      },
    },
  },

  thumbnails: {
    intro:
      "Rediseño de miniaturas de ítem para claridad y coherencia en las vistas de catálogo, para que los usuarios decidan más rápido: jerarquía más clara y promociones más visibles.",
    role: "Diseñadora de producto",
    blocks: {
      0: {
        images: {
          0: {
            alt: "Miniaturas de ítem: comparación antes y después en distintos diseños de catálogo",
          },
        },
      },
      1: {
        text: {
          body:
            "Las miniaturas variaban mucho entre superficies: a veces ocultaban datos clave, a veces saturaban la tarjeta, y la gente dudaba o entraba solo para entender qué veía.\n\nOfertas y atributos competían visualmente y ralentizaban la comparación en menús densos.",
        },
      },
      2: {
        images: {
          0: {
            alt: "Sistema de miniaturas mejorado — jerarquía para título, precio, promos e imagen del producto",
          },
        },
      },
      3: {
        text: {
          body:
            "Definimos un sistema de miniaturas: arquitectura de información fija para título, precio, promos y señales dietéticas o de porción, con reglas para imagen y reservas. Prototipos en Figma cubrieron rejilla, lista y búsqueda.\n\nValidamos con sesiones de investigación e ingeniería para pipelines de imagen, caché y accesibilidad.",
        },
      },
      4: {
        images: {
          0: {
            alt: "Resultado de miniaturas — tarjetas más claras en rejilla y lista con metadatos coherentes y ofertas visibles",
          },
        },
      },
      5: {
        text: {
          body:
            "Las vistas de catálogo se leyeron mejor de un vistazo, con promociones y metadatos en una jerarquía predecible.\n\nSeñales esperadas: más interacción en las tarjetas, añadir al carrito más rápido y mejor reconocimiento de ofertas sin perder claridad.",
        },
      },
    },
  },

  "home-banners": {
    intro:
      "Sección dinámica en el feed para eventos clave, restaurantes destacados y novedades, para que el merchandising esencial no se pierda.",
    role: "Diseñadora de producto",
    blocks: {
      1: {
        text: {
          body:
            "Campañas y novedades importantes competían con el feed orgánico sin una superficie dedicada y flexible, así que los mensajes prioritarios pasaban desapercibidos o se implementaban de forma irregular.\n\nLos equipos necesitaban un módulo que llamara la atención y siguiera sintiéndose nativo al navegar.",
        },
      },
      3: {
        text: {
          body:
            "Diseñamos un sistema de banners con especificaciones claras para imagen, texto, zonas táctiles y rotación, más estados para programación, caducidad y medición. Colaboración con marketing e ingeniería para operar el módulo sin trabajo a medida cada vez.\n\nExploramos densidad y movimiento con cuidado para que el feed se mantenga calmado pero informativo.",
        },
      },
      5: {
        text: {
          body:
            "Los banners se convirtieron en un hogar fiable para lanzamientos, crisis y momentos estacionales sin romper el ritmo del feed.\n\nEl éxito implica mayor visibilidad de programas críticos, menos comunicaciones perdidas y analítica limpia de impresiones y acciones posteriores.",
        },
      },
    },
  },

  "quick-add": {
    intro:
      "Diseño de Añadir rápido: los usuarios añaden productos directamente desde la rejilla de la tienda sin entrar en la ficha de producto.\n\nLa solución agiliza la compra con selección más rápida, control de cantidad y visibilidad del carrito desde la vista de exploración.",
    role: "Diseñadora de producto",
    blocks: {
      1: {
        text: {
          body: [
            "En móvil no se podían añadir ítems directamente desde la rejilla de productos. Para añadir había que:",
            "• Abrir la ficha de producto\n• Añadir desde allí\n• Volver atrás para seguir explorando",
            "Esto generaba:",
            "• Fricción y pasos extra para acciones simples\n• Experiencia de compra más lenta\n• Dificultad para gestionar varios ítems con rapidez",
          ].join("\n\n"),
        },
      },
      3: {
        text: {
          body: [
            "Diseñé una experiencia de añadir al carrito más rápida e intuitiva dentro de la rejilla:",
            "Interacción de añadir al carrito en línea\n• Botón “+” en las tarjetas para añadir al instante\n• Varias cantidades sin salir de la rejilla",
            "Sistema de interacción por estados\nEstados claros en todas las plataformas:\n• Añadir ítem\n• Añadiendo\n• Añadido (con indicador de cantidad)\n• Volver al estado por defecto",
            "Mejoras de visibilidad del carrito\n• Distintivo en el icono del carrito con el número de ítems\n• Ayuda para saber cuántos productos hay en el carrito en todo momento",
            "Retroalimentación y confirmación\n• Exploración de superposición o intersticial al añadir\n• Comportamiento de “Añadir al carrito” que refleja el estado del ítem y permite ediciones rápidas",
            "Coherencia multiplataforma\n• Flujos para iOS, Android y versión Uber, adaptando patrones por plataforma",
          ].join("\n\n"),
        },
      },
      5: {
        text: {
          body:
            "• Menos fricción con selección de producto más rápida en contexto\n• Mayor eficiencia al añadir varios ítems en una misma sesión\n• Más claridad del estado del carrito y de la cantidad\n• Patrón de interacción escalable para compras basadas en rejilla",
        },
      },
    },
  },

  "quantity-selector": {
    intro:
      "Rediseño del selector de cantidad en las fichas de producto (PDP) para mejorar usabilidad, reducir confusión y acelerar la elección de cantidad.\n\nLa solución introduce un selector persistente guiado por estados que mantiene visibles precio, acciones y retroalimentación durante toda la interacción.",
    role: "Diseñadora de producto",
    blocks: {
      0: {
        images: {
          0: {
            alt: "Ficha de producto: comparación del selector de cantidad antes y después",
          },
        },
      },
      1: {
        text: {
          body: [
            "El selector de cantidad existente generaba fricción y confusión, sobre todo en supermercado y restaurante:",
            "• Añadir varios ítems se sentía desconectado de la acción de añadir al carrito\n• La cantidad a menudo quedaba oculta tras detalles o personalizaciones",
            "Faltaba retroalimentación clara para:",
            "• Selecciones obligatorias\n• Cantidad actual\n• Estado del carrito",
            "Esto reducía la eficiencia y podía provocar abandono durante la selección.",
          ].join("\n\n"),
        },
      },
      2: {
        images: {
          0: {
            alt: "Selector de cantidad: estado anterior de la PDP y contexto de interacción",
          },
        },
      },
      3: {
        text: {
          body: [
            "Diseño de un sistema unificado de selector de cantidad basado en estados, optimizado para claridad y flexibilidad:",
            "Selector persistente (sticky)\n• Controles de cantidad y precio siempre visibles al desplazarse\n• Contexto constante para decidir",
            "Modelo de interacción por estados\nEstados claros del componente:\n• Por defecto (Añadir al carrito)\n• Varios ítems\n• Selecciones obligatorias (p. ej. personalización)\n• En carrito / actualizar / quitar",
            "Retroalimentación y claridad\n• Precio en tiempo real según la cantidad\n• Transiciones claras entre añadir, actualizar y quitar",
            "Adaptación por vertical\nDiseño para:\n• Supermercado (cantidad simple, ítems por peso)\n• Restaurantes (personalizaciones, opciones obligatorias)",
            "Exploración e iteración\n• Varios patrones de interacción y diseños\n• Refinamiento del comportamiento del componente para equilibrar flexibilidad y simplicidad",
          ].join("\n\n"),
        },
      },
      4: {
        images: {
          0: {
            alt: "Componente selector de cantidad — estados y retroalimentación entre por defecto, varios ítems y en carrito",
          },
        },
      },
      5: {
        text: {
          body:
            "• Mayor claridad y usabilidad en la selección de cantidad\n• Menos fricción al añadir varios ítems o personalizados\n• Modelo de interacción coherente entre supermercado y restaurante\n• Componente escalable para futuras interacciones de añadir al carrito y PDP",
        },
      },
    },
  },

  "fun-concepts": {
    intro:
      "Conceptos divertidos exploraron ampliar la experiencia de compra más allá de la comida hacia otras verticales. El proyecto se centra estratégicamente en ofrecer contenido dinámico, priorizando que descubrir productos nuevos sea casi automático, y en optimizar el recorrido de compra para que sea fluido y agradable.",
    role: "Diseñadora de producto",
    date: "Diciembre 2023",
    blocks: {
      0: {
        images: {
          0: { alt: "Mezcal Paloma — contexto de estilo de vida y producto" },
          1: { alt: "Mezcal Paloma — receta e interfaz de compra" },
        },
      },
      1: {
        text: {
          body:
            "El marketplace necesitaba una forma creíble de introducir verticales no alimentarias sin romper el modelo mental que los usuarios ya confiaban para comidas. El descubrimiento estaba calibrado para restaurantes, no para categorías nuevas: la expansión arriesgaba parecer añadida sin intención.\n\nReplantamos el reto en torno a confianza y claridad: ¿cómo hacer que explorar motive tanto para artículos especiales como para la cena, sin convertir el feed en un catálogo genérico?",
        },
      },
      2: {
        images: {
          0: { alt: "Encuadre del problema — auditoría de patrones existentes y vacíos" },
          1: { alt: "Encuadre del problema — áreas de oportunidad en la experiencia" },
        },
      },
      3: {
        text: {
          body:
            "Trabajamos con investigación para validar puntos de entrada y modelos mentales por categoría; iteramos densidad de diseño, jerarquía de metadatos y módulos editoriales en Figma. Talleres con producto y marketing alinearon qué significa un “buen” descubrimiento en cada vertical.\n\nIngeniería entró pronto para estrés de rendimiento con feeds con muchas imágenes, estados esqueleto y personalización, de modo que el sistema de diseño escale sin sorpresas en implementación.",
        },
      },
      4: {
        images: {
          0: { alt: "Enfoque — flujos de fidelidad media y exploración de componentes" },
          1: { alt: "Enfoque — refinamiento de interacción y diseño" },
        },
      },
      5: {
        text: {
          body:
            "La dirección aclaró cómo los módulos dinámicos pueden escalar entre verticales manteniendo checkout y carrito coherentes. Los stakeholders compartieron vocabulario sobre “descubrimiento” frente a “búsqueda”, acortando ciclos de crítica.\n\nLos siguientes pasos serían despliegue por fases con métricas de descubrimiento a carrito, añadir al carrito desde verticales nuevas y tiempo hasta la primera interacción significativa, reutilizando los mismos módulos con contenido por vertical.",
        },
      },
    },
  },
};

export function applyProjectDetailLocale(data: ProjectPageData, locale: Locale): ProjectPageData {
  if (locale !== "es") return data;
  const patch = PROJECT_DETAIL_ES[data.slug];
  if (patch) return mergeDetail(data, patch);
  const project = PROJECTS.find((x) => x.slug === data.slug);
  if (project) return mergeFallbackEs(data, project);
  return data;
}
