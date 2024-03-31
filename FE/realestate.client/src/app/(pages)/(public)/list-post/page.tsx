'use client';
import { useState, useEffect } from "react"
import HeaderComponent from "@/components/shareLayout/header";
import Flex from 'antd/es/flex';
import Tooltip from 'antd/es/tooltip';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Row from 'antd/es/row';
import LineOutlined from "@ant-design/icons/LineOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import Space from "antd/es/space";
import React from "react";
import Divider from "antd/es/divider";
import List from "antd/es/list";
import Avatar from "antd/es/avatar";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import Button from "antd/es/button";
import ListPostPaginationComponent from "@/app/components/ListPostPaginationComponent";
import page from "../../(private)/dashboard/page";
import { findAll, recommendPost } from "@/services/post/post.service";


const ListPost = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);

    const getData = async function fetchData() {
        // Thực hiện gọi API thực sự ở đây
        // Ví dụ:
        const response = await recommendPost({pageSize: -1});
        setData(response?.data?.items || []);
    };
    
    getData();


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
                <ListPostPaginationComponent header={"Danh sách tin demo"} data={data}/>
            </div>
        </>
    )
}
export default ListPost;