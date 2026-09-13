import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, expect, test, vi } from "vitest";

import ProtectedRoute from "./ProtectedRoute";

const { mockUseAuth } = vi.hoisted(() => ({
  mockUseAuth: vi.fn(),
}));

vi.mock("../../hooks/useAuth", () => ({
  default: mockUseAuth,
}));

beforeEach(() => {
  mockUseAuth.mockReset();
});

test("shows loading state while authentication is being checked", () => {
  mockUseAuth.mockReturnValue({
    user: null,
    isLoading: true,
  });
  render(
    <MemoryRouter>
      <ProtectedRoute>
        <h1>Private Page</h1>
      </ProtectedRoute>
    </MemoryRouter>,
  );

  expect(screen.getByText("Checking authentication...")).toBeInTheDocument();
});

test("redirects to login when user is not authenticated", async () => {
  mockUseAuth.mockReturnValue({
    user: null,
    isLoading: false,
  });

  render(
    <MemoryRouter initialEntries={["/private"]}>
      <Routes>
        <Route
          path="/private"
          element={
            <ProtectedRoute>
              <h1>Private Page</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<h1>Login Test Page</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  expect(await screen.findByText("Login Test Page")).toBeInTheDocument();
});

test("renders protected content when user is authenticated", () => {
  mockUseAuth.mockReturnValue({
    user: {
      id: "123",
      name: "Jayesh",
    },
    isLoading: false,
  });

  render(
    <MemoryRouter>
      <ProtectedRoute>
        <h1>Private Page</h1>
      </ProtectedRoute>
    </MemoryRouter>,
  );

  expect(screen.getByText("Private Page")).toBeInTheDocument();
});
