import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ProjectsProvider from "./context/ProjectsProvider.jsx";
import NotificationProvider from "./context/NotificationProvider";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
