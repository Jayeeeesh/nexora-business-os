import { Outlet } from "react-router";
import Sidebar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";
import { useState } from "react";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="flex min-h-screen bg-slate-100">
      {isSidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          aria-label="Close navigation menu"
        />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={openSidebar} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default AppLayout;
