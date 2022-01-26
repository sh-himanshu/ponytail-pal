import { format, parse } from "date-fns";

import { PostState } from "../../features/posts/postsSlice";
import LegendCode, { ValueOf } from "../legend-code";
import Stars from "../stars";

interface FullPostProps {
  post: ValueOf<PostState>;
  date: string;
}

const FullPost = ({ post, date }: FullPostProps) => {
  return (
    <div className="h-[35rem] w-[100%] px-5 mx-auto  max-w-sm flex">
      <div className="flex flex-col bg-gray-50 rounded-md shadow-md overflow-hidden">
        <img
          src={post.media}
          alt={date}
          className="h-[23rem] object-cover object-center"
        />
        <div className="w-full p-4">
          <div className="flex mb-1">
            {post.typeofday && <LegendCode typeofday={post.typeofday} />}
            <div className="ml-auto">
              <Stars rating={post.rating} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold">
              {format(parse(date, "dd-MM-yyyy", new Date()), "dd MMMM")}
            </h3>
            <p className="text-gray-700 font-light line-clamp-3">{post.text}</p>
          </div>
        </div>

        <button className="mt-auto font-bold border-t text-center py-2 border-black">
          View Full Post
        </button>
      </div>
    </div>
  );
};

export default FullPost;
