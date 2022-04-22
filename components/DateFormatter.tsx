import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import zhCN from "date-fns/locale/zh-CN";

import CalendarLtr20Regular from "@ricons/fluent/CalendarLtr20Regular";
import classNames from "classnames";

type Props = {
  dateString: string;
  className?: string;
  showIcon?: boolean;
  formatString?: string;
};

const DateFormatter: React.FC<Props> = ({
  dateString,
  className,
  formatString = "yyyy年M月d日",
  showIcon = true,
}) => {
  const date = parseISO(dateString);
  const dateFormatter = format(date, formatString, { locale: zhCN });
  return (
    <div className={classNames("flex flex-row items-center", className)}>
      {showIcon && <CalendarLtr20Regular className="mr-1 w-4" />}
      <time dateTime={dateString}>{dateFormatter}</time>
    </div>
  );
};

export default DateFormatter;
