import { List, Card, Flex, Divider, Button, Tooltip } from 'antd';
import { CgSize } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { TbCurrencyDong } from "react-icons/tb";
import { TfiDirectionAlt } from "react-icons/tfi";
import GoogleMap from '@/components/GoogleAPI/mapComponents';
import { CiSquareChevRight, CiSquareChevLeft } from "react-icons/ci";
import { useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'

const SlideSecond = () => {
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
    const dataPost = [
        {
            name: 'Diện tích',
            price: "432 tỷ",
            location: "Hà Nội",
            time: "Hôm nay"
        },
        {
            name: 'Diện tích',
            price: "3533 tỷ",
            location: "Hà Nội",
            time: "Hôm nay"
        },
        {
            name: 'Diện tích',
            price: "543234r5t43 tỷ",
            location: "Hà Nội",
            time: "Hôm nay"
        },
        {
            name: 'Diện tích',
            price: "4234rrrfer tỷ",
            location: "Hà Nội",
            time: "Hôm nay"
        },
        {
            name: 'Diện tích',
            price: "r43r34rtỷ",
            location: "Hà Nội",
            time: "Hôm nay"
        },
        {
            name: 'Diện tích',
            price: "4rfreffrefer tỷ",
            location: "Hà Nội",
            time: "Hôm nay"
        },
        {
            name: 'Diện tích',
            price: "5543tỷ",
            location: "Hà Nội",
            time: "Hôm nay"
        },
        {
            name: 'Diện tích',
            price: "đmmm",
            location: "Hà Nội",
            time: "Hôm nay"
        },
    ];

    const [indexPost, setIndexPost] = useState(0)
    const onClickNext = () => { //nút tiến
        setIndexPost(indexPost === dataPost.length - 1 ? 0 : indexPost + 1)
        console.log("tiến");

    }
    const onClickPrev = () => {//nút lùi
        setIndexPost(indexPost === 0 ? dataPost.length - 1 : indexPost - 1)
    }
    return (
        <>
            <h1 style={{
                fontSize: "18px",
                margin: "40px 0 10px 0",
                color: "#2C2C2C"
            }}>Tìm kiếm theo từ khóa</h1>
            <div>
                <Flex>
                    <Button style={styleButton}>Nhà mặt phố thành phố Hải Dương</Button>
                    <Button style={styleButton}>Bố làm to</Button>
                </Flex>
                <Flex>
                    <Button style={styleButton}>Đất công nghiệp</Button>
                    <Button style={styleButton}>Đất đm Tulen</Button>
                </Flex>
            </div>
            <Divider />
            <Flex justify="space-between" >
                <div>
                    <span style={{ color: "#B5B5B5", fontWeight: "450" }}>Ngày đăng</span>
                    <p style={{ color: "#2C2C2C", fontWeight: "500", marginTop: "5px" }}>11/03/2024</p>
                </div>
                <div>
                    <span style={{ color: "#B5B5B5", fontWeight: "450" }}>Ngày hết hạn</span>
                    <p style={{ color: "#2C2C2C", fontWeight: "500", marginTop: "5px" }}>11/03/2024</p>
                </div>
                <div>
                    <span style={{ color: "#B5B5B5", fontWeight: "450" }}>Loại tin</span>
                    <p style={{ color: "#2C2C2C", fontWeight: "500", marginTop: "5px" }}>Tin thường</p>
                </div>
                <div>
                    <span style={{ color: "#B5B5B5", fontWeight: "450" }}>Mã tin</span>
                    <p style={{ color: "#2C2C2C", fontWeight: "500", marginTop: "5px" }}>38919828</p>
                </div>
            </Flex>
            <Divider />
            <Flex justify="space-between">
                <h1 style={{
                    fontSize: "18px",
                    color: "#2C2C2C"
                }}>Bất động sản dành cho bạn</h1>
                <Flex>
                    <Button style={{ marginRight: "10px" }} onClick={onClickPrev} disabled={indexPost === 0} icon={<ArrowLeftOutlined />} />
                    <Button onClick={onClickNext} disabled={indexPost === dataPost.length - 3} icon={<ArrowRightOutlined />} />
                </Flex>
            </Flex>
            <Flex justify='space-between' style={{ overflow: 'auto', width: "730px" }}>
                {dataPost.slice(indexPost, indexPost + 3).map((item, index) => {
                    return (
                        <>
                            <a href={`posts/detail/${index}`}>
                                <Card
                                    hoverable
                                    style={{ width: 236, height: 361, marginTop: "20px" }}
                                    bodyStyle={{ padding: 14 }}
                                    cover={
                                        <img height={200} style={{ objectFit: "cover", width: "100%" }} alt="example" src="https://images.unsplash.com/photo-1564648351416-3eec9f3e85de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a29zdGVubG9zZSUyMGJpbGRlcnxlbnwwfHwwfHx8MA%3D%3D" />
                                    }
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
                                    <span style={{ color: "#E03C31", fontSize: "17px", fontWeight: 600 }}>{item.price}</span>
                                    <p style={{ marginTop: "4px", fontSize: "16px" }}>{item.location}</p>
                                    <Flex justify="space-between" align="flex-end" >
                                        <Tooltip placement="bottom" title={"27/02/2024"} color={'#423e3e'}>
                                            <span style={{ color: "#999", fontSize: "13px", marginBottom: "4px" }}>{item.time}</span>
                                        </Tooltip>
                                        <Tooltip placement="bottom" color={'#423e3e'} title={"Bấm để lưu tin"}>
                                            <Button danger icon={<HeartFilled />} />
                                        </Tooltip>
                                    </Flex>
                                </Card>
                            </a>
                        </>
                    )
                })}
            </Flex>
            <Divider style={{ margin: "35px 0" }} />
        </>
    )
}
export default SlideSecond

const styleIcon = {
    fontSize: "15px",
    margin: "7px 0 0 15px",
    fontWeight: "500",
}
const styleButton = {
    borderRadius: "20px",
    backgroundColor: "#F2F2F2",
    marginRight: "20px",
    marginTop: "10px",
    border: "none"
}