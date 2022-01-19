import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  addDays,
  startOfDay,
} from "date-fns";

const selectedDate = new Date();

const startDate = startOfWeek(startOfMonth(selectedDate));
const endDate = endOfWeek(endOfMonth(selectedDate));

export const weekGen = (start = new Date()) => {
  let date = startOfWeek(startOfDay(start));
  return () => {
    const week = [...Array(7)].map((_, i) => addDays(date, i));
    date = addDays(week[6], 1);
    return week;
  };
};

export const monthGen = (start = new Date()) => {
  let month: Array<Array<Date>> = [];
  let date = start;

  const lastDayOfRange = <T>(range: Array<Array<T>>) =>
    range[range.length - 1][6];

  return () => {
    const weekGenerator = weekGen(startOfMonth(date));
    const endDate = startOfDay(endOfWeek(endOfMonth(date)));
    month.push(weekGenerator());

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGenerator());
    }

    const range = month;
    month = [];
    date = addDays(lastDayOfRange(range), 1);

    return range;
  };
};
