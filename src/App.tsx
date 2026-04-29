import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LINKEDIN_URL } from "./constants";
import { ScrollToTop } from "./ScrollToTop";
import { LanguageButton } from "./components/LanguageButton";
import { useLanguage } from "./i18n/LanguageProvider";
import { STRINGS } from "./i18n/strings";

function SiteHeader() {
  const { pathname } = useLocation();
  const { locale } = useLanguage();
  const t = STRINGS[locale];
  const workSectionActive = pathname === "/" || pathname.startsWith("/work/");

  const workNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive || workSectionActive ? "nav-link nav-link--active" : "nav-link";

  const aboutNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link nav-link--active" : "nav-link";

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="logo" aria-label="Home">
          <img
            src="/logo.png"
            alt=""
            className="logo-img"
            width={40}
            height={40}
            decoding="async"
          />
        </Link>
        <div className="site-header-right">
          <nav className="nav nav--header" aria-label="Primary">
            <NavLink to="/" className={workNavClass} end>
              {t.navWork}
            </NavLink>
            <NavLink to="/about" className={aboutNavClass}>
              {t.navAbout}
            </NavLink>
          </nav>
          <LanguageButton placement="header" />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const { locale } = useLanguage();
  const t = STRINGS[locale];
  return (
    <footer className="site-footer">
      <div className="footer-rule" role="presentation" />
      <a className="footer-linkedin" href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">
        {t.footerLinkedIn}
      </a>
      <p className="footer-email">
        <a href="mailto:natalymedina.nu@gmail.com">natalymedina.nu@gmail.com</a>
      </p>
      <p className="footer-copy">{t.footerCopyright}</p>
    </footer>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const layoutLight =
    pathname === "/about" || pathname.startsWith("/work/");
  const isHome = pathname === "/";

  return (
    <div
      className={[
        "app-layout",
        layoutLight ? "app-layout--surface" : "",
        isHome ? "app-layout--home" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ScrollToTop />
      <SiteHeader />
      <main id="main-content">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
