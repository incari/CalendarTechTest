import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import employees from "../data/employees.json";
import calendar from "../data/calendar.json";
import { useEffect, useState } from "react";

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  total_holidays: number;
};

type Days = {
  date: number;
  dayTypeId: string;
  dayType: string;
  color: string;
};
const getDate = (date: number) => {
  const stringifyDate = date.toString();

  const year = stringifyDate.slice(0, 4);
  const month = stringifyDate.slice(4, 6);
  const day = stringifyDate.slice(6, 8);

  return { year, month, day };
};

export const Calendar = () => {
  const { data } = employees;
  const { data: days } = calendar;
  const [selectedDays, setSelectedDays] = useState<
    Record<number, Days[]> | undefined
  >(undefined);

  const handleClick = ({
    employee,
    day,
  }: {
    employee: Employee;
    day: Days;
  }) => {
    const requestedDay: Record<number, Days[]> = {
      [employee.id]: [day],
    };
    if (day.dayTypeId !== "") return;

    if (selectedDays) {
      const daysOff = selectedDays[employee.id];

      if (daysOff) {
        const isDayOff = daysOff.find((dayOff) => dayOff.date === day.date);
        if (isDayOff) {
          const filteredDaysOff = daysOff.filter(
            (dayOff) => dayOff.date !== day.date
          );

          setSelectedDays({
            ...selectedDays,
            [employee.id]: filteredDaysOff,
          });
        } else {
          const availableDays =
            data.find((emp) => emp.id === employee.id)?.total_holidays ?? 0;

          if (daysOff.length >= availableDays) return;
          setSelectedDays({
            ...selectedDays,
            [employee.id]: [...daysOff, day],
          });
        }
      }

      if (!daysOff) {
        setSelectedDays({
          ...selectedDays,
          [employee.id]: [day],
        });
      }
    } else {
      setSelectedDays(requestedDay);
    }
  };

  const isDayOff = (employee: Employee, day: Days) => {
    if (selectedDays) {
      const daysOff = selectedDays[employee.id];
      if (daysOff) {
        const isDayOff = daysOff.find((dayOff) => dayOff.date === day.date);
        if (isDayOff) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    console.log(selectedDays);
  }, [selectedDays]);

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

            <TableCell align="center" colSpan={31}>
              January
            </TableCell>
            <TableCell align="center" colSpan={28}>
              February
            </TableCell>
            <TableCell align="center" colSpan={31}>
              March
            </TableCell>
            <TableCell align="center" colSpan={30}>
              April
            </TableCell>
            <TableCell align="center" colSpan={31}>
              May
            </TableCell>
            <TableCell align="center" colSpan={30}>
              June
            </TableCell>
            <TableCell align="center" colSpan={31}>
              July
            </TableCell>
            <TableCell align="center" colSpan={31}>
              August
            </TableCell>
            <TableCell align="center" colSpan={30}>
              September
            </TableCell>
            <TableCell align="center" colSpan={31}>
              October
            </TableCell>
            <TableCell align="center" colSpan={30}>
              November
            </TableCell>
            <TableCell align="center" colSpan={31}>
              December
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((employee) => (
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
                  (selectedDays?.[employee.id]?.length ?? 0)}
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
                      backgroundColor: isDayOff(employee, day)
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
