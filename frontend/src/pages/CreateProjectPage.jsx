import { useState } from "react";
import useProjects from "../hooks/useProjects";
import useNotification from "../hooks/useNotification";
import { useNavigate } from "react-router";
import ProjectForm from "../components/projects/ProjectForm";
import validateProject from "../utils/validateProject";

const initialProjectForm = {
  name: "",
  client: "",
  status: "Planning",
  deadline: "",
  budget: "",
  description: "",
};

function CreateProjectPage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { addProject } = useProjects();
  const [projectForm, setProjectForm] = useState(initialProjectForm);

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

    const newErrors = validateProject(projectForm);

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
    addProject(newProject);
    showNotification("Project created successfully.");
    navigate("/projects");

    setProjectForm(initialProjectForm);
    setErrors({});
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Create Project</h1>

      <p className="mt-2 text-slate-600">
        Add a new project and define its basic details.
      </p>

      <ProjectForm
        projectForm={projectForm}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Create Project"
      />
    </section>
  );
}

export default CreateProjectPage;
