import { useParams, useNavigate } from "react-router";
import useProjects from "../hooks/useProjects";
import { useState } from "react";

function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { projects, updateProject } = useProjects();

  const project = projects.find((item) => String(item.id) === projectId);

  const [projectForm, setProjectForm] = useState({
    name: project?.name ?? "",
    client: project?.client ?? "",
    status: project?.status ?? "Planning",
    deadline: project?.deadline ?? "",
    budget: project?.budget ?? "",
    description: project?.description ?? "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));

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

    if (!project) {
      return;
    }

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

    const updatedData = {
      ...projectForm,
      name: projectForm.name.trim(),
      client: projectForm.client.trim(),
      description: projectForm.description.trim(),
      budget: Number(projectForm.budget),
    };

    updateProject(project.id, updatedData);
    navigate("/projects");
  };

  if (!project) {
    return (
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Project Not Found</h1>

        <p className="mt-2 text-slate-600">
          The requested project does not exist.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Edit Project</h1>
      <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-2xl">
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
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}

        <label
          htmlFor="client"
          className="mb-2 mt-5 block text-sm font-medium text-slate-700"
        >
          Client Name
        </label>

        <input
          id="client"
          name="client"
          type="text"
          value={projectForm.client}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          aria-invalid={Boolean(errors.client)}
          aria-describedby={errors.client ? "client-error" : undefined}
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

        <label
          htmlFor="status"
          className="mb-2 mt-5 block text-sm font-medium text-slate-700"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          value={projectForm.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
        </select>

        <label
          htmlFor="deadline"
          className="mb-2 mt-5 block text-sm font-medium text-slate-700"
        >
          Deadline
        </label>

        <input
          id="deadline"
          name="deadline"
          type="date"
          value={projectForm.deadline}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          aria-invalid={Boolean(errors.deadline)}
          aria-describedby={errors.deadline ? "deadline-error" : undefined}
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

        <label
          htmlFor="budget"
          className="mb-2 mt-5 block text-sm font-medium text-slate-700"
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
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={errors.budget ? "budget-error" : undefined}
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

        <label
          htmlFor="description"
          className="mb-2 mt-5 block text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows="4"
          value={projectForm.description}
          onChange={handleChange}
          className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3"
        />

        <button
          type="submit"
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Save Changes
        </button>
      </form>

      <p className="mt-2 text-slate-600">
        Update the selected project details.
      </p>
    </section>
  );
}

export default EditProjectPage;
