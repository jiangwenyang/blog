import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="p-8 md:px-16 lg:container lg:mx-auto">
      <Header />
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
