// make tests for Calendar.tsx
import { render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders", () => {
    render(<Calendar />);
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });
});
