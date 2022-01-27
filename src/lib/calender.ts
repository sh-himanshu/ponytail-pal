import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  addDays,
  subDays,
  subMonths,
  addMonths,
} from "date-fns";

export type CalendarMonth = Array<Array<Date>>;

export const WEEK = ["S", "M", "T", "W", "T", "F", "S"] as const;

const genCalendar = (start: Date, end: Date) => {
  const days = eachDayOfInterval({ start, end });

  const month: CalendarMonth = [];

  // divide days into weeks and push into month
  while (days.length !== 0) {
    month.push(days.splice(0, 7));
  }
  return month;
};

const prevCalendarDate = (date: Date, months: number = 1) =>
  startOfWeek(startOfMonth(subMonths(date, months)));

const nextCalendarDate = (date: Date, months: number = 1) =>
  endOfWeek(endOfMonth(addMonths(date, months)));

// 3 months calendar - (currentMonth - 1, currentMonth, currentMonth + 1)
export const defaultCalendar = (date = new Date()) =>
  genCalendar(prevCalendarDate(date), nextCalendarDate(date));

export const nextCalendar = (calendar: CalendarMonth) => {
  const lastDate = calendar[calendar.length - 1].slice(-1)[0];
  const startDate = addDays(lastDate, 1);
  const endDate = nextCalendarDate(startDate, 0);
  return [...calendar, ...genCalendar(startDate, endDate)];
};

export const prevCalendar = (calendar: CalendarMonth) => {
  const firstDate = calendar[0][0];
  const endDate = subDays(firstDate, 1);
  const startDate = prevCalendarDate(endDate, 0);
  return [...genCalendar(startDate, endDate), ...calendar];
};
