import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import classNames from "classnames";
import Layout from "components/Layout";
import { getAllPosts } from "utils/posts";
import type { Post } from "utils/posts";
import Posts from "components/Posts";

interface Props {
  allPosts: Post[];
}

type withLayoutNextPage = NextPage<Props> & {
  getLayout: (page: React.ReactElement) => React.ReactNode;
};

const Home: withLayoutNextPage = ({ allPosts }) => {
  return (
    <div className={classNames(["prose", styles.container])}>
      <Posts posts={allPosts} />
    </div>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
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
}

export default Home;
