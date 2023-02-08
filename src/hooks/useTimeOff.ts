import { Days, RequestDay, RequestedDay } from "../types/types";

import employeesData from "../data/employees.json";
import calendarData from "../data/calendar.json";
import { useLocalStorage } from "./useLocalStorage";

const useTimeOff = () => {
  const [selectedDays, setDaysOff] = useLocalStorage<RequestedDay | null>(
    "requestedDays",
    null
  );

  const { data: employees } = employeesData;
  const { data: days } = calendarData;

  const requestTimeOff = ({ employee, day }: RequestDay) => {
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

          setDaysOff({
            ...selectedDays,
            [employee.id]: filteredDaysOff,
          });
        } else {
          const availableDays =
            employees.find((emp) => emp.id === employee.id)?.total_holidays ??
            0;

          if (daysOff.length >= availableDays) return;
          setDaysOff({
            ...selectedDays,
            [employee.id]: [...daysOff, day],
          });
        }
      }

      if (!daysOff) {
        setDaysOff({
          ...selectedDays,
          [employee.id]: [day],
        });
      }
    } else {
      setDaysOff(requestedDay);
    }
  };

  const checkDayOff = ({ employee, day }: RequestDay) => {
    if (selectedDays) {
      const employeeDaysOff = selectedDays[employee.id];
      if (employeeDaysOff) {
        const isDayOff = employeeDaysOff.find(
          (dayOff) => dayOff.date === day.date
        );
        if (isDayOff) {
          return true;
        }
      }
    }
    return false;
  };
  return { selectedDays, requestTimeOff, days, employees, checkDayOff };
};

export { useTimeOff };
