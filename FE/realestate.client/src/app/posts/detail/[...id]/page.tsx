"use client";
import { useParams } from "next/navigation";
import HeaderComponent from "@/components/shareLayout/header";
import { CgSize } from "react-icons/cg";
import { TbCurrencyDong } from "react-icons/tb";
import { TfiDirectionAlt } from "react-icons/tfi";
import {
    Carousel,
    Avatar,
    Flex,
    Button,
    Typography,
    Divider,
    Tooltip,
    Anchor,
    Dropdown,
} from 'antd';
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { LuDot } from "react-icons/lu";
import Link from "next/link";
import zaloIcon from "@/assets/image/zaloIcon.png";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import { IoShareSocialOutline, IoWarningOutline, IoHomeOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import type { MenuProps } from 'antd';
import SlideSecond from '@/app/components/detailComponent/SlideSecond'

import Image from "next/image";
import MapComponent from "@/components/Map/MapComponent";
const { Paragraph } = Typography;

const page = () => {


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

    // const encodedNumber = '097763637'.slice(0, -3) + '***';    
    // const [copy,setCopy] = useState(`${encodedNumber}<LuDot />Hiện số`)

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    const handleClick = () => {
        if (window.confirm("This site is trying to open this application. Do you want to proceed?")) {
            window.location.href = 'https://zalo.me/0972808703'
        }
    };
    const handleClickCopy = () => {
        // const decodedString = encodedString.slice(0, -3) + encodedString.slice(-3)
        // const decodedNumber = '097763637'.slice(0, -3)  
        // setCopy(`${encodedNumber}<LuDot />Đã sao chép`)
    };

    const dataImage = [
        {
            src: 'https://res.cloudinary.com/deurdoich/image/upload/v1710754535/DATN/kzx8bdkewrhe1mm9ouej.jpg',
            title: 'Ảnh 1',
            description: 'Mô tả ảnh 1',
        },
        {
            src: 'https://res.cloudinary.com/deurdoich/image/upload/v1710754535/DATN/kzx8bdkewrhe1mm9ouej.jpg',
            title: 'Ảnh 1',
            description: 'Mô tả ảnh 1',
        },
        {
            src: 'https://res.cloudinary.com/deurdoich/image/upload/v1710754535/DATN/kzx8bdkewrhe1mm9ouej.jpg',
            title: 'Ảnh 1',
            description: 'Mô tả ảnh 1',
        },
        {
            src: 'https://res.cloudinary.com/deurdoich/image/upload/v1710754535/DATN/kzx8bdkewrhe1mm9ouej.jpg',
            title: 'Ảnh 1',
            description: 'Mô tả ảnh 1',
        },
        {
            src: 'https://res.cloudinary.com/deurdoich/image/upload/v1710754535/DATN/kzx8bdkewrhe1mm9ouej.jpg',
            title: 'Ảnh 1',
            description: 'Mô tả ảnh 1',
        },
        {
            src: 'https://res.cloudinary.com/deurdoich/image/upload/v1710754535/DATN/kzx8bdkewrhe1mm9ouej.jpg',
            title: 'Ảnh 1',
            description: 'Mô tả ảnh 1',
        },
        {
            src: 'https://res.cloudinary.com/deurdoich/image/upload/v1710754535/DATN/kzx8bdkewrhe1mm9ouej.jpg',
            title: 'Ảnh 1',
            description: 'Mô tả ảnh 1',
        },
        {
            src: 'https://res.cloudinary.com/deurdoich/image/upload/v1710754535/DATN/kzx8bdkewrhe1mm9ouej.jpg',
            title: 'Ảnh 1',
            description: 'Mô tả ảnh 1',
        },

    ]
    return (
        <>
            <HeaderComponent />
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
                        <Carousel style={{ width: '730px', marginRight: "30px", background: "#4C5655", borderRadius: "3px" }} afterChange={onChange}>
                            {dataImage.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Image height={400} width={730} style={{ objectFit: "cover", borderRadius: "3px" }} alt="#" src={item.src} />
                                    </div>
                                )
                            })}

                        </Carousel>

                        <h1 style={{ fontSize: "24px", color: "#2C2C2C", margin: "10px 0" }}>Chính chủ bán 2 lô đất cực đẹp giá đầu tư tại Sơn Mỹ, Hàm Tân - chỉ hơn 2tr/m2, sổ hồng đầy đủ</h1>
                        <span style={{ color: "#2C2C2C", fontSize: "15px" }}>Liên Chiểu, Đà Nẵng</span>
                        <Divider style={{ margin: "18px 0" }} />
                        <Flex justify='space-between'>
                            <Flex gap='100px'>
                                <div>
                                    <span style={{ color: '#999', fontSize: '15px', marginTop: "10px" }}>Mức giá</span>
                                    <p style={{ color: '#2C2C2C', fontSize: '17px', fontWeight: "610", marginTop: "5px" }}>12,5 tỷ</p>
                                    <p style={{ color: '#2C2C2C', fontSize: '13px' }}>~2,13 triệu/m²</p>
                                </div>
                                <div>
                                    <span style={{ color: '#999', fontSize: '15px', marginTop: "10px" }}>Diện tích</span>
                                    <p style={{ color: '#2C2C2C', fontSize: '17px', fontWeight: "610", marginTop: "5px" }}>5.875,3 m²</p>
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
                            Bán 2 lô đất giá đầu tư liền nhau tại thôn 4, xã Sơn Mỹ, Hàm Tân, Bình Thuận.
                            Diện tích bao gồm: Lô 1: 3023m²; lô 2: 2582,3m².
                            Tổng DT 2 lô: 5875,3m² (có 200m² ONT) - Đang làm sổ lên thổ cư (mỗi lô sẽ lên 400m² ONT/lô).

                            Có thể bán tổng 1 lô lớn hoặc bán riêng từng lô.
                            Vị trí:
                            - Lô góc 2 mặt tiền theo quy hoạch, cách QL 55 khoảng 200m.
                            - Cạnh Khu công nghiệp Becamex Sơn Mỹ 1 - 2.
                            - Gần ngay Trường Học, Chợ, Trạm y tế, Bưu điện, UBND xã, cây xăng - bán kính chỉ 500m.
                            - Gần dự án sân golf, cách thị xã Lagi 7km, cách cảng Cái Mép 70km.
                            - Cách biển Cam Bình 4km.
                            - Cách khu du lịch Phan Thiết 70km chạy cao tốc.
                            Đất đẹp bằng phẳng không vướng quy hoạch, phủ hồng (ONT) 100%...
                            Giá bán: 12,5 tỷ (có thương lượng).
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
                                        Diện tích<span style={{ marginLeft: "100px", fontWeight: "400" }}>8.200 m²</span>
                                    </p>
                                </Flex>
                                <Divider style={{ margin: "10px 0" }} />
                                <Flex>
                                    <IoHomeOutline style={{ fontSize: "34px" }} />
                                    <p style={styleIcon}>
                                        Mặt tiền<span style={{ marginLeft: "103px", fontWeight: "400" }}>885 m</span>
                                    </p>
                                </Flex>
                                <Divider style={{ margin: "10px 0" }} />
                            </div>
                            <div style={{ width: "45%" }}>
                                <Divider style={{ margin: "0 0 10px 0" }} />
                                <Flex>
                                    <TbCurrencyDong style={{ fontSize: "34px" }} />
                                    <p style={styleIcon}>
                                        Mức giá<span style={{ marginLeft: "122px", fontWeight: "400" }}>2,3 tỷ</span>
                                    </p>
                                </Flex>
                                <Divider style={{ margin: "10px 0" }} />
                                <Flex>
                                    <TfiDirectionAlt style={{ fontSize: "34px" }} />
                                    <p style={styleIcon}>
                                        Hướng nhà<span style={{ marginLeft: "100px", fontWeight: "400" }}>Đông</span>
                                    </p>
                                </Flex>
                                <Divider style={{ margin: "10px 0" }} />
                            </div>
                        </Flex>

                        <h1 id="part-3" style={{
                            fontSize: "18px",
                            margin: "40px 0 10px 0",
                            color: "#2C2C2C"
                        }}>Xem ví trị trên bản đồ</h1>
                        
                            <MapComponent style={{ marginTop: '50px' }} prop={{ latitude: 21.21312, longitude: 102.123123}}  width={730}/>
                        <SlideSecond />
                        
                    </div>

                    <div className="box_right">
                        <Flex vertical align='center' style={{ width: "250px", height: "335px", border: "1px solid #F2F2F2", borderRadius: "6px" }}>
                            <Avatar size={54} style={{ margin: "20px 0 10px 0" }} icon={<UserOutlined />} />
                            <p style={{ color: '#ACACAC', fontSize: "12px", marginBottom: "2px" }}>Được đăng bởi</p>
                            <Link href="/u/list-post"><p style={contentStyle}>Công ty Cổ phần Đặc cầu ổ phần Đặc cầu</p></Link>
                            <Button style={firstButtonStyle}>
                                <Paragraph style={{ color: "#fff" }} copyable={{ text: "0965115792" }}>0965115***<LuDot />Hiện số</Paragraph>
                            </Button>
                            <Button style={styleButtonGroup} onClick={handleClick}>
                                <Image width={40}
                                    height={23} alt="#" src={zaloIcon.src} style={{
                                        borderRadius: "2px",
                                        marginBottom: "2px",
                                    }} />Chat qua Zalo
                            </Button>
                            <Button href="mailto:" target="_self" style={styleButtonGroup}>Gửi email</Button>
                        </Flex >
                        <img width="250px" height="600px" style={{margin:"20px 0",objectFit:"contain"}} src="https://tpc.googlesyndication.com/simgad/13978607217291355544" />
                    </div>
                </Flex>
            </div>
        </>
    )
}

export default page
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
};
var styleButtonGroup: any = {
    height: "50px",
    fontSize: "14px",
    lineHeight: '24px',
    padding: '13px 15px',
    margin: "5px 20px",
    width: "220px",
    fontWeight: "600",
    fontFamily: "Lexend Medium, Roboto, Arial"
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
const data = [
    {
        title: 'Diện tích',
    },
    {
        title: 'Mặt tiền',
    },
    {
        title: 'Mức giá',
    },
    {
        title: 'Hướng nhà',
    },
];