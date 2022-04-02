import type { GetStaticProps } from 'next';
import type { Post } from 'typings/post';
import type { NextPageWithLayout } from 'typings/app';

import React from 'react';
import Head from 'next/head';

import Layout from 'components/Layout';
import Intro from 'components/Intro';
import FeaturedPosts from 'components/FeaturedPosts';
import ReadMore from 'components/ReadMore';

import { getFeaturedPosts } from 'utils/posts';

type Props = {
  featuredPosts: Post[];
};

const HomePage: NextPageWithLayout<Props> = ({ featuredPosts }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
      </Head>
      <Intro />

      <div>
        <FeaturedPosts posts={featuredPosts} />

        <ReadMore href="/posts" className="mt-4" />
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = () => {
  const featuredFileds = ['title', 'date', 'slug', 'coverImage', 'excerpt'];

  const featuredPosts = getFeaturedPosts(featuredFileds);

  return {
    props: { featuredPosts },
  };
};

export default HomePage;
