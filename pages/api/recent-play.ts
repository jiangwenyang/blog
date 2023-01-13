import { login_cellphone, record_recent_song } from "NeteaseCloudMusicApi";
import type { NextApiRequest, NextApiResponse } from "next";
import type { SongData } from "typings/song";

type RecentData = {
  total: number;
  list: SongData[];
};

const loginByPhone = async () => {
  const res = await login_cellphone({
    phone: process.env.NETEASE_CLOUD_MUSIC_PHONE!,
    password: process.env.NETEASE_CLOUD_MUSIC_PASSWORD!,
  });
  return res.body.cookie;
};

const getRecentMusic = async (limit = 5) => {
  const cookie = await loginByPhone();
  
  const res = await record_recent_song({
    cookie,
    limit,
  });

  const data = res.body.data as RecentData;

  return (data?.list || []).map(serializeSong);
};

const serializeSong = (songData: SongData) => {
  const {
    resourceId,
    playTime,
    data: {
      name,
      ar,
      al: { name: album, picUrl: albumPicUrl },
    },
  } = songData;
  return {
    resourceId,
    playTime,
    name,
    artist: ar.map((item) => item.name).join(", "),
    album,
    albumPicUrl,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;

  const data = await getRecentMusic(limit);
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=30"
  );
  res.status(200).json(data);
}
