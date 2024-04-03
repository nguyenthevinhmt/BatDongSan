'use client';
import { useState, useEffect } from "react"
import Flex from 'antd/es/flex';
import Space from "antd/es/space";
import React from "react";
import Divider from "antd/es/divider";
import ListPostPaginationComponent from "@/app/components/ListPostPaginationComponent";
import { SearchPost, getAllPostByIds, recommendPost } from "@/services/post/post.service";
import PriceFilter from "@/components/public/FilterComponent/PriceFilter";
import AreaFilter from "@/components/public/FilterComponent/AreaFilter";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Select from "antd/es/select";
import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";
import { PriceRentConst, PriceSaleConst } from "@/components/public/FilterComponent/DataConst/PriceConst";
import { AreaConst } from "@/components/public/FilterComponent/DataConst/AreaConst";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    const [newData, setNewData] = useState<any[]>([]);
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const getData = async ({pageSize, pageNumber, postType, realEstateType, keyword, priceStart, priceEnd, areaStart, areaEnd} : 
                            {pageSize: number, pageNumber?: number, postType?: number, 
                                realEstateType?: number, keyword?: string, priceStart?: string, 
                                priceEnd?: string, areaStart?: string, areaEnd?: string}) => {
        const response = await SearchPost({
            pageSize: pageSize,
            pageNumber: pageNumber || null,
            postType: postType || null,
            realEstateType: realEstateType || null,
            keyword: keyword || null,
            startPrice: priceStart || null,
            endPrice: priceEnd || null,
            startArea: areaStart || null,
            endArea: areaEnd || null,
        });

        setData(response?.data?.items || []);
        setTotalItems(response?.data?.totalItems || 0);
    };

    useEffect(() => {
        async function fetchData() {
        let priceStart = undefined;
        let priceEnd = undefined;
        let areaStart = undefined;
        let areaEnd = undefined;
        
        if (!form.getFieldValue('postTypeId')) {
            await router.push(pathName);
        }
        else {
            priceStart = await searchParams?.get("startPrice");
            priceEnd = await searchParams?.get("endPrice");
            areaStart = await searchParams?.get("startArea");
            areaEnd = await searchParams?.get("endArea");
        }

        await getData({
            pageSize: -1, 
            postType: form.getFieldValue('postTypeId'), 
            realEstateType: form.getFieldValue('realEstateTypeId'), 
            keyword: keyword,
            priceStart: priceStart || undefined,
            priceEnd: priceEnd || undefined,
            areaStart: areaStart || undefined,
            areaEnd: areaEnd || undefined
        }
        )};

        fetchData();
    }, [searchChange])

    setTimeout(() => {
        setLoading(false)
    }, 3000);

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
                    minHeight: '1300px'
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
                        
                        <Flex vertical gap={10} style={{ margin: "20px 0" }}>
                            <div>
                                Bộ lọc <FilterOutlined />
                            </div>
                            {isShow ?
                                <div>
                                    <PriceFilter
                                        data={
                                            form.getFieldValue('postTypeId') == "1"
                                                ? PriceSaleConst
                                                : PriceRentConst
                                        }
                                    />
                                </div>
                                : <></>
                            }
                            <div>
                                    <AreaFilter data={AreaConst}/>
                                </div>
                            </Flex>
                            
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