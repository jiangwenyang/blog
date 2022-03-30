import type { LinkProps } from "next/link";

import classNames from "classnames";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import Link from "next/link";

interface Props extends LinkProps {
  className?: string;
}

const ReadMore: React.FC<Props> = (props) => (
  <Link {...props}>
    <a className={classNames("flex items-center", props.className)}>
      <span className="text-gray-600">所有文章</span>
      <UseAnimations
        animation={arrowDown}
        size={30}
        className="ml-1 -rotate-90"
      />
    </a>
  </Link>
);

export default ReadMore;
