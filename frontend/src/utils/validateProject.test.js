import { expect, test } from "vitest";

import validateProject from "./validateProject";

const validProject = {
  name: "Test Project",
  client: "Test Client",
  deadline: "2026-10-10",
  budget: "100000",
};

test("accepts progress between 0 and 100", () => {
  const errors = validateProject({
    ...validProject,
    progress: 70,
  });

  expect(errors.progress).toBeUndefined();
});

test("rejects progress outside 0 and 100", () => {
  const belowZeroErrors = validateProject({
    ...validProject,
    progress: -1,
  });

  const aboveHundredErrors = validateProject({
    ...validProject,
    progress: 101,
  });

  expect(belowZeroErrors.progress).toBe("Progress must be between 0 and 100");

  expect(aboveHundredErrors.progress).toBe(
    "Progress must be between 0 and 100",
  );
});

test("does not require progress when it is not part of the form", () => {
  const errors = validateProject(validProject);

  expect(errors.progress).toBeUndefined();
});
