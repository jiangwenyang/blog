import Link from "next/link";
import DateFormatter from "./DateFormatter";

interface Props {
  title: string;
  date: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
}

const PostPreview: React.FC<Props> = ({
  title,
  date,
  slug,
  coverImage,
  excerpt,
}) => (
  <div>
    <h3 className="text-3xl mb-3 leading-snug">
      <Link href={`/posts/${slug}`}>
        <a className="hover:underline">{title}</a>
      </Link>
    </h3>
    <div className="text-lg mb-4">
      <DateFormatter dateString={date}></DateFormatter>
    </div>
    <div>{excerpt}</div>
  </div>
);

export default PostPreview;
