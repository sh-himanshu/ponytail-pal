import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface FirstDayofMonthProps {
  dayStr: string;
  monthStr: string;
  onEntry: () => void;
}

const FirstDayofMonth = ({
  dayStr,
  monthStr,
  onEntry,
}: FirstDayofMonthProps) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    inView && onEntry();
  }, [inView]);

  return (
    <div ref={ref} className="flex w-full justify-center">
      <span>{dayStr}</span>
      <span className="text-slate-400 ml-2">{monthStr}</span>
    </div>
  );
};

export default FirstDayofMonth;
