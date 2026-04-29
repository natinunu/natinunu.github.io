import { useEffect, useMemo, type ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { STRINGS } from "../i18n/strings";

type Section = { label: string; content: ReactNode };

function contactBlock(): ReactNode {
  return (
    <>
      <p className="about-row-text about-row-text--contact">
        <a href="mailto:natalymedina.nu@gmail.com">natalymedina.nu@gmail.com</a>
      </p>
      <p className="about-row-text about-row-text--contact">
        <a href="tel:+56968186911">569-68186911</a>
      </p>
    </>
  );
}

export default function AboutPage() {
  const { locale } = useLanguage();

  const sections: Section[] = useMemo(() => {
    const bundle = STRINGS[locale];
    const contactLabel = locale === "es" ? "Contacto" : "Contact";
    const rows: Section[] = bundle.aboutSections.map((s) => ({
      label: s.label,
      content: s.content,
    }));
    rows.push({ label: contactLabel, content: contactBlock() });
    return rows;
  }, [locale]);

  useEffect(() => {
    document.title = STRINGS[locale].aboutDocTitle;
  }, [locale]);

  return (
    <div className="about-page">
      <h1 className="about-page-title">{STRINGS[locale].aboutHeading}</h1>
      <div className="about-grid">
        {sections.map((section) => (
          <section
            key={section.label}
            className="about-row"
            aria-labelledby={`about-${section.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <h2 id={`about-${section.label.toLowerCase().replace(/\s+/g, "-")}`} className="about-row-label">
              {section.label}
            </h2>
            <div className="about-row-body">
              {typeof section.content === "string" ? (
                <p className="about-row-text">{section.content}</p>
              ) : (
                section.content
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
