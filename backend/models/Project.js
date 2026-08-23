const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    client: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "On Hold", "Completed"],
      default: "Planning",
    },
    deadline: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 1,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
