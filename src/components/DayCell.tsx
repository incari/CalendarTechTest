import styled from "@emotion/styled";
import React from "react";
import { RequestDay } from "../types/types";
//    data-testid={`day-${employee.id}-${day.date}`}

type Props = RequestDay & { isDayOff: boolean };

const DayStyled = styled("div")(({ employee, day, isDayOff }: Props) => ({
  width: "20px",
  height: "20px",
  cursor: day.dayTypeId === "" ? "pointer" : "not-allowed",
  backgroundColor: isDayOff ? "green" : day.color,
  borderRadius: day.dayTypeId === "" ? "" : "50%",
  border: day.dayTypeId === "" ? "1px solid black" : "",
}));

const getDate = (date: number) => {
  const stringifyDate = date.toString();

  const year = stringifyDate.slice(0, 4);
  const month = stringifyDate.slice(4, 6);
  const day = stringifyDate.slice(6, 8);

  return { year, month, day };
};

const DayCell = ({ employee, day, isDayOff }: any) => (
  <DayStyled
    data-testid={`day-${employee.id}-${day.date}`}
    employee={employee}
    day={day}
    isDayOff={isDayOff}
  >
    {getDate(day.date).day}
  </DayStyled>
);

export { DayCell };
