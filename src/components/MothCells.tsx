import { TableCell } from "@mui/material";
import React from "react";
import { Days } from "../types/types";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthCells = ({ days }: { days: Array<Days> }) => {
  // return the number of days of each month
  const monthDays = days.reduce((acc, day) => {
    const month = day.date.toString().slice(4, 6);
    if (acc[month]) {
      acc[month] += 1;
    } else {
      acc[month] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  return (
    <>
      {Object.keys(monthDays).map((month) => {
        return (
          <TableCell key={month} colSpan={monthDays[month]}>
            {monthLabels[Number(month) - 1]}
          </TableCell>
        );
      })}
    </>
  );
};

export { MonthCells };
