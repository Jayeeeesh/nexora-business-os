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

  return errors;
}

export default validateProject;
