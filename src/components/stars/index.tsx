import { AiFillStar } from "react-icons/ai";

interface StarProps {
  rating: 0 | 1 | 2 | 3 | 4 | 5;
}

const Stars = ({ rating }: StarProps) => {
  return (
    <div className="flex  md:space-x-1 items-center justify-center">
      {[...Array(rating)].map((_, index) => (
        <AiFillStar
          key={`star-filled-${index}`}
          className="text-blue-300 h-[0.6rem] "
        />
      ))}
      {[...Array(5 - rating)].map((_, index) => (
        <AiFillStar
          key={`star-empty-${index}`}
          className="h-[0.6rem] text-gray-400  "
        />
      ))}
    </div>
  );
};

export default Stars;
