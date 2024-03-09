import { Skeleton, Card, Flex, Button, Row, Col, Tooltip, Typography } from 'antd';
import React, { useState ,useEffect} from "react";
import {
    LineOutlined,
    EnvironmentOutlined,
    HeartFilled,
    HeartOutlined
} from "@ant-design/icons";


const ListGoods = () => {
    const { Meta } = Card;
    const [loading, setLoading] = useState(true);
    const [heart, setHeart] = useState(true);
    const [quantity, setQuantity] = useState([
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
        {
            name: "cdy"
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
    const [statusLoadmore, setStatusLoadmore]=useState(true)
    const [visibleProducts, setVisibleProducts] = useState(8)
    useEffect(() => {
        visibleProducts === 16 && setStatusLoadmore(false) 
    }, [visibleProducts])
    
    const onLoadMore = () => {
        visibleProducts < 16 && setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 8);
    }
    
    const onChange = () => {
        setHeart(!heart)
    }
    setTimeout(() => {
        setLoading(false)
    }, 3000);
    const { Text } = Typography;
   
    return (
        <>
            <div style={{ margin: "50px 0" }}>
                <h1 style={{ marginBottom: "20px" }}>Bất động sản dành cho bạn</h1>
                <Row gutter={[24, 24]}>
                    {quantity.slice(0,visibleProducts).map((item,index)=>{
                        return(
                            <Col span={6}>
                                <a href={`posts/detail/${index}`}>
                                    <Card
                                    hoverable
                                    loading={loading}
                                    style={{ width: 236, height: 361 }}
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
                                    <span style={{ color: "#E03C31", fontSize: "17px", fontWeight: 600}}>Giá thỏa thuận <LineOutlined /> <span>56m²</span></span>
                                    <p style={{ marginTop: "4px", fontSize: "16px" }}><EnvironmentOutlined style={{ marginRight: "5px" }} />Liên Chiểu, Đà Nẵng</p>
                                    <Flex justify="space-between" align="flex-end" >
                                        <Tooltip placement="bottom" title={"27/02/2024"} color={'#423e3e'}>
                                            <span style={{ color: "#999", fontSize: "13px", marginBottom: "4px" }}>Đăng 3 ngày trước</span>
                                        </Tooltip>
                                        <Tooltip placement="bottom" color={'#423e3e'} title={heart ? "Bấm để lưu tin" : "Bấm để bỏ lưu tin"}>
                                                <Button danger onClick={onChange} icon={heart ? <HeartOutlined style={{color:"black"}} /> : <HeartFilled />} />
                                        </Tooltip>
                                    </Flex>
                                </Card>
                                </a>
                            </Col>
                        )
                    })}
                </Row>
                <div style={{width:"100%" , textAlign: "center", margin:"40px 0"}}>
                    <Button onClick={onLoadMore}>{statusLoadmore ? "Xem thêm" : <a href="/auth/register">Xem tiếp</a>}</Button>
                </div>

            </div>

        </>
    )
}
export default ListGoods