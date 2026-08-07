import { Link, useNavigate, useParams } from "react-router";
import useProjects from "../hooks/useProjects";
import { useState } from "react";
import useNotification from "../hooks/useNotification";
import ProjectForm from "../components/projects/ProjectForm";
import validateProject from "../utils/validateProject";

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

    const newErrors = validateProject(projectForm);

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
        <Link
          to="/projects"
          className="mt-4 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Back to Projects
        </Link>
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
