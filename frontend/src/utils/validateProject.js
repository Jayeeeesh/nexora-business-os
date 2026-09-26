function validateProject(projectForm) {
  const errors = {};

  if (!projectForm.name.trim()) {
    errors.name = "Project name is required";
  }

  if (!projectForm.client.trim()) {
    errors.client = "Client name is required";
  }

  if (!projectForm.deadline) {
    errors.deadline = "Deadline is required";
  }

  if (!projectForm.budget || Number(projectForm.budget) <= 0) {
    errors.budget = "Budget must be greater than 0";
  }
  if (projectForm.progress !== undefined) {
    const progress = Number(projectForm.progress);

    if (
      projectForm.progress === "" ||
      Number.isNaN(progress) ||
      progress < 0 ||
      progress > 100
    ) {
      errors.progress = "Progress must be between 0 and 100";
    }
  }

  return errors;
}

export default validateProject;
