import useSWR from "swr";
import Image from "next/image";
import LibraryMusicRound from "@ricons/material/LibraryMusicRound";
import fetcher from "utils/fetcher";
import type { Song } from "typings/song";

const Song: React.FC<{ data: Song }> = ({ data }) => (
  <div className="text-left flex items-center my-2">
    <Image
      src={data.albumPicUrl}
      alt={data.album}
      width={30}
      height={30}
      className="shadow-sm rounded-full mr-2"
    />
    <span className="ml-1 mr-2">{data.name}</span>
    <span>--</span>
    <span className="text-gray-400">{data.artist}</span>
  </div>
);

const RecentMusic: React.FC = () => {
  const { data = [] } = useSWR<Song[]>("/api/recent-play", fetcher);

  return (
    <section className="min-h-[50px]">
      <div className="font-bold text-lg text-black dark:text-gray-100 mb-2 flex items-center">
        <LibraryMusicRound
          width={20}
          height={20}
          className="mr-2 text-rose-500"
        />
        最近播放
        <span className="inline-block ml-2 text-sm text-gray-600 dark:text-gray-200">
          - 网易云音乐
        </span>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.resourceId}>
            <Song data={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentMusic;
