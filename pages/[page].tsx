import type { NextPageWithLayout } from "typings/app";
import type { ParsedUrlQuery } from "querystring";
import type { Post as PostType } from "typings/post";
import type { GetStaticProps, GetStaticPaths } from "next";

import PostLayout from "components/PostLayout";
import Page from "components/Page";
import { getPageBySlug, getAllPages, getAllPosts } from "utils/posts";
import markdownToHtml from "utils/markdownToHtml";

type Props = {
  page: PostType;
};

const About: NextPageWithLayout<Props> = ({ page }) => {
  return <Page post={page} />;
};

About.getLayout = function getLayout(page: React.ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};

interface Params extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const allPosts = getAllPosts(["slug", "title"]);

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
      allPosts,
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

export default About;
