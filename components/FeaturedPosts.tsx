import type { Post } from "typings/post";

import FeaturedPotst from "./FeaturedPotst";
import HeadTitle from "./HeadTitle";

interface Props {
  posts: Post[];
}

const FeaturedPosts: React.FC<Props> = ({ posts }) => (
  <section>
    <HeadTitle>Featured Posts</HeadTitle>
    <div className="flex flex-col gap-6 md:flex-row justify-between">
      {posts.map((post) => (
        <FeaturedPotst
          key={post.slug}
          post={post}
          className="w-full min-h-[100px] md:w-1/4"
        />
      ))}
    </div>
  </section>
);

export default FeaturedPosts;
