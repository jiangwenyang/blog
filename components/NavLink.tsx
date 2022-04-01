import classNames from "classnames";
import Link from "next/link";

interface Props {
  href: string;
  className?: string;
}

const NavLink: React.FC<Props> = ({ href, children, className }) => (
  <Link href={href}>
    <a
      className={classNames(
        "px-4 py-2 font-semibold text-gray-800  hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 inline-block p-1 rounded-lg ",
        className
      )}
    >
      {children}
    </a>
  </Link>
);

export default NavLink;
