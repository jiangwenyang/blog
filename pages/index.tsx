import type { GetStaticProps } from "next";
import type { Post } from "typings/post";
import type { NextPageWithLayout } from "typings/app";

import React from "react";
import Head from "next/head";

import Layout from "components/Layout";
import Posts from "components/Posts";
import Intro from "components/Intro";

import { getAllPosts, getFeaturedPosts } from "utils/posts";
import generateRssFeed from "utils/feed";

type Props = {
  allPosts: Post[];
  featuredPosts: Post[];
};

const HomePage: NextPageWithLayout<Props> = ({ allPosts, featuredPosts }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
      </Head>
      <Intro />
      <div className="max-w-5xl mx-auto flex justify-between flex-wrap">
        <Posts posts={featuredPosts} title="Featured" />
        <Posts posts={allPosts} title="Posts" />
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = (context) => {
  const fileds = ["title", "date", "slug"];

  const featuredFileds = ["title", "date", "slug", "coverImage", "excerpt"];

  const allPosts = getAllPosts(fileds);
  const featuredPosts = getFeaturedPosts(featuredFileds);

  // FIXME: 每次访问都会生成，考虑使用npm srcipt手动生成
  generateRssFeed({ write: true });

  return {
    props: { allPosts, featuredPosts },
  };
};

export default HomePage;
