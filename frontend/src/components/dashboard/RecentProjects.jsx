const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700",
  Planning: "bg-amber-50 text-amber-700",
  "On Hold": "bg-red-50 text-red-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

function RecentProjects({ projects }) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Projects
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track your latest project activity and progress.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left">
          <thead className="bg-slate-50 text-sm text-slate-600">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                Project
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Client
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Status
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Deadline
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Progress
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {projects.map(
              ({ id, name, client, status, deadline, progress }) => (
                <tr key={id} className="text-sm text-slate-700">
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {name}
                  </td>

                  <td className="px-5 py-4">{client}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusStyles[status] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="px-5 py-4">{deadline}</td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 w-24 overflow-hidden rounded-full bg-slate-200"
                        role="progressbar"
                        aria-label={`${name} progress`}
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <span>{progress}%</span>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentProjects;
