import type { Post as PostType } from "typings/post";

import PostContent from "components/PostContent";
import PostCover from "components/PostCover";

type Props = {
  post: PostType;
};

const Post: React.FC<Props> = ({ post }) => (
  <article className="prose dark:prose-invert normal-link">
    {post.coverImage && <PostCover coverImage={post.coverImage} />}
    <PostContent content={post.content!} />
  </article>
);

export default Post;
