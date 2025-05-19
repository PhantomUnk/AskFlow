import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./shared";
import "./index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
