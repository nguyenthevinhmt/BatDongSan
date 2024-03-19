'use client';
import {useState,useEffect } from "react"
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
    Row } from 'antd';
import Link from 'next/link';
import {
    LineOutlined,
    EnvironmentOutlined,
    HeartFilled,
    HeartOutlined
} from "@ant-design/icons";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import { CiLink } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import type { MenuProps } from 'antd';
import { LuDot } from "react-icons/lu";
import LeasePost from '@/app/(pages)/(public)/u/list-post/LeasePost/index.tsx'

const ListPost = () => {
   
    const [loading, setLoading] = useState(true);
    const [quantityPost, setQuantityPost] = useState(
            [
            {
                id:1,
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
    const [visibleProducts, setVisibleProducts] = useState(8)
  
    
    const onLoadMore = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 8);
         if (visibleProducts + 8 >= quantityPost.length) {
            setStatusLoadmore(false);
        }
    }
        
    setTimeout(() => {
        setLoading(false)
    }, 3000);
    return(
        <>
            <HeaderComponent />
            <div style={{ height:"270px",marginBottom:"-90px"}} className="background-list-posts"></div>
            <div
                style={{
                    background: "#fff",
                    borderRadius: "7px",
                    width: "100%",
                    margin: "0 auto",
                    maxWidth: "1224px"
                }}
            >
                <h1 style={{fontSize:"24px",paddingTop:"20px",fontWeight:700,fontFamily:"Nunito, sans-serif",color:"#000000",margin:"25px 13px"}}>Danh sách tin</h1>
                <Row gutter={[24, 24]} style={{margin:"0 1px"}}>
                    {quantityPost.map((item,index)=>{
                        return(
                            <Col span={6}>
                                <a href={`posts/detail/${index}`}>
                                    <Card
                                    hoverable
                                    loading={loading}
                                    style={{ width: 282, height: 378 }}
                                    bodyStyle={{ padding: 14 }}
                                    
                                    cover={loading ? (
                                        <div className="custom-skeleton-image"></div>
                                    ) : (
                                            <img height={200} style={{ objectFit: "cover", width: "100%" }} alt="example" src="https://images.unsplash.com/photo-1564648351416-3eec9f3e85de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a29zdGVubG9zZSUyMGJpbGRlcnxlbnwwfHwwfHx8MA%3D%3D" />
                                    )}
                                >
                                    <h2 className="ellipsis-multiline" style={{
                                        fontFamily: "Roboto,Arial",
                                        height:"40px",
                                        fontSize: "15px",
                                        lineHeight: "20px",
                                        fontWeight: "500",
                                        color: "#2C2C2C",
                                        marginBottom: "4px",
                                        letterSpacing: "1px"
                                    }}>{item.name}</h2>
                                     <span style={{ color: "#E03C31", fontSize: "17px", fontWeight: 600,marginTop:"7px"}}>Giá thỏa thuận <LineOutlined /> <span>56m²</span></span>
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
            </div>
        </>
    )
}
export default ListPost



var styleButton: any = {
    fontFamily: "Lexend Medium, Roboto, Arial",
    background: '#009BA1',
    color: '#fff',
    marginTop:"8px"
}