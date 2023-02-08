import { render, screen } from "@testing-library/react";
import { MonthCells, monthLabels } from "./MonthCells";

import calendarData from "../data/calendar.json";

test("renders", () => {
  const { data: days } = calendarData;
  render(<MonthCells days={days} />);
  monthLabels.forEach((month) => {
    expect(screen.getByText(month)).toBeInTheDocument();
  });
});
