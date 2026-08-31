import { useState, useEffect } from "react";
import ProjectsContext from "./ProjectsContext";
import useAuth from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

const normalizeProject = (project) => {
  return {
    ...project,
    id: project._id,
  };
};

function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loadedForUserId, setLoadedForUserId] = useState(null);
  const { user, isLoading: isAuthLoading } = useAuth();
  const userId = user?._id ?? user?.id ?? null;

  useEffect(() => {
    if (isAuthLoading || !userId) {
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        const normalizedProjects = data.map(normalizeProject);
        setProjects(normalizedProjects);
        setError("");
        setLoadedForUserId(userId);
      } catch (error) {
        setProjects([]);
        setError(error.message);
        setLoadedForUserId(userId);
      }
    };

    fetchProjects();
  }, [userId, isAuthLoading]);

  const addProject = async (project) => {
    const response = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    const savedProject = await response.json();
    if (!response.ok) {
      throw new Error(savedProject.message || "Failed to create project");
    }
    const normalizedProject = normalizeProject(savedProject);
    setProjects((prev) => [normalizedProject, ...prev]);
  };

  const removeProject = async (projectId) => {
    const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to delete project");
    }

    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  const updateProject = async (projectId, updatedProject) => {
    const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    });

    const savedProject = await response.json();

    if (!response.ok) {
      throw new Error(savedProject.message || "Failed to update project");
    }

    const normalizedProject = normalizeProject(savedProject);
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? normalizedProject : project,
      ),
    );
  };

  const hasLoadedCurrentUser = Boolean(userId) && loadedForUserId === userId;
  const visibleProjects = hasLoadedCurrentUser ? projects : [];
  const visibleError = hasLoadedCurrentUser ? error : "";
  const isLoading = isAuthLoading || (Boolean(userId) && !hasLoadedCurrentUser);

  const value = {
    projects: visibleProjects,
    error: visibleError,
    isLoading,
    addProject,
    removeProject,
    updateProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectsProvider;
