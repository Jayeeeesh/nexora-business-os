import { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";

const projects = [
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

function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const query = searchQuery.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query);

    const matchesStatus =
      selectedStatus === "All" || project.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Projects</h1>

      <p className="mt-2 text-slate-600">
        Manage and track business projects from one place.
      </p>
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
                name={name}
                client={client}
                status={status}
                deadline={deadline}
                budget={budget}
                progress={progress}
              />
            ),
          )
        )}
      </div>
    </section>
  );
}

export default ProjectsPage;
