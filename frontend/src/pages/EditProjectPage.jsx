import { useParams, useNavigate } from "react-router";
import useProjects from "../hooks/useProjects";
import { useState } from "react";
import useNotification from "../hooks/useNotification";
import ProjectForm from "../components/projects/ProjectForm";

function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { projects, updateProject } = useProjects();
  const { showNotification } = useNotification();

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
    showNotification("Project updated successfully.");
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
      <ProjectForm
        projectForm={projectForm}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />

      <p className="mt-2 text-slate-600">
        Update the selected project details.
      </p>
    </section>
  );
}

export default EditProjectPage;
