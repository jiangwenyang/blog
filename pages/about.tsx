import type { NextPageWithLayout } from "typings/app";

import PostLayout from "components/PostLayout";

const About: NextPageWithLayout = () => {
  return <article>about页面</article>;
};

About.getLayout = function getLayout(page: React.ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};

export default About;
