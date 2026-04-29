import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { AppRouter } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  </StrictMode>,
);
