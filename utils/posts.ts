import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { isNotJunk } from "junk";
import formatISO from "date-fns/formatISO";
import type { Post } from "typings/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(isNotJunk);
}

export function getPostBySlug(slug: string, fields: string[] = []): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Post = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      if (data[field] instanceof Date) {
        // 解决日期对象无法在getStaticProps中序列化问题
        items[field] = formatISO(data[field]);
      } else {
        items[field] = data[field];
      }
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
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
