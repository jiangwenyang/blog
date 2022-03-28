// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import generateRssFeed from "utils/feed";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200);
  const { rss2 } = generateRssFeed();
  res.end(rss2);
}
