import React from "react";
import Brand from "./Brand";
import ThemeSwitch from "./ThemeSwitch";

const Header: React.FC = () => (
  <header className="flex flex-row justify-between items-center pb-8">
    <Brand></Brand>
    <ThemeSwitch></ThemeSwitch>
  </header>
);

export default Header;
