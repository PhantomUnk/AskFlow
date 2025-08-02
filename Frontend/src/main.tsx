import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./shared";
import "./index.scss";
import App from "./App.tsx";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ThemeProvider>
  </StrictMode>
);
