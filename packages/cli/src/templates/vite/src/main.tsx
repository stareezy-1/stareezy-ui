import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import the virtual styles module so Vite resolves them
import "virtual:quasify-ui/styles";
import "../quasify.config";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
