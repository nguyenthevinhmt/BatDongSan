"use client";
import { useParams } from "next/navigation";
import { CgSize } from "react-icons/cg";
import { TbCurrencyDong } from "react-icons/tb";
import dayjs from 'dayjs';
import {
  Avatar,
  Flex,
  Button,
  Typography,
  Divider,
  Tooltip,
  Dropdown,
  Card,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import ZaloIcon from '@/assets/image/zalo_icon.png'
import Link from "next/link";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import type { MenuProps } from 'antd';

import MapComponent from "@/components/Map/MapComponent";
import { getById } from "@/services/post/post.service";
import { Carousel } from "@/components/public/carousel/carousel";
import { environment } from "@/shared/environment/environment";
import axios from "axios";
import { classificationPostType, formatCurrency } from "@/shared/utils/common-helpers";
import Image from "next/image";
const { Paragraph } = Typography;

const Page = () => {

  const items: MenuProps['items'] = [
    {
      label: <Link href="https://www.facebook.com/">Facebook</Link>,
      key: '1',
      icon: <TiSocialFacebookCircular style={{ fontSize: "28px", color: "#444444" }} />
    },
    {
      label: <Link href="https://zalo.me/0972808703">Zalo</Link>,
      key: '2',
      icon: <SiZalo style={{ fontSize: "28px", color: "#444444" }} />
    },
    {
      label: <Link href="https://zalo.me/0972808703">Sao chép liên kết</Link>,
      key: '3',
      icon: <CiLink style={{ fontSize: "28px", color: "#444444" }} />
    }

  ]
  const [data, setData] = useState<any>();
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  });


  const param = useParams();
  useEffect(() => {
    const fetchDetailPost = async () => {
      const response = await getById(+param?.id[0]);
      console.log("data", response?.data?.medias)
      await setData(response?.data);
      const coordinatesRes = await axios.get(
        `http://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(
          response?.data?.street +
          " " +
          response?.data?.ward +
          " " +
          response?.data?.district +
          " " +
          response?.data?.province
        )}&key=${environment.BingMapsApiKey}`
      );
      const coordinates = {
        latitude: coordinatesRes.data.resourceSets[0].resources[0].point.coordinates[0],
        longitude: coordinatesRes.data.resourceSets[0].resources[0].point.coordinates[1],
      };
      await setLocation(coordinates);
    }
    fetchDetailPost();
  }, []);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const handleContactZalo = () => {
    if (window.confirm("This site is trying to open this application. Do you want to proceed?")) {
      window.location.href = `https://zalo.me/${data?.userPhoneNumber}`
    }
  };
  return (
    <>
      <div
        style={{
          background: "#fff",
          borderRadius: "3px",
          width: "100%",
          margin: "0 auto",
          maxWidth: "1024px"
        }}
      >
        <Flex justify="space-between">
          <div className="box_left" style={{ width: '730px' }}>
            <Carousel
              width={730}
              height={400}
              data={data?.medias?.map((item: any) => {
                return {
                  src: item?.mediaUrl,
                  alt: item?.name
                }
              })}
            />

            <h1 style={{ fontSize: "24px", color: "#2C2C2C", margin: "10px 0" }}>{data?.title}</h1>
            <span style={{ color: "#2C2C2C", fontSize: "15px" }}>{data?.detailAddress}</span>
            <Divider style={{ margin: "18px 0" }} />
            <Flex justify='space-between'>
              <Flex gap='100px'>
                <div>
                  <span style={{ color: '#999', fontSize: '15px', marginTop: "10px" }}>Mức giá</span>
                  <p style={{ color: '#2C2C2C', fontSize: '17px', fontWeight: "610", marginTop: "5px" }}>{data?.price}</p>
                </div>
                <div>
                  <span style={{ color: '#999', fontSize: '15px', marginTop: "10px" }}>Diện tích</span>
                  <p style={{ color: '#2C2C2C', fontSize: '17px', fontWeight: "610", marginTop: "5px" }}>{data?.area} m²</p>
                </div>
              </Flex>
              <div style={{ marginTop: '13px' }}>
                <Dropdown menu={{ items }} trigger={['click']}>
                  <Tooltip placement="top" title={'Chia sẻ'}>
                    <Button style={{ height: "44px" }} type="text"><IoShareSocialOutline style={{ fontSize: "30px", textAlign: "center" }} /></Button>
                  </Tooltip>
                </Dropdown>
                <Tooltip placement="top" title={'Lưu tin'}>
                  <Button style={{ height: "44px" }} type="text"><IoIosHeartEmpty style={{ fontSize: "30px" }} /></Button>
                </Tooltip>
              </div>

            </Flex>
            <Divider style={{ margin: "18px 0" }} />
            <h1 style={{
              fontSize: "18px",
              color: "#2C2C2C",
              marginBottom: "10px"
            }}>Thông tin mô tả chi tiết</h1>
            <p style={{ marginBottom: '50px' }}>
              {data?.description}
            </p>
            <h1 id="part-2" style={{
              fontSize: "18px",
              margin: "40px 0 10px 0",
              color: "#2C2C2C"
            }}>Đặc điểm bất động sản</h1>
            <Flex justify="space-between">
              <div style={{ width: "45%" }}>
                <Divider style={{ margin: "0 0 10px 0" }} />
                <Flex>
                  <CgSize style={{ fontSize: "34px", fontWeight: "300" }} />
                  <p style={styleIcon}>
                    Diện tích<span style={{ marginLeft: "100px", fontWeight: "400" }}>{data?.area} m²</span>
                  </p>
                </Flex>
                <Divider style={{ margin: "10px 0" }} />

              </div>
              <div style={{ width: "45%" }}>
                <Divider style={{ margin: "0 0 10px 0" }} />
                <Flex>
                  <TbCurrencyDong style={{ fontSize: "34px" }} />
                  <p style={styleIcon}>
                    Mức giá<span style={{ marginLeft: "122px", fontWeight: "400" }}>{formatCurrency(data?.price)}</span>
                  </p>
                </Flex>
                <Divider style={{ margin: "10px 0" }} />
              </div>
            </Flex>
            <Flex justify="space-between">
              <div>
                <span style={{ color: "#B5B5B5", fontWeight: "450" }}>Ngày đăng</span>
                <p style={{ color: "#2C2C2C", fontWeight: "500", marginTop: "5px" }}>{dayjs(data?.createDate).format('DD/MM/YYYY')}</p>
              </div>
              <div>
                <span style={{ color: "#B5B5B5", fontWeight: "450" }}>Ngày hết hạn</span>
                <p style={{ color: "#2C2C2C", fontWeight: "500", marginTop: "5px" }}>{dayjs(data?.postEndDate).format('DD/MM/YYYY')}</p>
              </div>
              <div>
                <span style={{ color: "#B5B5B5", fontWeight: "450" }}>Loại tin</span>
                <p style={{ color: "#2C2C2C", fontWeight: "500", marginTop: "5px" }}>{classificationPostType(data?.options)}</p>
              </div>
              <div>
                <span style={{ color: "#B5B5B5", fontWeight: "450" }}>Mã tin</span>
                <p style={{ color: "#2C2C2C", fontWeight: "500", marginTop: "5px" }}>{data?.id}</p>
              </div>
            </Flex>
            <Divider />

            <h1 id="part-3" style={{
              fontSize: "18px",
              margin: "40px 0 10px 0",
              color: "#2C2C2C"
            }}>Xem ví trị trên bản đồ</h1>

            <MapComponent prop={location} width={730} height={270} />
            <Divider style={{ margin: "35px 0" }} />

          </div>

          <div className="box_right">
            <Flex justify="center" vertical align='center' style={{ width: "250px", height: "300px", border: "1px solid #F2F2F2", borderRadius: "6px" }}>
              <Avatar size={54} style={{ margin: "20px 0 10px 0" }} icon={<UserOutlined />} />
              <p style={{ color: '#ACACAC', fontSize: "12px", marginBottom: "2px" }}>Được đăng bởi</p>
              <Link href="/u/list-post"><p style={contentStyle}>{data?.userName}</p></Link>
              <Button style={firstButtonStyle}>
                <Paragraph style={{ color: "#fff" }} copyable={{ text: `${data?.userPhoneNumber}` }}>{data?.userPhoneNumber}</Paragraph>
              </Button>
              <Button style={styleButtonGroup} onClick={handleContactZalo}>
                <Image width={20}
                  height={20} alt="#" src={ZaloIcon.src} style={{
                    borderRadius: "2px",
                    marginBottom: "2px",
                  }} />Chat qua Zalo
              </Button>
            </Flex >
            <img width="250px" height="600px" style={{ margin: "20px 0", objectFit: "contain" }} src="https://tpc.googlesyndication.com/simgad/13978607217291355544" />
          </div>
        </Flex>
      </div>
    </>
  )
}

export default Page
var contentStyle: any = {
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  width: "220px",
  marginBottom: "20px",
  fontSize: "17px",
  color: "#2C2C2C",
  textAlign: 'center'
};
var styleButtonGroup: any = {
  height: "50px",
  fontSize: "14px",
  lineHeight: '24px',
  padding: '13px 15px',
  margin: "5px 20px",
  width: "220px",
  fontWeight: "600",
  fontFamily: "Lexend Medium, Roboto, Arial",
  alignItem: 'center',
  justifyContent: 'center',
  display: 'flex'
}
const firstButtonStyle = {
  background: '#009BA1',
  color: '#fff',
  ...styleButtonGroup,
};
const styleIcon = {
  fontSize: "15px",
  margin: "7px 0 0 15px",
  fontWeight: "500",

}