import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LINKEDIN_URL } from "./constants";
import { ScrollToTop } from "./ScrollToTop";

function SiteHeader() {
  const { pathname } = useLocation();
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
        <nav className="nav nav--header" aria-label="Primary">
          <NavLink to="/" className={workNavClass} end>
            Work
          </NavLink>
          <NavLink to="/about" className={aboutNavClass}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-rule" role="presentation" />
      <a className="footer-linkedin" href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">
        LinkedIn
      </a>
      <p className="footer-email">
        <a href="mailto:natalymedina.nu@gmail.com">natalymedina.nu@gmail.com</a>
      </p>
      <p className="footer-copy">© 2026</p>
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
