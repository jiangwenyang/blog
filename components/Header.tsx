import React from "react";
import Brand from "./Brand";
import KBarButton from "./KBarButton";

interface Props {
  hideTitle?: boolean;
}

const Header: React.FC<Props> = ({ hideTitle }) => (
  <header className="flex flex-row justify-between items-center pb-8">
    <Brand hideTitle={hideTitle}></Brand>
    <KBarButton />
  </header>
);

export default Header;
