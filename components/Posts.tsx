import type { Post } from "typings/post";
import PostPreview from "./PostPreview";

interface Props {
  posts: Post[];
}

const Posts: React.FC<Props> = ({ posts }) => (
  <>
    {posts.map(({ title, date, slug, coverImage, excerpt }) => (
      <PostPreview
        key={slug}
        title={title}
        date={date}
        slug={slug}
        coverImage={coverImage}
        excerpt={excerpt}
      />
    ))}
  </>
);

export default Posts;
