import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ProjectsProvider from "./context/ProjectsProvider.jsx";
import NotificationProvider from "./context/NotificationProvider";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProjectsProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </ProjectsProvider>
    </BrowserRouter>
  </StrictMode>,
);
