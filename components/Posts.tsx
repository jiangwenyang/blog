import type { Post } from "typings/post";
import PostPreview from "./PostPreview";
import HeadTitle from "./HeadTitle";

interface Props {
  posts: Post[];
  title: String;
}

const Posts: React.FC<Props> = ({ posts, title }) => (
  <section>
    <HeadTitle>{title}</HeadTitle>
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
