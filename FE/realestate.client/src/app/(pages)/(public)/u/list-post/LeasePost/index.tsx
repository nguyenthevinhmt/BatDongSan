import { useState } from 'react';
import Col from 'antd/lib/grid/col';
import Card from 'antd/lib/card';
import Row from 'antd/lib/grid/row';
import Flex from 'antd/es/flex';
import Tooltip from 'antd/es/tooltip';
import Empty from 'antd/es/empty';
import LineOutlined from "@ant-design/icons/LineOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import nodata from "@/assets/image/nodata.jpg";

const LeasePost = () => {
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
            }, {
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
        ]
    )
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false)
    }, 3000);
    return (
        <>
            <h1 style={{ fontSize: "24px", fontWeight: 700, fontFamily: "Nunito, sans-serif", color: "#000000", marginTop: "110px", marginBottom: "25px" }}>Danh sách đăng tin cho thuê ({quantityPost.length})</h1>
            {quantityPost.length
                ? <Row gutter={[24, 24]}>
                    {quantityPost.map((item, index) => {
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
                :
                <Empty
                    image={<img src={nodata.src} alt="Mô tả ảnh" />}
                    imageStyle={{ height: 200 }}
                    description={
                        <span style={{ fontSize: "17px", fontWeight: "500", color: "#9F9B9F" }}>
                            Chưa có tin đăng nào ở thời điểm hiện tại
                        </span>
                    }
                >
                </Empty>
            }
        </>
    )
}
export default LeasePost