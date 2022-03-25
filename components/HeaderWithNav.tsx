import React from "react";
import Logo from "./Logo";
import Title from "./Title";
import Nav from "./Nav";

const HeaderWithNav: React.FC = () => (
  <header className="flex flex-row justify-between items-center pb-8">
    <Logo />
    <Title />
    <Nav />
  </header>
);

export default HeaderWithNav;
