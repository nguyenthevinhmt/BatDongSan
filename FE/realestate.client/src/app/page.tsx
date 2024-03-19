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
import RealEstateByLocation from "@/components/public/realEstateByLocation";
import { CarouselAds } from "@/components/public/carousel/carouselAds";
const App = () => {
  const hoverStyles = {
    transform: "scale(1,2)",
  };

  return (
    <>
      <div style={{ width: "100%", height: "100vh", backgroundColor: "#fff" }}>
        <HeaderComponent />
        <div>
          <Flex style={{
            position: 'relative',
            textAlign: 'center',
            justifyItems: 'center',
            width: '100%'
          }}>
            <CarouselAds height={500} width={2000} data={[
              {
                src: "https://res.cloudinary.com/deurdoich/image/upload/v1710824264/DATN/dkrtgkwjquagqgyzuoiw.png",
                alt: "#"
              },
              {
                src: "https://res.cloudinary.com/deurdoich/image/upload/v1710824265/DATN/e43jwl7z9bunorpqcc5h.png",
                alt: "#"
              }
            ]} />
            <div style={{ position: 'absolute', width: '50%', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}><SearchComponent /></div>
          </Flex>

        </div >
        <Layout
          style={{
            margin: "0 auto",
            maxWidth: "1340px",
            minWidth: "1340px",
            padding: "0 167px",
            backgroundColor: "#fff",
          }}
        >
          <ListPost />
          <div style={{ margin: '50px 0px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '30px', fontWeight: '500' }}>Bất động sản nổi bật</h2>
            <PostHorizon option={1} />
            <PostHorizon option={2} />
            <PostHorizon option={3} />
            <PostHorizon option={4} />

          </div>

          <div style={{ margin: '60px 0px' }}>
            <RealEstateByLocation />
          </div>
        </Layout>
        <Footer />
      </div >
    </>
  );
};
const AppPage = () => {
  return withTheme(<App />);
};

export default AppPage;
