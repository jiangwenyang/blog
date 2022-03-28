// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { FeedXML } from "utils/feed";
import generateRssFeed from "utils/feed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeedXML>
) {
  res.status(200);
  const { rss2 } = await generateRssFeed();
  res.end(rss2);
}
