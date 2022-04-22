import BookClock24Regular from "@ricons/fluent/BookClock24Regular";
import TextWordCount20Filled from "@ricons/fluent/TextWordCount20Filled";
import CalendarLtr20Regular from "@ricons/fluent/CalendarLtr20Regular";

import DateFormatter from "./DateFormatter";
import Meta from "./Meta";

type Props = {
  date?: string;
  words?: number;
  minutes?: number;
};

const PostMeta: React.FC<Props> = ({ date, words, minutes }) => {
  return (
    <div className="flex flex-col items-start  justify-between gap-4 py-2 sm:flex-row sm:items-center">
      {date ? (
        <Meta
          title="发布时间"
          content={<DateFormatter dateString={date} showIcon={false} />}
          icon={<CalendarLtr20Regular />}
        />
      ) : null}

      {minutes ? (
        <Meta
          title="阅读时长"
          content={`${minutes}分钟`}
          icon={<BookClock24Regular />}
        />
      ) : null}

      {words ? (
        <Meta
          title="字数统计"
          content={`${words}字`}
          icon={<TextWordCount20Filled />}
        />
      ) : null}
    </div>
  );
};

export default PostMeta;
