import type { LinkProps } from "next/link";

import { useState, useEffect } from "react";
import classNames from "classnames";
import { useTheme } from "next-themes";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import Link from "next/link";

interface Props extends LinkProps {
  className?: string;
}

const ReadMore: React.FC<Props> = (props) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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
