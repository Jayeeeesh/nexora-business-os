import { useState, useEffect } from "react";
import ProjectsContext from "./ProjectsContext";

const PROJECTS_STORAGE_KEY = "nexora-projects";

const initialProjects = [
  {
    id: 1,
    name: "Retail Store Renovation",
    client: "Sharma Traders",
    status: "In Progress",
    deadline: "12 Aug 2026",
    budget: 250000,
    progress: 72,
  },
  {
    id: 2,
    name: "Warehouse Electrical Work",
    client: "Patil Industries",
    status: "Planning",
    deadline: "20 Aug 2026",
    budget: 180000,
    progress: 25,
  },
  {
    id: 3,
    name: "Office Interior Setup",
    client: "Nexon Solutions",
    status: "On Hold",
    deadline: "28 Aug 2026",
    budget: 320000,
    progress: 48,
  },
  {
    id: 4,
    name: "Restaurant Maintenance",
    client: "Spice Garden",
    status: "Completed",
    deadline: "30 Jul 2026",
    budget: 95000,
    progress: 100,
  },
];

function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);

    if (!storedProjects) {
      return initialProjects;
    }

    try {
      const parsedProjects = JSON.parse(storedProjects);
      return Array.isArray(parsedProjects) ? parsedProjects : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  useEffect(() => {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    const projectWithId = {
      ...project,
      id: crypto.randomUUID(),
    };
    setProjects((prev) => [projectWithId, ...prev]);
  };

  const value = {
    projects,
    addProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectsProvider;
