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
import PriceFilter from "@/components/public/FilterComponent/PriceFilter";
import AreaFilter from "@/components/public/FilterComponent/AreaFilter";
import Form from "antd/es/form";
import Search, { SearchProps } from "antd/es/input/Search";
import Input from "antd/es/input";
import Select from "antd/es/select";
import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";
import { PriceRentConst, PriceSaleConst } from "@/components/public/FilterComponent/DataConst/PriceConst";
import { AreaConst } from "@/components/public/FilterComponent/DataConst/AreaConst";

const realEstateType = [
    {
      value: 1,
      label: "Căn hộ chung cư",
    },
    {
      value: 2,
      label: "Nhà riêng",
    },
    {
      value: 3,
      label: "Nhà biệt thự, liền kề",
    },
    {
      value: 4,
      label: "Nhà mặt phố",
    },
    {
      value: 5,
      label: "Shophouse, nhà phố thương mại",
    },
    {
      value: 6,
      label: "Đất nền dự án",
    },
    {
      value: 7,
      label: "Đất",
    },
    {
      value: 8,
      label: "Trang trại, khu nghỉ dưỡng",
    },
    {
      value: 9,
      label: "Kho, nhà xưởng",
    },
    {
      value: 10,
      label: "Bất động sản khác",
    },
    {
      value: 11,
      label: "nhà trọ, phòng trọ",
    },
    {
      value: 12,
      label: "Văn phòng",
    },
    {
      value: 13,
      label: "Cửa hàng, ki ốt",
    },
  ];
  
  const postType = [
    {
      value: 1,
      label: "Bán",
    },
    {
      value: 2,
      label: "Cho thuê",
    },
  ];

const ListPost = () => {
    const { Search } = Input;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isShow, setIsShow] = useState(false);
    const [keyword, setKeyword] = useState<string>();
    const [searchChange, setSearchChange] = useState(false);

    const getData = async ({ pageSize, pageNumber, postType, realEstateType, keyword }: 
                            { pageSize: number, pageNumber?: number, postType?: number, realEstateType?: number, keyword?: string }) => {
        const response = await recommendPost({pageSize: pageSize, pageNumber: pageNumber, postType: postType, realEstateType: realEstateType, keyword: keyword});
        setData(response?.data?.items || []);
        setTotalItems(response?.data?.totalItems || 0);
    };

    useEffect(() => {
        getData({
            pageSize: -1, 
            postType: form.getFieldValue('postTypeId'), 
            realEstateType: form.getFieldValue('realEstateTypeId'), 
            keyword: keyword
        });
    }, [searchChange])

    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    setTimeout(() => {
        setLoading(false)
    }, 3000);

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => value;

    return (
        <>
            <Flex vertical justify="center" align="center" style={{width: '100%'}}>
                <div style={{
                    width: '70%',
                    height: 150,
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                    <Form
                        form={form}
                        onFinish={getData}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            width: '100%',
                        }}
                    >
                        <Search
                            placeholder="input search text" 
                            onSearch={(value) => {
                                setKeyword(value);
                                setSearchChange(!searchChange);
                            }} 
                            enterButton 
                            style={{ marginBottom: 10, backgroundColor: '#f2f2f2'}}
                        />
                        <Flex justify="flex-start" align="flex-end">
                            <Form.Item
                                name="realEstateTypeId"
                                style={{ marginRight: 10 }}
                            >
                                <Select
                                    allowClear={true}
                                    placeholder="Loại bất động sản"
                                    options={realEstateType}
                                    onChange={() => setSearchChange(!searchChange)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="postTypeId"
                                style={{ marginRight: 10 }}
                            >
                                <Select
                                    allowClear={true}
                                    placeholder="Loại bài đăng"
                                    options={postType}
                                    onChange={(value) => {
                                        if (value === 1 || value === 2) {
                                            console.log(value);
                                            setIsShow(true);
                                        }
                                        else {
                                            setIsShow(false);
                                        }
                                        setSearchChange(!searchChange);
                                    }}
                                />
                            </Form.Item>
                        </Flex>
                    </Form>
                    
                <Divider style={{width: '70%', marginTop: 0, marginBottom: 10}}/>
                </div>
                
                <Flex style={{
                    width: '70%',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        width: '65%',
                        marginRight: '20px'
                    }}>
                        <ListPostPaginationComponent header={"Danh sách tin"} data={data} totalItem={totalItems}/>
                    </div>
                    <div style={{
                        width: '35%',
                        height: 500,
                        paddingLeft: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {isShow ?
                            <Flex vertical gap={10} style={{margin: "20px 0"}}>
                                <div>
                                    Bộ lọc <FilterOutlined />
                                </div>
                                <PriceFilter
                                    data={
                                        form.getFieldValue('postTypeId') == "1"
                                            ? PriceSaleConst
                                            : PriceRentConst
                                    }
                                />
                                <AreaFilter data={AreaConst} />
                            </Flex>
                            : <></>
                        }
                        <img
                            width="250px"
                            height="600px"
                            style={{ margin: "20px 0", objectFit: "contain" }}
                            src="https://tpc.googlesyndication.com/simgad/13978607217291355544"
                        />
                    </div>
                </Flex>
            </Flex>
        </>
    )
}
export default ListPost;