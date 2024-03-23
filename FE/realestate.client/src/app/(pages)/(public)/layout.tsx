import Footer from "@/components/shareLayout/footer";
import Header from "@/components/shareLayout/header";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
