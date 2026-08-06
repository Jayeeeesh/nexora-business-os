function ProjectForm({ projectForm, errors, onChange, onSubmit, submitLabel }) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mt-8 max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Project Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={projectForm.name}
          onChange={onChange}
          placeholder="Enter project name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="client"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Client Name
        </label>

        <input
          id="client"
          name="client"
          type="text"
          value={projectForm.client}
          onChange={onChange}
          placeholder="Enter client name"
          aria-invalid={Boolean(errors.client)}
          aria-describedby={errors.client ? "client-error" : undefined}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {errors.client && (
          <p
            id="client-error"
            role="alert"
            className="mt-1 text-sm text-red-600"
          >
            {errors.client}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          value={projectForm.status}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="deadline"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Deadline
        </label>

        <input
          id="deadline"
          name="deadline"
          type="date"
          value={projectForm.deadline}
          onChange={onChange}
          aria-invalid={Boolean(errors.deadline)}
          aria-describedby={errors.deadline ? "deadline-error" : undefined}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {errors.deadline && (
          <p
            id="deadline-error"
            role="alert"
            className="mt-1 text-sm text-red-600"
          >
            {errors.deadline}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="budget"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Budget
        </label>

        <input
          id="budget"
          name="budget"
          type="number"
          min="1"
          value={projectForm.budget}
          onChange={onChange}
          placeholder="Enter project budget"
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={errors.budget ? "budget-error" : undefined}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {errors.budget && (
          <p
            id="budget-error"
            role="alert"
            className="mt-1 text-sm text-red-600"
          >
            {errors.budget}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows="4"
          value={projectForm.description}
          onChange={onChange}
          placeholder="Enter project description"
          className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default ProjectForm;
