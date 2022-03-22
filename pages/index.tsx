import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import classNames from "classnames";
import Layout from "components/Layout";

type withLayoutNextPage = NextPage & {
  getLayout: (page: React.ReactElement) => React.ReactNode;
};

const Home: withLayoutNextPage = () => {
  return <div className={classNames(["prose", styles.container])}>Home</div>;
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
