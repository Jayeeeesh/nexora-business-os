const express = require("express");
const {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const routes = express.Router();

routes.get("/", getProjects);

routes.post("/", createProject);

routes.get("/:projectId", getProjectById);

routes.patch("/:projectId", updateProject);

routes.delete("/:projectId", deleteProject);

module.exports = routes;
