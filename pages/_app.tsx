import type { AppPropsWithLayout } from "typings/app";
import Layout from "components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
