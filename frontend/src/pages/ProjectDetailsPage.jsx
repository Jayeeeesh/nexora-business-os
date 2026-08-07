import { useParams, Link } from "react-router";
import useProjects from "../hooks/useProjects";

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { projects } = useProjects();

  const project = projects.find((item) => String(item.id) === projectId);

  if (!project) {
    return (
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Project Not Found</h1>

        <p className="mt-2 text-slate-600">
          The requested project does not exist.
        </p>

        <Link
          to="/projects"
          className="mt-6 inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Back to Projects
        </Link>
      </section>
    );
  }
  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
      <p className="mt-2 text-slate-600">Client: {project.client}</p>
      <p className="mt-2 text-slate-600">Status: {project.status}</p>
      <p className="mt-2 text-slate-600">Deadline: {project.deadline}</p>
      <p className="mt-2 text-slate-600">
        Budget: ₹{project.budget.toLocaleString("en-IN")}
      </p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">Description</h2>

        <p className="mt-2 whitespace-pre-line text-slate-600">
          {project.description || "No description available."}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Back to Projects
        </Link>

        <Link
          to={`/projects/${project.id}/edit`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Edit Project
        </Link>
      </div>
    </section>
  );
}

export default ProjectDetailsPage;
