import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

const PostLayout: React.FC = ({ children }) => {
  return (
    <div className="p-8 w-full max-w-prose mx-auto">
      <Header hideTitle />
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default PostLayout;
