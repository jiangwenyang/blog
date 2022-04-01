import React from "react";
import Brand from "./Brand";
import Nav from "./Nav";
import ThemeSwitch from "./ThemeSwitch";

const HeaderWithNav: React.FC = () => (
  <header className="flex flex-row justify-between items-center pb-8">
    <Brand hideTitle />
    <div className="flex flex-row justify-between items-center">
      <ThemeSwitch />
      <Nav />
    </div>
  </header>
);

export default HeaderWithNav;
