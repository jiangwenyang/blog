import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const PostLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-prose p-8 sm:px-0 sm-py-24 mx-auto">
      <Header hideTitle />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PostLayout;
