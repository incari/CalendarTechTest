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

type RequestDay = {
  employee: Employee;
  day: Days;
};

type RequestedDay = Record<number, Days[]> | null;

export type { Employee, Days, RequestDay, RequestedDay };
