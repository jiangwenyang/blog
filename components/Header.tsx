import React from "react";
import NavLink from "./NavLink";
import Logo from "./Logo";

const Header: React.FC = () => (
  <header className="flex flex-row justify-between py-8 px-6 max-w-2xl w-full mx-auto">
    <Logo />
    <nav>
      <ul className="flex items-center justify-between">
        <li>
          <NavLink href="/about">关于我</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
