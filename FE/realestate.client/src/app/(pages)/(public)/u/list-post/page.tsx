"use client"
import { useState, useEffect } from "react"
import HeaderComponent from "@/components/shareLayout/header";
import {
    Avatar,
    Flex,
    Dropdown,
    Tooltip,
    Button,
    Typography,
    Col,
    Card,
    Divider,
    Row
} from 'antd';
import Link from 'next/link';
import {
    LineOutlined,
    EnvironmentOutlined,
    ShareAltOutlined,
    PhoneOutlined
} from "@ant-design/icons";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import { CiLink } from "react-icons/ci";
import type { MenuProps } from 'antd';
import { LuDot } from "react-icons/lu";
import LeasePost from '@/app/(pages)/(public)/u/list-post/LeasePost/'

const ListPostsAuthor = () => {
    const { Paragraph } = Typography;
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.toString())
    }
    const [loading, setLoading] = useState(true);
    const [label, setLabel] = useState<string>("0965552762")
    const [quantityPost, setQuantityPost] = useState(
        [
            {
                id: 1,
                name: "hsgcd gdbc dwigihfgbvf giv fi vhie giv fig bvie eckie eikvc ki vcus vcv fskv cuev fu"
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
    const [statusLoadmore, setStatusLoadmore] = useState(true)
    const [visibleProducts, setVisibleProducts] = useState(8)
    useEffect(() => {
        quantityPost.length <= 8 && setStatusLoadmore(false)
    }, [visibleProducts])

    const onLoadMore = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 8);
        if (visibleProducts + 8 >= quantityPost.length) {
            setStatusLoadmore(false);
        }
    }


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
            label: <p onClick={copyToClipboard}>Sao chép liên kết</p>,
            key: '3',
            icon: <CiLink onClick={copyToClipboard} style={{ fontSize: "28px", color: "#444444" }} />
        }
    ]


    setTimeout(() => {
        setLoading(false)
    }, 3000);
    return (
        <>
            <div style={{ height: "270px", marginBottom: "-65px" }} className="background-list-posts"></div>
            <div
                style={{
                    background: "#fff",
                    borderRadius: "7px",
                    width: "100%",
                    margin: "0 auto",
                    maxWidth: "1224px"
                }}
            >

                <Flex justify="space-between" >
                    <Flex style={{ margin: "20px 20px" }}>
                        <Avatar size={90} src="https://images.unsplash.com/photo-1627376652834-9d2afec4ff2c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        <h3 style={{ fontSize: "25px", marginLeft: "20px", fontFamily: "Nunito, sans-serif", color: "#000000", fontWeight: "600" }}>Nguyễn Quốc Việt</h3>
                    </Flex>
                    <Flex style={{ marginTop: "30px" }}>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Tooltip placement="top" title={'Chia sẻ'}>
                                <Button style={{ height: "44px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px", fontWeight: "600" }}><ShareAltOutlined style={{ fontSize: "27px" }} />Chia sẻ</Button>
                            </Tooltip>
                        </Dropdown>
                        <Button style={{ background: "#009BA1", height: "44px", margin: "0 20px 0 10px" }}>
                            <Paragraph style={styleButton} copyable={{ text: `${label}` }}><PhoneOutlined style={{ fontSize: "25px" }} /> 0965115***<LuDot />Hiện số</Paragraph>
                        </Button>
                    </Flex>
                </Flex>
                <Divider />
                <h1 style={{ fontSize: "24px", fontWeight: 700, fontFamily: "Nunito, sans-serif", color: "#000000", margin: "25px 0" }}>Danh sách tin đăng bán ({quantityPost.length})</h1>
                <Row gutter={[24, 24]}>
                    {quantityPost.slice(0, visibleProducts).map((item, index) => {
                        return (
                            <Col span={6} key={index}>
                                <a href={`posts/detail/${index}`}>
                                    <Card
                                        hoverable
                                        loading={loading}
                                        style={{ width: 288, height: 377 }}
                                        bodyStyle={{ padding: 14 }}

                                        cover={loading ? (
                                            <div className="custom-skeleton-image"></div>
                                        ) : (
                                            <img height={200} style={{ objectFit: "cover", width: "100%" }} alt="example" src="https://images.unsplash.com/photo-1564648351416-3eec9f3e85de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a29zdGVubG9zZSUyMGJpbGRlcnxlbnwwfHwwfHx8MA%3D%3D" />
                                        )}
                                    >
                                        <h2 className="ellipsis-multiline" style={{
                                            fontFamily: "Roboto,Arial",
                                            height: "40px",
                                            fontSize: "15px",
                                            lineHeight: "20px",
                                            fontWeight: "500",
                                            color: "#2C2C2C",
                                            marginBottom: "4px",
                                            letterSpacing: "1px"
                                        }}>{item.name}</h2>
                                        <span style={{ color: "#E03C31", fontSize: "17px", fontWeight: 600, marginTop: "7px" }}>Giá thỏa thuận <LineOutlined /> <span>56m²</span></span>
                                        <p style={{ marginTop: "7px", fontSize: "16px" }}><EnvironmentOutlined style={{ marginRight: "5px" }} />Liên Chiểu, Đà Nẵng</p>
                                        <Flex justify="space-between" align="flex-end" >
                                            <Tooltip placement="bottom" title={"27/02/2024"} color={'#423e3e'}>
                                                <span style={{ color: "#999", fontSize: "13px", marginTop: "17px" }}>Đăng 3 ngày trước</span>
                                            </Tooltip>
                                        </Flex>
                                    </Card>
                                </a>
                            </Col>
                        )
                    })}
                </Row>
                <div style={{ width: "100%", textAlign: "center", margin: "40px 0" }}>
                    {statusLoadmore ? <Button onClick={onLoadMore}>Xem thêm</Button> : null}
                </div>
                <LeasePost />
            </div>
        </>
    )
}
export default ListPostsAuthor



var styleButton: any = {
    fontFamily: "Lexend Medium, Roboto, Arial",
    background: '#009BA1',
    color: '#fff',
    marginTop: "1px"
}