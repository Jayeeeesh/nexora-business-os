import { useState, useEffect } from "react";
import ProjectsContext from "./ProjectsContext";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        const normalizedProjects = data.map(normalizeProject);
        setProjects(normalizedProjects);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const addProject = async (project) => {
    const response = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
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

  const value = {
    projects,
    error,
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
