import { tr } from "date-fns/locale";
import { monthGen } from "../../lib/calender";

const Calendar = () => {
  const currentDate = new Date();
  const monthGenerator = monthGen(currentDate);
  const firstMonth = monthGenerator();

  return (
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thr</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        {firstMonth.map((week, weekIndex) => (
          <tr key={`week-${weekIndex}`}>
            {week.map((day) => {
              const dateNum = day.getDate();
              return (
                <td key={`day-${dateNum}`} className="p-2 text-center border-2">
                  {dateNum}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
