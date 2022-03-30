import type { Post } from "typings/post";
import PostPreview from "./PostPreview";

interface Props {
  posts: Post[];
}

const Posts: React.FC<Props> = ({ posts }) => (
  <section>
    {posts.map(({ title, date, slug, coverImage, excerpt }) => (
      <PostPreview
        key={slug}
        slug={slug!}
        title={title!}
        date={date}
        coverImage={coverImage}
        excerpt={excerpt}
      />
    ))}
  </section>
);

export default Posts;
