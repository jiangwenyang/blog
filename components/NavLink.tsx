import Link from "next/link";

interface Props {
  href: string;
}

const NavLink: React.FC<Props> = ({ href, children }) => (
  <Link href={href}>
    <a className="px-4 py-2 font-semibold text-gray-800  inline-block p-1 rounded-lg hover:bg-gray-200 transition-all">
      {children}
    </a>
  </Link>
);

export default NavLink;
