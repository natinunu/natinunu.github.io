import { useEffect, useId, useRef, useState } from "react";
import { useLanguage, type Locale } from "../i18n/LanguageProvider";
import { STRINGS } from "../i18n/strings";

type LanguageButtonProps = {
  /** `hero` = under intro copy on home; `header` = top bar (all pages). */
  placement?: "hero" | "header";
};

export function LanguageButton({ placement = "hero" }: LanguageButtonProps) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const t = STRINGS[locale];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  const short = locale === "en" ? "EN" : "ES";
  const ariaCurrent =
    locale === "en" ? "English" : "Español";

  const wrapClass = placement === "header" ? "lang-wrap lang-wrap--header" : "lang-wrap lang-wrap--hero";

  return (
    <div className={wrapClass} ref={rootRef}>
      <button
        type="button"
        className="lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${t.langAria}: ${ariaCurrent}`}
        onClick={() => setOpen((v) => !v)}
      >
        {short}
        <svg className="lang-chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open ? (
        <ul className="lang-menu" id={listId} role="listbox" aria-label={t.langMenuLabel}>
          <li className="lang-menu-item" role="presentation">
            <button
              type="button"
              className="lang-menu-option"
              role="option"
              aria-selected={locale === "en"}
              onClick={() => pick("en")}
            >
              English
            </button>
          </li>
          <li className="lang-menu-item" role="presentation">
            <button
              type="button"
              className="lang-menu-option"
              role="option"
              aria-selected={locale === "es"}
              onClick={() => pick("es")}
            >
              Español
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
