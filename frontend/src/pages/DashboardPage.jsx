import {
  FolderKanban,
  CircleCheck,
  TriangleAlert,
  ClockAlert,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import RecentProjects from "../components/dashboard/RecentProjects";
import useProjects from "../hooks/useProjects";

function DashboardPage() {
  const { projects } = useProjects();

  const activeProjectsCount = projects.filter(
    (project) => project.status === "In Progress",
  ).length;

  const completedProjectsCount = projects.filter(
    (project) => project.status === "Completed",
  ).length;

  const highPriorityProjectsCount = projects.filter(
    (project) => project.priority === "High",
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueProjectsCount = projects.filter((project) => {
    const deadline = new Date(project.deadline);
    deadline.setHours(0, 0, 0, 0);

    return project.status !== "Completed" && deadline < today;
  }).length;

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const dashboardStats = [
    {
      label: "Active Projects",
      value: activeProjectsCount,
      trend: "Currently in progress",
      icon: FolderKanban,
    },
    {
      label: "Completed Projects",
      value: completedProjectsCount,
      trend: "Finished successfully",
      icon: CircleCheck,
    },
    {
      label: "High Priority Projects",
      value: highPriorityProjectsCount,
      trend: "Needs close attention",
      icon: TriangleAlert,
    },
    {
      label: "Overdue Projects",
      value: overdueProjectsCount,
      trend: "Past deadline",
      icon: ClockAlert,
    },
  ];

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

      <p className="mt-2 text-slate-600">
        Welcome to the Nexora business dashboard.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map(({ label, value, trend, icon }) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            trend={trend}
            icon={icon}
          />
        ))}
      </div>

      <RecentProjects projects={recentProjects} />
    </section>
  );
}

export default DashboardPage;
