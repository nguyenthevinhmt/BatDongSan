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
import Image from "next/image";
import QC1 from "@/assets/image/QC1.png";
import QC2 from "@/assets/image/QC2.gif";
import QC3 from "@/assets/image/QC3.png";
import QC4 from "@/assets/image/QC4.gif";
import ForSale from "@/assets/image/ForSale.svg";
import ForRent from "@/assets/image/ForRent.svg";
import Projects from "@/assets/image/Projects.svg";
import Wiki from "@/assets/image/Wiki.svg";

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

          <Image src={QC4} alt='' width={1120} height={250} style={{ objectFit: "cover" }} />

          <Flex>
            <div style={{width: '70%'}}>
              <ListPostHorizon isShowHeader={true} />
            </div>
            <Flex vertical style={{width: '30%', paddingTop: 120}} align="center">
              <Image src={QC1} alt='' width={250} height={250} style={{ objectFit: "cover", marginBottom: 30 }} />
              <Image src={QC2} alt='' width={250} height={250} style={{ objectFit: "cover" }} />
            </Flex>
          </Flex>
          
          <Image src={QC3} alt='' width={1120} height={250} style={{ objectFit: "cover" }} />

          <div style={{ margin: "60px 0px" }}>
            <RealEstateByLocation />
          </div>
        </Layout>

        <Flex style={{
            margin: "auto",
            marginBottom: 30,
            maxWidth: "1340px",
            minWidth: "1340px",
            padding: "0 167px",
            backgroundColor: "#fff",
          }}
            justify="space-between"
          >
          <div style={{
            width: 200,
            textAlign: 'center'
          }}>
            <Image src={ForSale} alt='' width={130} height={130} style={{ objectFit: "cover" }} />
            <p style={{fontWeight: 600, margin: '10px 0'}}>Bất động sản bán</p>
            <p style={{fontWeight: 300}}>Bạn có thể tìm thấy ngôi nhà mơ ước hoặc cơ hội đầu tư hấp dẫn thông qua lượng 
              tin rao lớn, uy tín về các loại hình bất động sản bán tại Việt Nam, bao gồm bán nhà riêng, bán nhà mặt tiền, 
              bán căn hộ chung cư, bán biệt thự, bán đất, bán shophouse và các loại hình BĐS khác.
            </p>
          </div>
          
          <div style={{
            width: 200,
            textAlign: 'center'
          }}>
            <Image src={ForRent} alt='' width={130} height={130} style={{ objectFit: "cover" }} />
            <p style={{fontWeight: 600, margin: '10px 0'}}>Bất động sản cho thuê</p>
            <p style={{fontWeight: 300}}>Cập nhật thường xuyên và đầy đủ các loại hình bất động sản cho thuê như: 
              thuê phòng trọ, nhà riêng, thuê biệt thự, văn phòng, kho xưởng hay thuê mặt bằng kinh doanh giúp bạn nhanh 
              chóng tìm được bất động sản ưng ý.
            </p>
          </div>

          <div style={{
            width: 200,
            textAlign: 'center'
          }}>
            <Image src={Projects} alt='' width={130} height={130} style={{ objectFit: "cover" }} />
            <p style={{fontWeight: 600, margin: '10px 0'}}>Đánh giá dự án</p>
            <p style={{fontWeight: 300}}>Các video đánh giá tổng quan dự án cung cấp góc nhìn khách quan của các chuyên 
              gia về những dự án nổi bật tại Việt Nam, giúp bạn đưa ra quyết định đúng đắn cho nơi an cư lý tưởng 
              hoặc cơ hội đầu tư sinh lời.
            </p>
          </div>

          <div style={{
            width: 200,
            textAlign: 'center'
          }}>
            <Image src={Wiki} alt='' width={130} height={130} style={{ objectFit: "cover" }} />
            <p style={{fontWeight: 600, margin: '10px 0'}}>Wiki BDS</p>
            <p style={{fontWeight: 300}}>Ngoài cập nhật những biến động thị trường, 
              chúng tôi còn cung cấp kiến thức, kinh nghiệm về mua bán, cho thuê, đầu tư, vay mua nhà, phong thủy, thiết kế nhà, 
              mọi thông tin cần thiết để dẫn lối người tìm nhà tìm thấy căn nhà mơ ước.
            </p>
          </div>
        </Flex>
        <Footer />
      </div>
    </>
  );
};
export default App;
