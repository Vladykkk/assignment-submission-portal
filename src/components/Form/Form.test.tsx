import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useRouter } from "next/navigation";

import Form from "./Form";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Form Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedAxios.get.mockResolvedValue({
      data: {
        levels: ["Junior", "Middle", "Senior", "Principal"],
      },
    });

    mockedAxios.post.mockResolvedValue({ data: { status: "success" } });
  });

  test("submits form with correct data and redirects", async () => {
    const user = userEvent.setup();
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    render(<Form />);

    await waitFor(() => {
      const select = screen.getByLabelText(/candidate level/i);
      expect(select.querySelectorAll("option").length).toBe(5);
    });

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/description/i), "Test assignment");
    await user.type(
      screen.getByLabelText(/github/i),
      "https://github.com/john/repo",
    );

    await user.selectOptions(
      screen.getByLabelText(/candidate level/i),
      "Junior",
    );

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("/thank-you"),
    );
  });
});
