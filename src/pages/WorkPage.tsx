import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageButton } from "../components/LanguageButton";
import { PROJECTS } from "../data/projects";

export default function WorkPage() {
  useEffect(() => {
    document.title = "Work | Natwork — Nati Medina";
  }, []);

  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="visually-hidden">
          Introduction
        </h1>
        <p className="hero-text">
          I am Nati, a product &amp; graphic designer{" "}
          <span className="hero-line">based in Chile</span>, working on interface design &amp; user
          experience.
        </p>
        <p className="hero-hint">Scroll down to see my work!</p>
        <LanguageButton />
      </section>

      <section id="work" className="work" aria-labelledby="work-heading">
        <h2 id="work-heading" className="work-title">
          Work
        </h2>
        <p className="work-dates">2019 — 2026</p>

        <ul className="project-list">
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <article className="project-card">
                <Link
                  className={`project-media project-media--${p.mediaTone}`}
                  to={`/work/${p.slug}`}
                  aria-label={`${p.name} — open project`}
                >
                  <div className="device-frame" role="presentation">
                    <div className="device-screen">
                      <span className="placeholder-label">Project visual</span>
                    </div>
                  </div>
                </Link>
                <div className="project-body">
                  <h3 className="project-name">
                    <Link to={`/work/${p.slug}`}>{p.name}</Link>
                  </h3>
                  <p className="project-desc">{p.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
