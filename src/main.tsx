import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ViewProvider } from "./context/ViewProvider.tsx";
import { SearchProvider } from "./context/SearchProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ViewProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </ViewProvider>
  </StrictMode>
);
