import Head from "next/head";

import Backtop from "components/Backtop";

import SITE_CONFIG from "site.config";

import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
  const { meta } = SITE_CONFIG;
  return (
    <div className="flex flex-col w-full min-h-screen p-8 md:px-8">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:site_name" content={meta.siteName} />
        <meta property="og:locale" content={meta.locale} />
        <meta property="og:type" content={meta.type} key="og_type" />
        <meta property="og:title" content={meta.title} key="og_type" />
        <meta
          property="og:description"
          content={meta.description}
          key="og_description"
        />
        <meta property="og:url" content={meta.url} key="og_url" />
        <meta property="og:image" content={meta.image} key="og_image" />
        <meta name="apple-mobile-web-app-title" content={meta.title} />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter_card"
        />
        <meta
          name="twitter:site"
          content={meta.twitter.site}
          key="twitter_site"
        />
        <meta name="twitter:title" content={meta.title} key="twitter_title" />
        <meta
          name="twitter:description"
          content={meta.description}
          key="twitter_description"
        />
        <meta name="twitter:image" content={meta.image} key="twitter_image" />
      </Head>

      <div className="flex-1 max-w-2xl mx-auto">
        <Header />
        <main>
          {children}
          <Backtop />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
