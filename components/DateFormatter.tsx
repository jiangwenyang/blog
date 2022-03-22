import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { zhCN } from "date-fns/locale";

interface Props {
  dateString: string;
}

const DateFormatter: React.FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  const dateFormatter = format(date, "yyyy年M月d日", { locale: zhCN });
  return <time dateTime={dateString}>{dateFormatter}</time>;
};

export default DateFormatter;
