import { ThemeProvider } from "next-themes";

import type { AppPropsWithLayout } from "typings/app";
import Layout from "components/Layout";
// import Kbar from "components/Kbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ThemeProvider attribute="class">
      {/* <Kbar>{getLayout(<Component {...pageProps} />)}</Kbar> */}
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;
