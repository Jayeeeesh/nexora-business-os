import { FolderKanban, IndianRupee, Users, WalletCards } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import RecentProjects from "../components/dashboard/RecentProjects";

const dashboardStats = [
  {
    label: "Active Projects",
    value: "12",
    trend: "+2 this month",
    icon: FolderKanban,
  },
  {
    label: "Total Labour",
    value: "48",
    trend: "+6 this month",
    icon: Users,
  },
  {
    label: "Monthly Expenses",
    value: "₹1,24,500",
    trend: "8% higher",
    icon: IndianRupee,
  },
  {
    label: "Pending Payments",
    value: "₹42,000",
    trend: "4 payments pending",
    icon: WalletCards,
  },
];

const recentProjects = [
  {
    id: 1,
    name: "Retail Store Renovation",
    client: "Sharma Traders",
    status: "In Progress",
    deadline: "12 Aug 2026",
    progress: 72,
  },
  {
    id: 2,
    name: "Warehouse Electrical Work",
    client: "Patil Industries",
    status: "Planning",
    deadline: "20 Aug 2026",
    progress: 25,
  },
  {
    id: 3,
    name: "Office Interior Setup",
    client: "Nexon Solutions",
    status: "On Hold",
    deadline: "28 Aug 2026",
    progress: 48,
  },
  {
    id: 4,
    name: "Restaurant Maintenance",
    client: "Spice Garden",
    status: "Completed",
    deadline: "30 Jul 2026",
    progress: 100,
  },
];

function DashboardPage() {
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
