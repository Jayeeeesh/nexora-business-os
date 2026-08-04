import { useContext } from "react";
import ProjectsContext from "../context/ProjectsContext";

function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjects must be used inside a ProjectsProvider");
  }

  return context;
}

export default useProjects;
