import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  HashRouter,
  Route,
  Routes,
} from "react-router/internal/react-server-client";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <HashRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </HashRouter>,
  // </StrictMode>,
);
