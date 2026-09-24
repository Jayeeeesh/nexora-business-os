import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import DashboardPage from "./DashboardPage";

const { mockProjects } = vi.hoisted(() => ({
  mockProjects: [],
}));

vi.mock("../hooks/useProjects", () => ({
  default: () => ({
    projects: mockProjects,
  }),
}));

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-24T12:00:00"));
  mockProjects.length = 0;
});

afterEach(() => {
  vi.useRealTimers();
});

test("calculates dashboard metrics from projects", () => {
  mockProjects.push(
    {
      id: "1",
      name: "Project A",
      client: "Client A",
      status: "In Progress",
      priority: "High",
      deadline: "2026-09-20",
      createdAt: "2026-09-24T10:00:00Z",
      progress: 50,
    },
    {
      id: "2",
      name: "Project B",
      client: "Client B",
      status: "Completed",
      priority: "Medium",
      deadline: "2026-09-10",
      createdAt: "2026-09-23T10:00:00Z",
      progress: 100,
    },
    {
      id: "3",
      name: "Project C",
      client: "Client C",
      status: "Planning",
      priority: "High",
      deadline: "2026-09-30",
      createdAt: "2026-09-22T10:00:00Z",
      progress: 10,
    },
  );

  render(<DashboardPage />);

  const activeCard = screen.getByText("Active Projects").closest("article");
  const completedCard = screen
    .getByText("Completed Projects")
    .closest("article");
  const highPriorityCard = screen
    .getByText("High Priority Projects")
    .closest("article");
  const overdueCard = screen.getByText("Overdue Projects").closest("article");

  expect(within(activeCard).getByText("1")).toBeInTheDocument();
  expect(within(completedCard).getByText("1")).toBeInTheDocument();
  expect(within(highPriorityCard).getByText("2")).toBeInTheDocument();
  expect(within(overdueCard).getByText("1")).toBeInTheDocument();
});
