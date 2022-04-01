import type { LinkProps } from "next/link";

import classNames from "classnames";
import { useTheme } from "next-themes";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import Link from "next/link";

interface Props extends LinkProps {
  className?: string;
}

const ReadMore: React.FC<Props> = (props) => {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <Link {...props}>
      <a
        className={classNames(
          "flex items-center text-gray-900 dark:text-gray-100",
          props.className
        )}
      >
        <span>所有文章</span>
        <UseAnimations
          animation={arrowDown}
          size={30}
          strokeColor={isLight ? "#000" : "#fff"}
          className="ml-1 -rotate-90 "
        />
      </a>
    </Link>
  );
};

export default ReadMore;
