import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    const meta = {
      locale: "zh-Hans",
      type: "website",
      siteName: "Jiangwenyang’s Blog",
      title: "Jiangwenyang’s Blog",
      description: "Jiang Wenyang's blog, wirte something fun",
      url: "https://jiangwenyang.com",
      image: "https://jiangwenyang.com/logo.svg",
      twitter: {
        site: "@wateriscat",
      },
    };
    return (
      <Html dir="ltr" lang="zh-Hans">
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="apple-mobile-web-app-status-bar-style" content="white" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="og:site_name" content={meta.siteName} />
          <meta property="og:locale" content={meta.locale} />
          <meta property="og:type" content={meta.type} key="og:type" />
          <meta property="og:title" content={meta.title} key="og:type" />
          <meta
            property="og:description"
            content={meta.description}
            key="og:description"
          />
          <meta property="og:url" content={meta.url} key="og:url" />
          <meta property="og:image" content={meta.image} key="og:image" />
          <meta name="apple-mobile-web-app-title" content={meta.title} />

          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitter:card"
          />
          <meta
            name="twitter:site"
            content={meta.twitter.site}
            key="twitter:site"
          />
          <meta name="twitter:title" content={meta.title} key="twitter:title" />
          <meta
            name="twitter:description"
            content={meta.description}
            key="twitter:description"
          />
          <meta name="twitter:image" content={meta.image} key="twitter:image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
