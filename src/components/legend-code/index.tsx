const LEGENDS = {
  "hair cut": ["Cu", "#faf1f5"],
  "protien treatment": ["Pr", "#e7f3f8"],
  "hair color": ["HC", "#faf1f5"],
  "deep conditioning": ["DC", "#edf3ec"],
  clarifying: ["C", "#fdebec"],
} as const;

export type TLegend = typeof LEGENDS;

export type ValueOf<T> = T[keyof T];

interface LegendCodeProps {
  typeofday: Array<keyof TLegend>;
}

const LegendCode = ({ typeofday }: LegendCodeProps) => (
  <div
    className={`${
      typeofday ? "flex" : "hidden"
    } items-center  justify-center space-x-1`}
  >
    {typeofday
      .reduce((final, current) => {
        const legend = LEGENDS[current];
        if (!legend) console.debug("UnknownLegend:", current);
        return legend ? [...final, legend] : final;
      }, [] as Array<ValueOf<TLegend>>)
      .map(([name, color], index) => (
        <div
          className="flex items-center justify-center p-0.5 md:p-1 rounded-full shadow-sm "
          style={{
            backgroundColor: color,
          }}
          key={`legend-${index}`}
        >
          <span className="block text-[0.5rem] leading-[0.7rem] md:text-xs tracking-wider">
            {name}
          </span>
        </div>
      ))}
  </div>
);

export default LegendCode;
