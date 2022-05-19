import { ThemeProvider } from "next-themes";

import type { AppPropsWithLayout } from "typings/app";
import Layout from "components/Layout";
import KBar from "components/KBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ThemeProvider attribute="class">
      <KBar posts={pageProps.allPosts}>
        {getLayout(<Component {...pageProps} />)}
      </KBar>
    </ThemeProvider>
  );
}

export default MyApp;
