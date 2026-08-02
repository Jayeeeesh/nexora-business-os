function StatCard({ label, value, trend, icon: Icon }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{trend}</p>
    </article>
  );
}

export default StatCard;
