import { render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";

const mockUseTimeOff = jest.fn();

jest.mock("../hooks/useTimeOff", () => ({
  ...jest.requireActual("../hooks/useTimeOff"),
  // useTimeOff: () => mockUseTimeOff(),
}));

describe("Calendar", () => {
  it("renders", () => {
    render(<Calendar />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Available days")).toBeInTheDocument();

    const day1 = screen.getByTestId("day-1-20210101");
    expect(day1).toBeInTheDocument();

    const day4 = screen.getByTestId("day-4-20210101");
    expect(day4).toBeInTheDocument();

    day1.click();
    expect(mockUseTimeOff).toHaveBeenCalledTimes(0);

    day4.click();
    expect(mockUseTimeOff).toHaveBeenCalledTimes(0);
  });
});
