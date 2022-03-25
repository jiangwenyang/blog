import React from "react";
import HeaderWithNav from "./HeaderWithNav";
import Footer from "./Footer";
import Container from "./Container";

const PostLayout: React.FC = ({ children }) => {
  return (
    <div className="py-24 max-w-prose mx-auto">
      <HeaderWithNav />
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default PostLayout;
