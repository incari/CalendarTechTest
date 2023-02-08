import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { useTimeOff } from "../hooks/useTimeOff";
import { RequestDay } from "../types/types";
import { MonthCells } from "./MothCells";

const getDate = (date: number) => {
  const stringifyDate = date.toString();

  const year = stringifyDate.slice(0, 4);
  const month = stringifyDate.slice(4, 6);
  const day = stringifyDate.slice(6, 8);

  return { year, month, day };
};

export const Calendar = () => {
  const {
    selectedDays: daysOff,
    requestTimeOff,
    checkDayOff,
    days,
    employees,
  } = useTimeOff();

  const handleClick = ({ employee, day }: RequestDay) => {
    if (day.dayTypeId === "") {
      requestTimeOff({ employee, day });
    }
  };

  return (
    <TableContainer style={{ maxWidth: "100%", border: "1px solid black" }}>
      <Table sx={{ backgroundColor: "teal", width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ position: "sticky", left: 0, background: "cadetblue" }}
            >
              Name
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap" }}>Available days</TableCell>

            <MonthCells days={days} />
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  position: "sticky",
                  left: 0,
                  background: "cadetblue",
                }}
              >
                {employee.first_name} {employee.last_name}
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
                {employee.total_holidays -
                  (daysOff?.[employee.id]?.length ?? 0)}
              </TableCell>

              {days.map((day, index) => (
                <TableCell
                  key={day.date + index}
                  sx={{ padding: 0 }}
                  onClick={() => handleClick({ employee, day })}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: day.dayTypeId === "" ? "pointer" : "not-allowed",
                      backgroundColor: checkDayOff({ employee, day })
                        ? "green"
                        : day.color,
                      borderRadius: day.dayTypeId === "" ? "" : "50%",
                      border: day.dayTypeId === "" ? "1px solid black" : "",
                    }}
                  >
                    {getDate(day.date).day}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
