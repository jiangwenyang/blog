import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Post } from "typings/post";
import type { NextPageWithLayout } from "typings/app";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { useEffect } from "react";

import PostLayout from "components/PostLayout";
import PostContent from "components/PostContent";
import PostMeta from "components/PostMeta";
import Backtop from "components/Backtop";

import { getPostBySlug, getAllPosts } from "utils/posts";
import initGitalk from "utils/gitTalk";
import markdownToHtml from "utils/markdownToHtml";

import "prism-themes/themes/prism-atom-dark.min.css";
import "gitalk/dist/gitalk.css";

interface Props {
  post: Post;
}

const Post: NextPageWithLayout<Props> = ({ post }) => {
  const router = useRouter();

  useEffect(() => {
    initGitalk("gitalk-container", post.slug!);
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>
          {post.title} - {process.env.NEXT_PUBLIC_TITLE}
        </title>
      </Head>
      <article className="prose prose-slate">
        <h1>{post.title}</h1>
        <PostMeta
          words={post.words!}
          minutes={post.minutes!}
          date={post.date!}
        />
        <PostContent content={post.content!} />
      </article>
      <div id="gitalk-container"></div>
      <Backtop />
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
    "minutes",
    "words",
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
