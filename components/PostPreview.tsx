import type { CoverImage } from "typings/post";
import Link from "next/link";
import DateFormatter from "./DateFormatter";

interface Props {
  title: string;
  slug: string;
  date?: string;
  excerpt?: string;
}

const PostPreview: React.FC<Props> = ({ title, date, slug, excerpt }) => (
  <div className="mb-6">
    <Link href={`/posts/${slug}`}>
      <a>
        <div className="flex flex-col md:flex-row justify-between mb-2">
          <h4 className="text-lg font-medium text-gray-900 md:text-xl">
            {title}
          </h4>
          <DateFormatter
            dateString={date!}
            formatString="yyyy年MM月dd日"
            className="md:w-36 text-gray-500 text-base"
          />
        </div>
        {excerpt && (
          <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-3">
            {excerpt}
          </p>
        )}
      </a>
    </Link>
  </div>
);

export default PostPreview;
