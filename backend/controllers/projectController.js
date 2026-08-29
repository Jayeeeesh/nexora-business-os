const mongoose = require("mongoose");
const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json(project);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};

      Object.values(error.errors).forEach((validationError) => {
        validationErrors[validationError.path] = validationError.message;
      });

      return res.status(400).json({
        message: "Project validation failed",
        errors: validationErrors,
      });
    }
    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.owner;
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }
    const updatedProject = await Project.findOneAndUpdate(
      {
        _id: projectId,
        owner: req.user.id,
      },
      {
        $set: updates,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.json(updatedProject);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};

      Object.values(error.errors).forEach((validationError) => {
        validationErrors[validationError.path] = validationError.message;
      });

      return res.status(400).json({
        message: "Project validation failed",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const deletedProject = await Project.findOneAndDelete({
      _id: projectId,
      owner: req.user.id,
    });

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};
