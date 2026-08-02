import { FolderKanban, IndianRupee, Users, WalletCards } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";

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
    </section>
  );
}

export default DashboardPage;
