"use client";
import HeaderComponent from "@/components/shareLayout/header";
import withTheme from "@/theme";
import React, { useState } from "react";
import { Flex, Tabs, Input, Cascader, Layout, Card, Affix } from "antd";
import SearchComponent from "@/components/public/search";
import ListPost from "./components/ListPost";
import Footer from "@/components/shareLayout/footer";
import { Carousel } from "@/components/public/carousel/carousel";
import PostHorizon from "@/components/public/PostHorizon/post";
const App = () => {
  const hoverStyles = {
    transform: "scale(1,2)",
  };

  return (
    <>
      <div style={{ width: "100%", height: "100vh", backgroundColor: "#fff" }}>
        <HeaderComponent />
        <Layout
          style={{
            margin: "0 auto",
            maxWidth: "1340px",
            minWidth: "1340px",
            padding: "0 167px",
            backgroundColor: "#fff",
          }}
        >
          <SearchComponent />
          <ListPost />
          <PostHorizon option={1} />
          <div style={{ marginBottom: '200px' }}></div>
        </Layout>
        <Footer />
      </div>
    </>
  );
};
const AppPage = () => {
  return withTheme(<App />);
};

export default AppPage;
