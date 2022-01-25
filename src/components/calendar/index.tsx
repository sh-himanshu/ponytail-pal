import { format, isFirstDayOfMonth, isSunday, isToday, parse } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts } from "../../features/posts/postsSlice";
import { setLoading } from "../../features/toggle/toggleSlice";
import { openPopUp } from "../../features/toggle/toggleSlice";
import {
  currentCalendar,
  nextCalendar,
  prevCalendar,
} from "../../lib/calender";
import LegendCode from "../legend-code";
import Stars from "../stars";

const Calendar = () => {
  const isLoading = useAppSelector(({ toggle }) => toggle.isLoading);
  const setIsLoading = (value: boolean) => dispatch(setLoading(value));

  const [hasMorePosts, setHasMorePosts] = useState(true);

  const scrollArea = useRef<HTMLTableSectionElement | null>(null);
  const scrollAreaRef = useCallback(
    (node: HTMLTableSectionElement) => {
      if (node) {
        scrollArea.current = node;

        document.getElementById("today")?.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });

        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    },
    [scrollArea]
  );

  const [calendar, setCalendar] = useState(currentCalendar());

  const [topRef, topInView] = useInView({
    threshold: 0,
  });
  const [bottomRef, bottomInView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (isLoading || (!topInView && !bottomInView)) return;
    setIsLoading(true);

    if (topInView) {
      setCalendar(prevCalendar(calendar).slice(0, 40));
      scrollArea.current?.scrollBy(0, 10);
    }

    if (bottomInView) {
      setCalendar(nextCalendar(calendar).slice(-40));
      scrollArea.current?.scrollBy(0, -10);
    }
    setIsLoading(false);
  }, [topInView, bottomInView]);

  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (Object.keys(posts).length === 0) {
      dispatch(fetchPosts({ token: null, setHasMorePosts }));
      console.log("FETCH/posts");
    } else {
      const lastPostDate = parse(
        Object.keys(posts).splice(-1)[0],
        "dd-MM-yyyy",
        new Date()
      );
      const lastCalendarDate = calendar[0][0];
      console.log(hasMorePosts);
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

  return (
    <div
      ref={scrollAreaRef}
      className="flex flex-col w-full h-full overflow-y-auto scroll-smooth hide-scrollbar "
    >
      <div ref={topRef} className="h-8 w-full "></div>

      {calendar.map((week, weekIndex) => (
        <div key={`week-${weekIndex}`} className="flex">
          {week.map((day) => {
            const today = isToday(day);
            const dayStr = day.getDate().toString();
            const postData = posts[format(day, "dd-MM-yyyy")];

            return (
              <div
                id={today ? "today" : undefined}
                key={`day_${format(day, "dd-MM")}`}
                className={` align-text-top h-28 text-xs items-center md:p-1 lg:text-sm text-center flex flex-col border-gray-100 font-bold flex-1 overflow-hidden ${
                  today
                    ? "bg-cyan-50 border-2 border-slate-700 rounded-sm"
                    : isSunday(day)
                    ? "bg-zinc-200 border"
                    : "border"
                } `}
              >
                {isFirstDayOfMonth(day) ? (
                  <div className="flex w-full justify-center">
                    <span>{dayStr}</span>
                    <span className="text-slate-400 ml-2 ">
                      {format(day, "MMM")}
                    </span>
                  </div>
                ) : (
                  <div>{dayStr}</div>
                )}

                {postData && <Stars rating={postData.rating} />}

                {postData?.media && (
                  <img
                    src={postData.media}
                    className="overflow-hidden object-center object-cover  w-full mb-1"
                    onClick={() =>
                      dispatch(openPopUp(format(day, "dd-MM-yyyy")))
                    }
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

      <div ref={bottomRef} className="h-8 w-full"></div>
    </div>
  );
};

export default Calendar;
