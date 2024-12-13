import { render, screen } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";

import ThankYouPage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(),
}));

describe("Thank You Page", () => {
  test("displays correct submission data", () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => {
        const data = {
          name: "John Doe",
          email: "john@example.com",
          description: "This is my test task",
          github_repo_url: "https://github.com/john/repo",
          candidate_level: "Middle",
        };
        return data[param as keyof typeof data];
      },
    }));

    render(<ThankYouPage />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("This is my test task")).toBeInTheDocument();
    expect(
      screen.getByText("https://github.com/john/repo"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Middle/)).toBeInTheDocument();
  });

  test("redirects when no data is present", () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: () => null,
    }));

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    render(<ThankYouPage />);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
