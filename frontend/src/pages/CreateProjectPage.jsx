import { useState } from "react";

const initialProjectForm = {
  name: "",
  client: "",
  status: "Planning",
  deadline: "",
  budget: "",
  description: "",
};

function CreateProjectPage() {
  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (successMessage) {
      setSuccessMessage("");
    }

    if (errors[name]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };

        delete updatedErrors[name];

        return updatedErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessMessage("");

    const newErrors = {};

    if (!projectForm.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!projectForm.client.trim()) {
      newErrors.client = "Client name is required";
    }

    if (!projectForm.deadline) {
      newErrors.deadline = "Deadline is required";
    }

    if (!projectForm.budget || Number(projectForm.budget) <= 0) {
      newErrors.budget = "Budget must be greater than 0";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newProject = {
      ...projectForm,
      name: projectForm.name.trim(),
      client: projectForm.client.trim(),
      description: projectForm.description.trim(),
      budget: Number(projectForm.budget),
      progress: 0,
    };
    console.log(newProject);

    setSuccessMessage("Project created successfully.");
    setProjectForm(initialProjectForm);
    setErrors({});
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Create Project</h1>

      <p className="mt-2 text-slate-600">
        Add a new project and define its basic details.
      </p>

      {successMessage && (
        <p role="status" className="mt-6 text-sm font-medium text-emerald-700">
          {successMessage}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
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
              onChange={handleChange}
              placeholder="Enter project name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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

          <div className="sm:col-span-2">
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
              onChange={handleChange}
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

          <div className="sm:col-span-2">
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
              onChange={handleChange}
              placeholder="Enter project description"
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CreateProjectPage;
