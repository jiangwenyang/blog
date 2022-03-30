import type { Post, PostCoverImage, CoverImage } from "typings/post";

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { isNotJunk } from "junk";
import readingTime from "reading-time";
import formatISO from "date-fns/formatISO";
import isFunction from "lodash/isFunction";

const postsDirectory = join(process.cwd(), "_posts");

const CoverDirectoryName = "covers";

const getCoverPath = (coverSrc: CoverImage["src"]) =>
  `/${CoverDirectoryName}/${coverSrc}`;

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(isNotJunk);
}

const tranformCoverImage = (
  postCoverImage: PostCoverImage,
  title: Post["title"]
) => {
  let src = "",
    name: CoverImage["name"] = "";
  if (typeof postCoverImage === "string") {
    src = postCoverImage;
    name = title;
  } else {
    src = postCoverImage.src;
    name = postCoverImage.name || title;
  }

  return {
    src: getCoverPath(src),
    name,
  };
};

export function getPostBySlug(slug: string, fields: string[] = []): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content, excerpt } = matter(fileContents, { excerpt: true });
  const { minutes, words } = readingTime(content);

  const post: Post = {};

  const defaultFieldGetter = (field: string) => {
    if (data[field] instanceof Date) {
      // 解决日期对象无法在getStaticProps中序列化问题
      return formatISO(data[field]);
    } else {
      return data[field];
    }
  };

  const fieldGetterMap: Post = {
    slug: realSlug,
    content,
    excerpt,
    minutes: Math.round(minutes),
    words,
    coverImage:
      data.coverImage && tranformCoverImage(data.coverImage, data.title),
  };

  fields.forEach((field) => {
    const filedGetter = fieldGetterMap[field] ?? defaultFieldGetter;

    const filedData = isFunction(filedGetter)
      ? filedGetter(field)
      : filedGetter;

    filedData && (post[field] = filedData);
  });
  return post;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => {
      if (!(post1.date && post2.date)) {
        return 1;
      }
      return post1.date > post2.date ? -1 : 1;
    });
  return posts;
}

export function getFeaturedPosts(fields: string[] = [], limit = 3) {
  const realFields = Array.from(new Set([...fields, "featured"]));

  const allPost = getAllPosts(realFields);

  let allFeaturedPosts = allPost.filter((post) => post.featured);

  const realFeaturedPosts = allFeaturedPosts.length
    ? allFeaturedPosts
    : allPost;

  return realFeaturedPosts.slice(0, limit);
}
