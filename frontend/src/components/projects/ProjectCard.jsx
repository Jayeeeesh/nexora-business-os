import { Link } from "react-router";

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700",
  Planning: "bg-amber-50 text-amber-700",
  "On Hold": "bg-red-50 text-red-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

function ProjectCard({
  id,
  name,
  client,
  status,
  deadline,
  budget,
  progress,
  onRemove,
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{name}</h2>

      <p className="mt-1 text-sm text-slate-500">{client}</p>

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Status</span>

          <span
            className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
              statusStyles[status] || "bg-slate-100 text-slate-700"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Deadline</span>
          <span className="font-medium text-slate-900">{deadline}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Budget</span>
          <span className="font-medium text-slate-900">
            ₹{budget.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="pt-2">
          <div className="mb-2 flex items-center justify-between">
            <span>Progress</span>
            <span className="font-medium text-slate-900">{progress}%</span>
          </div>

          <div
            className="h-2 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label={`${name} progress`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          to={`/projects/${id}`}
          className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          View Details
        </Link>

        <Link
          to={`/projects/${id}/edit`}
          className="block w-full rounded-lg border border-blue-200 px-4 py-2 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Edit Project
        </Link>

        <button
          type="button"
          onClick={() => onRemove(id)}
          className="w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Delete Project
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
