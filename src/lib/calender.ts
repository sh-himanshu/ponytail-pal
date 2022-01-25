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

const prevCalendarDate = (date: Date) => startOfWeek(startOfMonth(date));

const nextCalendarDate = (date: Date) => endOfWeek(endOfMonth(date));

export const currentCalendar = (date = new Date()) => {
  const startDate = prevCalendarDate(subMonths(date, 2));
  const endDate = nextCalendarDate(addMonths(date, 2));
  return genCalendar(startDate, endDate);
};

export const nextCalendar = (calendar: CalendarMonth) => {
  const lastDate = calendar[calendar.length - 1].slice(-1)[0];
  const startDate = addDays(lastDate, 1);
  const endDate = nextCalendarDate(startDate);
  return [...calendar, ...genCalendar(startDate, endDate)];
};

export const prevCalendar = (calendar: CalendarMonth) => {
  const firstDate = calendar[0][0];
  const endDate = subDays(firstDate, 1);
  const startDate = prevCalendarDate(endDate);
  return [...genCalendar(startDate, endDate), ...calendar];
};
