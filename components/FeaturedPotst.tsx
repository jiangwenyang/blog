import type { Post } from "typings/post";

import classNames from "classnames";
import Link from "next/link";
import DateFormatter from "./DateFormatter";

type Props = {
  post: Post;
  className?: string;
};

const FeaturedPost: React.FC<Props> = ({ post, className }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <a
        className={classNames(
          "p-1 bg-rose-400 rounded-lg transform hover:scale-105 transition-transform bg-gradient-to-r  from-rose-300 to-indigo-400 shadow-sm",
          className
        )}
      >
        <div className="flex flex-col justify-between h-full p-4 bg-white rounded-lg">
          <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 tracking-tight">
            {post.title}
          </h4>
          <DateFormatter
            dateString={post.date!}
            className="text-gray-500 text-sm"
          />
        </div>
      </a>
    </Link>
  );
};

export default FeaturedPost;
