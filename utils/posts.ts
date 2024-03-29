import type { Post, PostCoverImage, CoverImage } from "typings/post";

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { isNotJunk } from "junk";
import readingTime from "reading-time";
import formatISO from "date-fns/formatISO";
import isFunction from "lodash/isFunction";

const getDirectoryPath = (path: string) => join(process.cwd(), path);

const postsDirectory = getDirectoryPath("_posts");
const pagesDirectory = getDirectoryPath("_pages");

const CoverDirectoryName = "covers";

const getCoverPath = (coverSrc: CoverImage["src"]) =>
  `/${CoverDirectoryName}/${coverSrc}`;

export function getSlugs(basePath: string = postsDirectory) {
  return fs.readdirSync(basePath).filter(isNotJunk);
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

export function getPostBySlug(
  slug: string,
  fields: string[] = [],
  basePath: string = postsDirectory
): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(basePath, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
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

export function getAllPosts(
  fields: string[] = [],
  basePath: string = postsDirectory
) {
  const slugs = getSlugs(basePath);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, basePath))
    .sort((post1, post2) => {
      if (!(post1.date && post2.date)) {
        return 1;
      }
      return post1.date > post2.date ? -1 : 1;
    });
  return posts;
}

export function getFeaturedPosts(fields: string[] = [], limit = 4) {
  const realFields = Array.from(new Set([...fields, "featured"]));

  const allPost = getAllPosts(realFields);

  const allFeaturedPosts = allPost.filter((post) => post.featured);

  const realFeaturedPosts = allFeaturedPosts.length
    ? allFeaturedPosts
    : allPost;

  return realFeaturedPosts.slice(0, limit);
}

export function getPageBySlug(slug: string, fields: string[] = []) {
  return getPostBySlug(slug, fields, pagesDirectory);
}

export function getAllPages(fields: string[] = []) {
  return getAllPosts(fields, pagesDirectory);
}
