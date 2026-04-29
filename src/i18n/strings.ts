import type { Locale } from "./LanguageProvider";

/** UI copy keyed by locale. */
export const STRINGS: Record<
  Locale,
  {
    navWork: string;
    navAbout: string;
    footerLinkedIn: string;
    footerCopyright: string;
    workDocTitle: string;
    aboutDocTitle: string;
    projectDocTitleSuffix: string;
    projectNotFound: string;
    projectNotFoundTitle: string;
    metaDate: string;
    metaRole: string;
    heroIntroVisuallyHidden: string;
    heroTextLead: string;
    heroLine: string;
    heroTextTail: string;
    heroHint: string;
    workHeading: string;
    workDates: string;
    openProjectAria: string;
    placeholderVisual: string;
    aboutHeading: string;
    langAria: string;
    langMenuLabel: string;
    addImagePlaceholder: string;
    aboutSections: { label: string; content: string }[];
    blockTitle: Record<string, string>;
  }
> = {
  en: {
    navWork: "Work",
    navAbout: "About",
    footerLinkedIn: "LinkedIn",
    footerCopyright: "© 2026",
    workDocTitle: "Work | Natwork — Nati Medina",
    aboutDocTitle: "About | Natwork — Nati Medina",
    projectDocTitleSuffix: "| Nati Medina",
    projectNotFound: "This project does not exist.",
    projectNotFoundTitle: "Project | Nati Medina",
    metaDate: "Date",
    metaRole: "Role",
    heroIntroVisuallyHidden: "Introduction",
    heroTextLead: "I am Nati, a product & graphic designer",
    heroLine: "based in Chile",
    heroTextTail: ", working on interface design & user experience.",
    heroHint: "Scroll down to see my work!",
    workHeading: "Work",
    workDates: "2019 — 2026",
    openProjectAria: "open project",
    placeholderVisual: "Project visual",
    aboutHeading: "About",
    langAria: "Language",
    langMenuLabel: "Choose language",
    addImagePlaceholder: "Add image",
    aboutSections: [
      {
        label: "Profile",
        content:
          "Passionate Product Designer dedicated to humanizing technology and enhancing user experiences. My goal is to create practical tools and products that cater to the needs of today's society.",
      },
      {
        label: "Experience",
        content:
          "Over the past six years, I've been on an exciting journey in the tech world, working hand in hand with amazing engineering, product, and marketing teams. From diving into insightful research to managing creative teams and even doing a bit of hands-on coding, my diverse skill set brings a playful integration of design and tech to every project.",
      },
      {
        label: "Skills",
        content:
          "My forte lies in crafting cohesive design systems that elevate the overall user experience. In a design management role, I excel in leading collaborative teams, aligning creative efforts with overarching business goals. Additionally, my coding proficiency bridges the design-implementation gap, contributing to impactful project outcomes.",
      },
      {
        label: "Tools",
        content:
          "Proficient in Figma, HTML, and CSS. I also work with AI-assisted design and build tools: Cursor, Figma Make, Claude, and Lovable.",
      },
    ],
    blockTitle: {
      Problem: "Problem",
      Approach: "Approach",
      Impact: "Impact",
    },
  },
  es: {
    navWork: "Trabajo",
    navAbout: "Sobre mí",
    footerLinkedIn: "LinkedIn",
    footerCopyright: "© 2026",
    workDocTitle: "Trabajo | Natwork — Nati Medina",
    aboutDocTitle: "Sobre mí | Natwork — Nati Medina",
    projectDocTitleSuffix: "| Nati Medina",
    projectNotFound: "Este proyecto no existe.",
    projectNotFoundTitle: "Proyecto | Nati Medina",
    metaDate: "Fecha",
    metaRole: "Rol",
    heroIntroVisuallyHidden: "Introducción",
    heroTextLead: "Soy Nati, diseñadora de producto y gráfica",
    heroLine: "con base en Chile",
    heroTextTail: "; trabajo diseño de interfaces y experiencia de usuario.",
    heroHint: "¡Desplázate para ver mi trabajo!",
    workHeading: "Trabajo",
    workDates: "2019 — 2026",
    openProjectAria: "abrir proyecto",
    placeholderVisual: "Visual del proyecto",
    aboutHeading: "Sobre mí",
    langAria: "Idioma",
    langMenuLabel: "Elegir idioma",
    addImagePlaceholder: "Añadir imagen",
    aboutSections: [
      {
        label: "Perfil",
        content:
          "Diseñadora de producto enfocada en humanizar la tecnología y mejorar la experiencia de usuario. Mi objetivo es crear herramientas y productos útiles que respondan a las necesidades de la sociedad actual.",
      },
      {
        label: "Experiencia",
        content:
          "En los últimos años he recorrido un camino apasionante en tecnología, colaborando de cerca con equipos de ingeniería, producto y marketing. Desde investigación hasta liderar equipos creativos y algo de código, integro diseño y tecnología en cada proyecto.",
      },
      {
        label: "Habilidades",
        content:
          "Me especializo en sistemas de diseño coherentes que elevan la experiencia global. En roles de liderazgo alineo el trabajo creativo con objetivos de negocio; el código me ayuda a acortar la distancia entre diseño e implementación.",
      },
      {
        label: "Herramientas",
        content:
          "Figma, HTML y CSS. También uso herramientas de diseño y desarrollo asistidas por IA: Cursor, Figma Make, Claude y Lovable.",
      },
    ],
    blockTitle: {
      Problem: "Problema",
      Approach: "Enfoque",
      Impact: "Impacto",
    },
  },
};
