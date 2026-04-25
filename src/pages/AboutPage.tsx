import { useEffect, type ReactNode } from "react";

type Section = { label: string; content: ReactNode };

const SECTIONS: Section[] = [
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
    content: "Proficient in Figma, HTML, and CSS.",
  },
  {
    label: "Contact",
    content: (
      <>
        <p className="about-row-text about-row-text--contact">
          <a href="mailto:natalymedina.nu@gmail.com">natalymedina.nu@gmail.com</a>
        </p>
        <p className="about-row-text about-row-text--contact">
          <a href="tel:+56968186911">569-68186911</a>
        </p>
      </>
    ),
  },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "About | Natwork — Nati Medina";
  }, []);

  return (
    <div className="about-page">
      <h1 className="about-page-title">About</h1>
      <div className="about-grid">
        {SECTIONS.map((section) => (
          <section
            key={section.label}
            className="about-row"
            aria-labelledby={`about-${section.label.toLowerCase()}`}
          >
            <h2 id={`about-${section.label.toLowerCase()}`} className="about-row-label">
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
