import React from "react";
import Brand from "./Brand";
import Nav from "./Nav";

const HeaderWithNav: React.FC = () => (
  <header className="flex flex-row justify-between items-center pb-8">
    <Brand hideTitle />
    <Nav />
  </header>
);

export default HeaderWithNav;
