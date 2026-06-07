import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import the virtual styles module so Vite resolves them
import "virtual:stareezy-ui/styles";
import "../stareezy.config";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
