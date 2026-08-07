import { useState, useEffect } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import { Link } from "react-router";
import useProjects from "../hooks/useProjects";
import useNotification from "../hooks/useNotification";
import ConfirmationModal from "../components/ui/ConfirmationModal";

function ProjectsPage() {
  const { projects, removeProject } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [projectToDelete, setProjectToDelete] = useState(null);
  const { showNotification } = useNotification();

  const query = searchQuery.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query);

    const matchesStatus =
      selectedStatus === "All" || project.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteRequest = (projectId) => {
    const selectedProject = projects.find(
      (project) => project.id === projectId,
    );

    setProjectToDelete(selectedProject ?? null);
  };

  const handleConfirmDelete = () => {
    if (!projectToDelete) {
      return;
    }

    removeProject(projectToDelete.id);
    showNotification("Project deleted successfully.");
    setProjectToDelete(null);
  };

  const handleCancelDelete = () => {
    setProjectToDelete(null);
  };

  useEffect(() => {
    if (!projectToDelete) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setProjectToDelete(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectToDelete]);

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>

          <p className="mt-2 text-slate-600">
            Manage and track business projects from one place.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Add Project
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by project or client..."
          aria-label="Search projects by project or client name"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          aria-label="Filter projects by status"
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-52"
        >
          <option value="All">All statuses</option>
          <option value="In Progress">In Progress</option>
          <option value="Planning">Planning</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <p className="text-sm text-slate-500 md:col-span-2 xl:col-span-3">
            No projects found.
          </p>
        ) : (
          filteredProjects.map(
            ({ id, name, client, status, deadline, budget, progress }) => (
              <ProjectCard
                key={id}
                id={id}
                name={name}
                client={client}
                status={status}
                deadline={deadline}
                budget={budget}
                progress={progress}
                onRemove={handleDeleteRequest}
              />
            ),
          )
        )}
      </div>
      {projectToDelete && (
        <ConfirmationModal
          title="Delete Project"
          message={`Are you sure you want to delete ${projectToDelete.name}?`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
}

export default ProjectsPage;
