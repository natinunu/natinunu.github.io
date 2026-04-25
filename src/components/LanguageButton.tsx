export function LanguageButton() {
  return (
    <div className="hero-lang">
      <button
        type="button"
        className="lang-btn"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-label="Language: English"
      >
        EN
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
    </div>
  );
}
