import { Feed } from "feed";
import fs from "fs";
import { getAllPosts } from "./posts";

const siteURL = "https://jiangwenyang.com";
const author = {
  name: "Jiang Wenyang",
  email: "u19950930@gmail.com",
  link: siteURL,
};

const generateRssFeed = () => {
  const feed = new Feed({
    title: "Jiang Wenyang's Blog",
    description: `${author.name}'s Blog`,
    id: siteURL,
    link: siteURL,
    language: "zh", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved 2022, ${author.name}`,
    generator: "Feed for Node.js", // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: `${siteURL}/json`,
      atom: `${siteURL}/atom`,
    },
    author,
  });

  const allPost = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  allPost.forEach((post) => {
    const url = `${siteURL}/posts/${post.slug}`;

    feed.addItem({
      title: post.title!,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.content,
      author: [author],
      contributor: [author],
      date: new Date(post.date!),
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
};

export default generateRssFeed;
