"use client";
import HeaderComponent from "@/components/shareLayout/header";
import React from "react";
import Flex from "antd/es/flex";
import Layout from "antd/es/layout";
import SearchComponent from "@/components/public/search";
import Footer from "@/components/shareLayout/footer";
import RealEstateByLocation from "@/components/public/realEstateByLocation";
import { CarouselAds } from "@/components/public/carousel/carouselAds";
import ListPostHorizon from "@/components/public/PostHorizon/ListPostHorizon";
import dynamic from "next/dynamic";

const ListPost = dynamic(() => import("./components/ListPost"), {
  ssr: false,
});

const App = () => {
  return (
    <>
      <div style={{ width: "100%", height: "100vh", backgroundColor: "#fff" }}>
        <HeaderComponent />
        <div>
          <Flex
            style={{
              position: "relative",
              textAlign: "center",
              justifyItems: "center",
              width: "100%",
            }}
          >
            <CarouselAds
              height={500}
              width={2000}
              data={[
                {
                  src: "https://res.cloudinary.com/deurdoich/image/upload/v1710824264/DATN/dkrtgkwjquagqgyzuoiw.png",
                  alt: "#",
                },
                {
                  src: "https://res.cloudinary.com/deurdoich/image/upload/v1710824265/DATN/e43jwl7z9bunorpqcc5h.png",
                  alt: "#",
                },
              ]}
            />
            <div
              style={{
                position: "absolute",
                width: "50%",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <SearchComponent />
            </div>
          </Flex>
        </div>
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
          <ListPostHorizon isShowHeader={true} />

          <div style={{ margin: "60px 0px" }}>
            <RealEstateByLocation />
          </div>
        </Layout>
        <Footer />
      </div>
    </>
  );
};
export default App;
