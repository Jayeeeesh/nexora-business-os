import { Menu } from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            Business Operations
          </p>

          <p className="text-xs text-slate-500">
            Manage your work from one place
          </p>
        </div>
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
        JT
      </div>
    </header>
  );
}

export default Header;
