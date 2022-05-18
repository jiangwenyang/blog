import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Post as PostType } from "typings/post";
import type { NextPageWithLayout } from "typings/app";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { useEffect } from "react";

import PostLayout from "components/PostLayout";
import Post from "components/Post";
import Backtop from "components/Backtop";

import { getPostBySlug, getAllPosts } from "utils/posts";
import initGitalk from "utils/gitTalk";
import markdownToHtml from "utils/markdownToHtml";

import "prism-themes/themes/prism-atom-dark.min.css";
import "gitalk/dist/gitalk.css";

interface Props {
  post: PostType;
}

const PostPage: NextPageWithLayout<Props> = ({ post }) => {
  const router = useRouter();

  useEffect(() => {
    initGitalk("gitalk-container");
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const meta = {
    type: "article",
    title: `${post.title} - Jiangwenyang’s Blog`,
    description: post.excerpt || "Jiang Wenyang's blog, wirte something fun",
    url: `https://jiangwenyang.com/posts/${post.slug}`,
    image: `https://jiangwenyang.com${post.coverImage?.src}`,
    date: post.date,
  };

  return (
    <>
      <Head>
        <meta property="og:type" content={meta.type} key="og_type" />
        <meta property="og:title" content={meta.title} key="og_type" />
        <meta
          property="og:description"
          content={meta.description}
          key="og_description"
        />
        <meta property="og:url" content={meta.url} key="og_url" />
        <meta property="og:image" content={meta.image} key="og_image" />
        <meta name="twitter:title" content={meta.title} key="twitter_title" />
        <meta
          name="twitter:description"
          content={meta.description}
          key="twitter_description"
        />
        <meta name="twitter:image" content={meta.image} key="twitter_image" />
        <meta property="article:published_time" content={meta.date} />
        <title>
          {post.title} - {process.env.NEXT_PUBLIC_TITLE}
        </title>
      </Head>
      <Post post={post} />
      <div id="gitalk-container"></div>
      <Backtop />
    </>
  );
};

PostPage.getLayout = function getLayout(page: React.ReactElement) {
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
    "excerpt",
  ]);

  const content = await markdownToHtml(post.content || "");

  const allPosts = getAllPosts(["slug", "title"]);

  return {
    props: {
      post: {
        ...post,
        content,
      },
      allPosts,
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

export default PostPage;
