import { NavLink } from "react-router";
import { LayoutDashboard, FolderKanban, X } from "lucide-react";

const getNavLinkClass = ({ isActive }) => {
  const baseClasses =
    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors";

  return `${baseClasses} ${
    isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"
  }`;
};

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Nexora</h2>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Close navigation menu"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Main navigation">
        {navigationItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onClose}
            className={getNavLinkClass}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
