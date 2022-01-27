import {
  format,
  isFirstDayOfMonth,
  isSameMonth,
  isSunday,
  parse,
} from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts } from "../../features/posts/postsSlice";
import { openPopUp, setCurrentMonth } from "../../features/toggle/toggleSlice";
import {
  defaultCalendar,
  nextCalendar,
  prevCalendar,
} from "../../lib/calender";
import LegendCode from "../legend-code";
import Stars from "../stars";
import FirstDayofMonth from "./FirstDayofMonth";
import InfiniteScroll from "./InfiniteScroll";

const Calendar = () => {
  const dispatch = useAppDispatch();
  const [posts, currentMonth] = useAppSelector((state) => [
    state.posts,
    state.toggle.currentMonth,
  ]);

  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [calendar, setCalendar] = useState(defaultCalendar());
  const [selectedDay, setSelectedDay] = useState(currentMonth);
  const currentActiveMonth = parse(currentMonth, "dd-MM-yyyy", new Date());

  // fetch new posts while continuation token is not null
  useEffect(() => {
    if (Object.keys(posts).length === 0) {
      dispatch(fetchPosts({ token: null, setHasMorePosts }));
    } else {
      const lastPostDate = parse(
        Object.keys(posts).splice(-1)[0],
        "dd-MM-yyyy",
        new Date()
      );
      const lastCalendarDate = calendar[0][0];

      if (hasMorePosts && lastCalendarDate < lastPostDate) {
        dispatch(
          fetchPosts({
            token: {
              sorton: "calendardatetime",
              token: format(lastPostDate, "dd-MM-yyyy HH:mm:ss"),
            },
            setHasMorePosts,
          })
        );
      }
    }
  }, [calendar]);

  // scroll to Today on load
  const scrollRef = useCallback(
    () =>
      setTimeout(
        async () =>
          document?.getElementById("selected-date")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          }),
        100
      ),
    []
  );

  return (
    <InfiniteScroll
      onScrollTop={() => setCalendar(prevCalendar(calendar).slice(0, 30))}
      onScrollBottom={() => setCalendar(nextCalendar(calendar).slice(-30))}
      className="overflow-y-auto hide-scrollbar  w-full h-full"
    >
      <div ref={scrollRef}>
        {calendar.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="flex">
            {week.map((day) => {
              const dateStr = format(day, "dd-MM-yyyy");
              const isSeletedDate = selectedDay === dateStr;
              const dayStr = day.getDate().toString();

              const postData = posts[dateStr];

              return (
                <div
                  id={isSeletedDate ? "selected-date" : undefined}
                  data-date={dateStr}
                  key={`day_${format(day, "dd-MM")}`}
                  className={` align-text-top h-28 text-xs items-center md:p-1 lg:text-sm text-center flex flex-col border-gray-100 font-bold flex-1 overflow-hidden  ${
                    isSeletedDate
                      ? "bg-cyan-50 border-2 border-slate-700 rounded-sm"
                      : isSunday(day)
                      ? "bg-zinc-200 border"
                      : "border"
                  } ${
                    !isSameMonth(currentActiveMonth, day)
                      ? "text-gray-300 grayscale-[75%]"
                      : ""
                  }`}
                  onClick={() => !isSeletedDate && setSelectedDay(dateStr)}
                >
                  {isFirstDayOfMonth(day) ? (
                    <FirstDayofMonth
                      dayStr={dayStr}
                      monthStr={format(day, "MMM")}
                      onEntry={() => dispatch(setCurrentMonth(dateStr))}
                    />
                  ) : (
                    <div>{dayStr}</div>
                  )}

                  {postData && <Stars rating={postData.rating} />}

                  {postData?.media && (
                    <img
                      src={postData.media}
                      className="overflow-hidden object-center object-cover  w-full mb-1"
                      onClick={() => dispatch(openPopUp(dateStr))}
                      loading="lazy"
                    />
                  )}
                  {postData?.typeofday && (
                    <LegendCode typeofday={postData.typeofday} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Calendar;
