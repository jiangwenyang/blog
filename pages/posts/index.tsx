import type { GetStaticProps } from 'next';
import type { Post } from 'typings/post';
import type { NextPageWithLayout } from 'typings/app';

import React from 'react';
import Head from 'next/head';

import PostLayout from 'components/PostLayout';
import HeadTitle from 'components/HeadTitle';
import Posts from 'components/Posts';

import { getAllPosts } from 'utils/posts';
import generateRssFeed from 'utils/feed';

type Props = {
  allPosts: Post[];
};

const PostsPage: NextPageWithLayout<Props> = ({ allPosts }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
      </Head>
      <div className="max-w-5xl mx-auto">
        <HeadTitle>Posts</HeadTitle>
        <Posts posts={allPosts} />
      </div>
    </>
  );
};

PostsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};

export const getStaticProps: GetStaticProps = () => {
  const fileds = ['title', 'date', 'slug', 'coverImage', 'excerpt'];

  const allPosts = getAllPosts(fileds);

  // FIXME: 每次访问都会生成，考虑使用npm srcipt手动生成
  generateRssFeed({ write: true });

  return {
    props: { allPosts },
  };
};

export default PostsPage;
