import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Post } from "typings/post";
import type { NextPageWithLayout } from "typings/app";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostLayout from "components/PostLayout";
import PostContent from "components/PostContent";
import { getPostBySlug, getAllPosts } from "utils/posts";
import initGitalk from "utils/gitTalk";
import markdownToHtml from "utils/markdownToHtml";

import "prism-themes/themes/prism-atom-dark.min.css";
import "gitalk/dist/gitalk.css";
import { useEffect } from "react";

interface Props {
  post: Post;
}

const Post: NextPageWithLayout<Props> = ({ post }) => {
  const router = useRouter();

  useEffect(() => {
    initGitalk("gitalk-container", post.slug);
  }, [post.slug]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <article className="prose prose-slate">
        <PostContent content={post.content}></PostContent>
      </article>
      <div id="gitalk-container"></div>
    </>
  );
};

Post.getLayout = function getLayout(page: React.ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const post = getPostBySlug(params!.slug, [
    "title",
    "date",
    "slug",
    "content",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Post;
