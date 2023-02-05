import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import employees from "../data/employees.json";
import calendar from "../data/calendar.json";

export const Calendar = () => {
  const { data } = employees;
  const { data: days } = calendar;

  return (
    <Table sx={{ backgroundColor: "teal", width: "100%" }}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>Available days</TableCell>
          <TableCell>Calendar</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell sx={{ whiteSpace: "nowrap" }}>
              {employee.first_name} {employee.last_name}
            </TableCell>
            <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
              {employee.total_holidays}
            </TableCell>

            <TableCell
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {days.map((day, index) => (
                <div
                  key={day.date + index}
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: day.color,
                    borderRadius: "50%",
                  }}
                >
                  {day.date}
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
