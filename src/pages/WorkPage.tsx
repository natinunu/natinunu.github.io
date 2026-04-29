import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { STRINGS } from "../i18n/strings";
import { projectDescription, projectName } from "../i18n/projectLocale";
import { WORK_PAGE_PROJECTS } from "../data/projects";

export default function WorkPage() {
  const { locale } = useLanguage();
  const t = STRINGS[locale];

  useEffect(() => {
    document.title = t.workDocTitle;
  }, [t.workDocTitle]);

  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="visually-hidden">
          {t.heroIntroVisuallyHidden}
        </h1>
        <p className="hero-text">
          {t.heroTextLead} <span className="hero-line">{t.heroLine}</span>
          {t.heroTextTail}
        </p>
        <p className="hero-hint">{t.heroHint}</p>
      </section>

      <section id="work" className="work" aria-labelledby="work-heading">
        <h2 id="work-heading" className="work-title">
          {t.workHeading}
        </h2>
        <p className="work-dates">{t.workDates}</p>

        <ul className="project-list">
          {WORK_PAGE_PROJECTS.map((p) => (
            <li key={p.slug}>
              <article className="project-card">
                <Link
                  className={`project-media project-media--${p.mediaTone}${
                    p.coverSrc ? " project-media--cover-only" : ""
                  }`}
                  to={`/work/${p.slug}`}
                  aria-label={`${projectName(p, locale)} — ${t.openProjectAria}`}
                >
                  {p.coverSrc ? (
                    <img
                      className="project-cover-img"
                      src={p.coverSrc}
                      alt=""
                      loading={
                        p.coverSrc.split("?")[0].split("#")[0].toLowerCase().endsWith(".gif")
                          ? "eager"
                          : "lazy"
                      }
                      decoding="async"
                    />
                  ) : (
                    <div className="device-frame" role="presentation">
                      <div className="device-screen">
                        <span className="placeholder-label">{t.placeholderVisual}</span>
                      </div>
                    </div>
                  )}
                </Link>
                <div className="project-body">
                  <h3 className="project-name">
                    <Link to={`/work/${p.slug}`}>{projectName(p, locale)}</Link>
                  </h3>
                  <p className="project-desc">{projectDescription(p, locale)}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
