import type { NextPageWithLayout } from "typings/app";
import type { ParsedUrlQuery } from "querystring";
import type { Post as PostType } from "typings/post";
import type { GetStaticProps, GetStaticPaths } from "next";

import Head from "next/head";

import Page from "components/Page";

import { getPageBySlug, getAllPages } from "utils/posts";
import markdownToHtml from "utils/markdownToHtml";

type Props = {
  page: PostType;
};

const DynamicPage: NextPageWithLayout<Props> = ({ page }) => {
  const meta = {
    type: "article",
    title: `${page.title} - Jiangwenyang’s Blog`,
    description: page.excerpt || "Jiang Wenyang's blog, wirte something fun",
    url: `https://jiangwenyang.com/posts/${page.slug}`,
    image:
      page.coverImage?.src && `https://jiangwenyang.com${page.coverImage?.src}`,
    date: page.date,
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
        {meta.image && (
          <meta property="og:image" content={meta.image} key="og_image" />
        )}
        <meta name="twitter:title" content={meta.title} key="twitter_title" />
        <meta
          name="twitter:description"
          content={meta.description}
          key="twitter_description"
        />
        {meta.image && (
          <meta name="twitter:image" content={meta.image} key="twitter_image" />
        )}
        <meta property="article:published_time" content={meta.date} />
        <title>
          {page.title} - {process.env.NEXT_PUBLIC_TITLE}
        </title>
      </Head>
      <Page post={page} />
    </>
  );
};


interface Params extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const page = getPageBySlug(params!.page, [
    "title",
    "date",
    "slug",
    "content",
    "coverImage",
  ]);

  const content = await markdownToHtml(page.content || "");

  return {
    props: {
      page: {
        ...page,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const pages = getAllPages(["slug"]);

  return {
    paths: pages.map((page) => {
      return {
        params: {
          page: page.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default DynamicPage;
