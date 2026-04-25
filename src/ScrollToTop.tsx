import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Reset window scroll on client-side navigation (e.g. home → project). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
