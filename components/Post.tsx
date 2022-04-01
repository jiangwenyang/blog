import type { Post as PostType } from "typings/post";

import PostContent from "components/PostContent";
import PostMeta from "components/PostMeta";
import PostCover from "components/PostCover";

type Props = {
  post: PostType;
};

const Post: React.FC<Props> = ({ post }) => (
  <article className="prose dark:prose-invert">
    <h1>{post.title}</h1>
    <PostMeta words={post.words!} minutes={post.minutes!} date={post.date!} />
    {post.coverImage && <PostCover coverImage={post.coverImage} />}
    <PostContent content={post.content!} />
  </article>
);

export default Post;
