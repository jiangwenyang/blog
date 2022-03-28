import { useEffect, useState } from "react";
import format from "date-fns/format";
import {
  BookClock24Regular,
  TextWordCount20Filled,
  CalendarLtr20Regular,
} from "@ricons/fluent";

interface Props {
  date: Date | string;
  words: number;
  minutes: number;
}

interface MetaProps {
  title: string;
  content: string;
  icon: React.ReactElement;
}

const Meta: React.FC<MetaProps> = ({ title, content, icon }) => {
  return (
    <div className="flex items-center ">
      <div className="flex items-center mr-1 w-6">{icon}</div>
      <div className="mr-2">{title}:</div>
      <div className="text-slate-500">{content}</div>
    </div>
  );
};

const PostMeta: React.FC<Props> = ({ date, words, minutes }) => {
  return (
    <div className="flex flex-col items-start  justify-between gap-4 py-2 sm:flex-row sm:items-center">
      <Meta
        title="发布时间"
        content={format(new Date(date), "yyyy-MM-dd")}
        icon={<BookClock24Regular />}
      />

      <Meta
        title="阅读时长"
        content={`${minutes}分钟`}
        icon={<CalendarLtr20Regular />}
      />

      <Meta
        title="字数统计"
        content={`${words}字`}
        icon={<TextWordCount20Filled />}
      />
    </div>
  );
};

export default PostMeta;
