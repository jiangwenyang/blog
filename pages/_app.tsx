import App from "next/app";
import { ThemeProvider } from "next-themes";

import type { AppContext } from "next/app";
import type { AppPropsWithLayout } from "typings/app";
import type { Post } from "typings/post";

import { getAllPosts } from "utils/posts";
import Layout from "components/Layout";
import KBar from "components/KBar";
import "../styles/globals.css";

interface GlobalProps {
  allPosts: Post[];
}

function MyApp({
  Component,
  pageProps,
  allPosts,
}: AppPropsWithLayout & GlobalProps) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <ThemeProvider attribute="class">
      <KBar posts={allPosts}>{getLayout(<Component {...pageProps} />)}</KBar>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext);
  const allPosts = getAllPosts(["slug", "title"]);
  return {
    ...props,
    allPosts,
  };
};

export default MyApp;
