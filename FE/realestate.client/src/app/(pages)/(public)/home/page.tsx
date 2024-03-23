'use client';
import React, { useState, useEffect } from "react"
import HeaderComponent from "@/components/shareLayout/header";
import {
  Avatar,
  List,
  Space,
  Divider,
  Tooltip,
  Button,
  Flex
} from 'antd';
import { HeartOutlined, LineOutlined, EnvironmentOutlined } from '@ant-design/icons';
const ListPost = () => {

  const [loading, setLoading] = useState(true);
  const [quantityPost, setQuantityPost] = useState(
    [
      {
        id: 1,
        name: "Nhà bán mặt tiền view sông đắc địa, trung tâm quận Phú Nhuận, TPHCM GIAM GIA 12TY8 Mặt tiền kinh doanh - Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5m Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5mv Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5m Nhà bán mặt tiền view sông đắc địa, trung tâm quận Phú Nhuận, TPHCM GIAM GIA 12TY8 Mặt tiền kinh doanh - Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5m Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5mv Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5mNhà bán mặt tiền view sông đắc địa, trung tâm quận Phú Nhuận, TPHCM GIAM GIA 12TY8 Mặt tiền kinh doanh - Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5m Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5mv Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5mvvv",
        price: "2 tỷ",
        acreage: "20m",
        location: "Đà Nẵng",
        date: "Đăng hôm nay"
      },
      {
        id: 1,
        name: "GIAM GIA 12TY8 Mặt tiền kinh doanh - Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5m",
        price: "2 tỷ",
        acreage: "20m",
        location: "Đà Nẵng",
        date: "Đăng hôm nay"
      },
      {
        id: 1,
        name: "GIAM GIA 12TY8 Mặt tiền kinh doanh - Dương Thị Mười khu vip Q12 - DT 102m2 4 tầng - lề đường 5m",
        price: "2 tỷ",
        acreage: "20m",
        location: "Đà Nẵng",
        date: "Đăng hôm nay"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
      {
        name: "ok"
      },
    ])

  const data = quantityPost.map((item, i) => ({
    //  name: "hsgcd ev fu",
    //         price:"2 tỷ",
    //         acreage:"20m",
    //         location:"Đà Nẵng",
    //         date:"19/03/2024"
    href: `posts/detail/${i}`,
    name: item.name,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    image: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    price: item.price,
    acreage: item.acreage,
    location: item.location,
    date: item.date
  }));
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  setTimeout(() => {
    setLoading(false)
  }, 3000);
  return (
    <>
      <div
        style={{
          background: "#fff",
          borderRadius: "7px",
          width: "100%",
          margin: "0 auto",
          maxWidth: "1224px"
        }}
      >
        <h1 style={{
          fontSize: "24px",
          paddingTop: "20px",
          fontWeight: 700,
          fontFamily: "Nunito, sans-serif",
          color: "#000000",
          margin: "25px 13px"
        }}>Danh sách tin</h1>
        <Divider />
        <List

          // loading={loading}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            style: { textAlign: "center" }
          }}// phân trang
          dataSource={data}
          footer={
            <div>
              {/* <b>dm</b> batdongsan */}
            </div>
          }
          renderItem={(item, i) => (
            <a href={`posts/detail/${i}`} key={i}>
              <List.Item
                className="hover-card"
                style={{

                  border: "1px solid #F2F2F2",
                  margin: "10px 0",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}

                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={item.image}
                  />
                }
              >
                <List.Item.Meta

                  avatar={<Avatar size={40} src={item.avatar} />}
                  title={<h2 className="ellipsis-multiline2" style={{
                    fontFamily: "Lexend Medium, Roboto, Arial",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: "500",
                    color: "#2C2C2C",
                    height: "58px",
                    letterSpacing: "1px"
                  }}>{item.name}</h2>}
                  description={<span style={{
                    color: "#E03C31",
                    fontSize: "16px",
                    fontWeight: 600
                  }}>
                    {item.price} <LineOutlined /> <span>{item.acreage}</span></span>}
                />
                <p style={{ marginTop: "4px", fontSize: "14px", color: "#505050", marginLeft: "50px" }}>
                  <EnvironmentOutlined style={{ marginRight: "5px" }} />{item.location}
                </p>
                <Flex justify="space-between" align="flex-end" style={{ marginTop: "3px" }}>
                  <Tooltip placement="right" title={"27/02/2024"} color={'#423e3e'}>
                    <span style={{
                      color: "#999",
                      fontSize: "12px",
                      marginLeft: "50px",
                      marginBottom: "4px"
                    }}>{item.date}
                    </span>
                  </Tooltip>
                  <Tooltip placement="top" title={"Lưu tin"}>
                    <Button style={{ width: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <HeartOutlined />
                    </Button>
                  </Tooltip>
                </Flex>
              </List.Item>
            </a>
          )}
        />
      </div>
    </>
  )
}
export default ListPost
