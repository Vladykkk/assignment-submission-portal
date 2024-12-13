import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import Form from "./Form";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("Candidate Levels Fetching", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("successfully fetches and displays levels", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        levels: ["Junior", "Middle", "Senior", "Principal"],
      },
    });

    render(<Form />);

    await waitFor(
      async () => {
        const select = screen.getByRole("combobox");
        return select.children.length === 5;
      },
      { timeout: 3000 },
    );

    const select = screen.getByRole("combobox");
    const options = Array.from(select.children);

    expect(select.children.length).toBe(5);
    expect(options[0]).toHaveTextContent("Select a level");
    expect(options[1]).toHaveTextContent("Junior");
    expect(options[2]).toHaveTextContent("Middle");
    expect(options[3]).toHaveTextContent("Senior");
    expect(options[4]).toHaveTextContent("Principal");
  });

  test("handles API error gracefully", async () => {
    mockedAxios.get.mockRejectedValue({
      response: { data: { message: "An unexpected error occurred" } },
    });

    render(<Form />);

    await waitFor(() => {
      expect(
        screen.getByText("An unexpected error occurred"),
      ).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /loading/i });
    expect(submitButton).toBeDisabled();
  });
});
