import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, expect, test, vi } from "vitest";

import LoginPage from "./LoginPage";

const { mockLogin } = vi.hoisted(() => ({
  mockLogin: vi.fn(),
}));

vi.mock("../hooks/useAuth", () => ({
  default: () => ({
    login: mockLogin,
  }),
}));

beforeEach(() => {
  mockLogin.mockReset();
  mockLogin.mockResolvedValue({});
});

test("renders the login form", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});

test("submits email and password to login", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );

  await user.type(screen.getByLabelText(/email/i), "test@nexora.com");

  await user.type(screen.getByLabelText(/password/i), "password123");

  await user.click(screen.getByRole("button", { name: /sign in/i }));

  expect(mockLogin).toHaveBeenCalledWith({
    email: "test@nexora.com",
    password: "password123",
  });
});

test("shows an error when login fails", async () => {
  mockLogin.mockRejectedValueOnce(new Error("Invalid email or password"));

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );

  await user.type(screen.getByLabelText(/email/i), "test@nexora.com");

  await user.type(screen.getByLabelText(/password/i), "wrongpassword");

  await user.click(screen.getByRole("button", { name: /sign in/i }));

  expect(
    await screen.findByText("Invalid email or password"),
  ).toBeInTheDocument();
});

test("navigates to dashboard after successful login", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<h1>Dashboard Test Page</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  await user.type(screen.getByLabelText(/email/i), "test@nexora.com");
  await user.type(screen.getByLabelText(/password/i), "password123");

  await user.click(screen.getByRole("button", { name: /sign in/i }));

  expect(await screen.findByText("Dashboard Test Page")).toBeInTheDocument();
});
