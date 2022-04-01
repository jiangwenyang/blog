import Link from "next/link";
import classNames from "classnames";

import Logo from "./Logo";
import Title from "./Title";

interface Props {
  hideTitle?: boolean;
}

const Brand: React.FC<Props> = ({ hideTitle = false }) => (
  <div>
    <Link href="/">
      <a className="flex items-center">
        <Logo />
        {!hideTitle && <Title className={classNames("hidden sm:block")} />}
      </a>
    </Link>
  </div>
);

export default Brand;
