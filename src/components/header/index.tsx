import { BiArrowBack } from "react-icons/bi";
import { WEEK } from "../../lib/calender";

const Header = () => {
  return (
    <header className="w-full flex flex-col justify-center shadow-md">
      <div className="flex py-4 font-semibold text-gray-700 text-lg items-center">
        <BiArrowBack className="basis-1/6 h-6 w-6 text-black" />
        <div>
          <span className="mr-1 text-cyan-500">my</span>hair diary
        </div>
        <div className="ml-auto mr-5 lg:mr-10">
          Jan<span className="font-[400] ml-1">2021</span>
        </div>
      </div>
      <div className="p-1 w-full flex text-center">
        {WEEK.map((weekName, weekNameIndex) => (
          <div
            key={`weekName-${weekNameIndex}`}
            className="flex-1 font-semibold text-sm lg:text-md"
          >
            {weekName}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
