import type { GetStaticProps } from "next";
import type { Post } from "typings/post";
import type { NextPageWithLayout } from "typings/app";

import React from "react";
import Layout from "components/Layout";
import { getAllPosts } from "utils/posts";
import Posts from "components/Posts";

interface Props {
  allPosts: Post[];
}

const Home: NextPageWithLayout<Props> = ({ allPosts }) => {
  return (
    <div>
      <Posts posts={allPosts} />
    </div>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};

export default Home;
