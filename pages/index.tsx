import type { GetStaticProps } from "next";
import type { Post } from "typings/post";
import type { NextPageWithLayout } from "typings/app";

import React from "react";
import Head from "next/head";
import Layout from "components/Layout";
import { getAllPosts, getFeaturedPosts } from "utils/posts";
import generateRssFeed from "utils/feed";
import Posts from "components/Posts";
import Intro from "components/Intro";

interface Props {
  allPosts: Post[];
  featuredPosts: Post[];
}

const Home: NextPageWithLayout<Props> = ({ allPosts, featuredPosts }) => {
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

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const fileds = ["title", "date", "slug"];

  const featuredFileds = ["title", "date", "slug", "coverImage", "excerpt"];

  const allPosts = getAllPosts(fileds);
  const featuredPosts = getFeaturedPosts(featuredFileds);

  await generateRssFeed();

  return {
    props: { allPosts, featuredPosts },
  };
};

export default Home;
