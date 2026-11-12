import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applyInitialLanguage } from "./i18n";

// Antes de montar: si corresponde otro idioma, ajusta la URL (sin recargar).
applyInitialLanguage();

createRoot(document.getElementById("root")!).render(<App />);
