import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-slate-900">404</h1>

      <p className="mt-3 text-slate-600">Page not found.</p>

      <Link
        to="/dashboard"
        className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-white"
      >
        Return to dashboard
      </Link>
    </main>
  );
}

export default NotFoundPage;