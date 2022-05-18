import React from "react";
import Brand from "./Brand";
import KbarButton from "./KbarButton";

interface Props {
  hideTitle?: boolean;
}

const Header: React.FC<Props> = ({ hideTitle }) => (
  <header className="flex flex-row justify-between items-center pb-8">
    <Brand hideTitle={hideTitle}></Brand>
    <KbarButton />
  </header>
);

export default Header;
