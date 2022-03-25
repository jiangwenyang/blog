import React from "react";
import Logo from "./Logo";
import Title from "./Title";

const Header: React.FC = () => (
  <header className="flex flex-row items-center pb-8">
    <Logo />
    <Title />
  </header>
);

export default Header;
