import React from "react";
import NavLink from "./NavLink";
import Logo from "./Logo";

const HeaderWithNav: React.FC = () => (
  <header className="flex flex-row justify-between items-center pb-8">
    <Logo />
    <nav>
      <ul className="flex items-center justify-between">
        <li>
          <NavLink href="/about">关于我</NavLink>
        </li>
        <li>
          <NavLink href="/rss/feed.xml">RSS</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default HeaderWithNav;
