import NavLink from "./NavLink";

const Nav: React.FC = () => (
  <nav>
    <ul className="flex items-center justify-between">
      <li>
        <NavLink href="/about">关于我</NavLink>
      </li>
      <li>
        <NavLink href="/api/rss">RSS</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
