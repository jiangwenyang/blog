import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
