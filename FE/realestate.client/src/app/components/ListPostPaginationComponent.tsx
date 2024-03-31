import LabelCard from '@/components/public/HOC/labelCard';
import { formatCurrency, formatDate } from '@/shared/utils/common-helpers';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import { LineOutlined, PhoneOutlined } from '@ant-design/icons/lib/icons';
import Avatar from 'antd/es/avatar';
import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import List from 'antd/es/list';
import Tooltip from 'antd/es/tooltip';
import React, { useState } from 'react';
import Typography from "antd/es/typography";
import { LuDot } from 'react-icons/lu';
import Divider from 'antd/es/divider';
import dayjs from 'dayjs';

interface ListPostPaginationProps {
    header: string;
    data: any[];
}

const ListPostPaginationComponent: React.FC<ListPostPaginationProps> = (props) => {
    const { Paragraph } = Typography;
    const [isHidden, setIsHidden] = useState(true);

    const handleButtonClick = () => {
        setIsHidden(!isHidden);
    };
    return (
        <div>
            <List
                // loading={loading}
                style={{
                    width: '50%',
                    margin: 'auto'
                }}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                    style: { textAlign: "center" }
                }}
                dataSource={props.data}
                header={
                    <p
                        style={{
                            fontSize: "24px",
                            fontWeight: 500,
                            color: "#2C2C2C",
                            marginBottom: "20px"
                        }}
                    >{props.header}</p>
                }
                footer={
                    <div>
                        hiện có <b>45666</b> bất động sản.
                    </div>
                }
                renderItem={(item, i) => (
                    <a key={i}>
                        <Flex vertical className="hover-card" style={{
                            border: "1px solid #F2F2F2",
                            margin: "10px 0",
                            transition: "box-shadow 0.3s, border-color 0.3s",
                            borderRadius: "10px",
                        }}>
                            {/* ảnh sản phẩm */}
                            <a href={`posts/detail/${i}`} key={i}>
                                <List.Item style={{ padding: 0 }}>
                                    <img
                                        src={item?.firstImageUrl ? item?.firstImageUrl : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}
                                        style={{
                                            width: "100%",
                                            height: "300px",
                                            padding: 0,
                                            objectFit: "cover",
                                            borderTopLeftRadius: "10px",
                                            borderTopRightRadius: "10px"
                                        }}
                                    />
                                </List.Item>
                            </a>

                            {/* Thông tin sản phẩm */}
                            <a href={`posts/detail/${i}`} key={i}>
                                <List.Item
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div style={{
                                        fontFamily: "Lexend Medium, Roboto, Arial",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                    }}>
                                        {
                                            item?.title ?
                                                (item?.title?.length > 50 ?
                                                    item?.title.substring(0, 50) + "..." :
                                                    item?.title)
                                                : 'Tiêu đề sản phẩm'
                                        }
                                    </div>

                                    <div>
                                        <span style={{
                                            color: '#ff4d4f',
                                            marginRight: '10px',
                                            fontWeight: 600,
                                        }}>{item?.price ? formatCurrency(item?.price) : 'Giá thỏa thuận'}</span>

                                        <span style={{
                                            color: '#ff4d4f',
                                            marginRight: '10px',
                                            fontWeight: 600,
                                        }}> {item?.area ? item?.area : 0} m2 </span>

                                        <span>{item?.district ? item?.district : 'Thành phố'}, {item?.province ? item?.privince : "Tỉnh"}</span>
                                    </div>

                                    <div
                                        style={{
                                            height: "58px",
                                            lineHeight: "20px",
                                        }}
                                    >
                                        {
                                            item?.description ?
                                                (item?.description?.length > 300 ?
                                                    item?.description?.substring(0, 300) + "..." :
                                                    item?.description)
                                                : 'Mô tả sản phẩm'
                                        }
                                    </div>
                                </List.Item>
                            </a>
                            <Divider />

                            {/* Thông tin người đăng bán và lưu tin */}
                            <List.Item style={{ display: 'flex', alignItems: 'flex-start', paddingBottom: 0, paddingTop: 0, }}>
                                <List.Item.Meta
                                    avatar={<Avatar size={40} src={item.avatar} />}
                                    title={<h2 className="ellipsis-multiline2"
                                        style={{
                                            fontFamily: "Lexend Medium, Roboto, Arial",
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            fontWeight: "500",
                                            color: "#2C2C2C",
                                            height: "58",
                                            letterSpacing: "1px"
                                        }}>{item?.user?.username ? item?.user?.username : 'Tên người dùng'}</h2>}
                                    description={
                                        item?.createDate ?
                                            <Tooltip
                                                placement="bottom"
                                                title={dayjs(item?.createdDate).format("DD/MM/YYYY")}
                                                color={"#423e3e"}
                                            >
                                                <span
                                                    style={{
                                                        color: "#999",
                                                        fontSize: "13px",
                                                        marginBottom: "4px",
                                                        fontFamily: "__Lexend_126e48, __Lexend_Fallback_126e48",
                                                    }}
                                                >
                                                    {formatDate(dayjs(item?.createdDate))}
                                                </span>
                                            </Tooltip>
                                            : 'Ngày đăng'
                                    }
                                />

                                <div style={{ display: 'flex', }}>
                                    <Button
                                        style={{
                                            background: "#009BA1",
                                            margin: "0 10px 0 10px",
                                        }}
                                        onClick={handleButtonClick}
                                    >
                                        {item?.phone ?
                                        <Paragraph style={styleButton} copyable={{ text: item?.phone }}>
                                            <PhoneOutlined style={{ fontSize: "20px" }} /> {isHidden ? item?.phone.toString().replace(/\d(?=\d{4})/g, "*") : '012345678'}
                                            <LuDot />
                                            Hiện số
                                        </Paragraph>
                                        : 
                                        <Paragraph style={styleButton} copyable={{ text: 'số điện thoại' }}>
                                            <PhoneOutlined style={{ fontSize: "20px" }} /> {isHidden ? '01245555534'.toString().replace(/\d(?=\d{4})/g, "*") : '012345678'}
                                            <LuDot />
                                            Hiện số
                                        </Paragraph>
                                        }
                                    </Button>

                                    <Tooltip placement="top" title={"Lưu tin"}>
                                        <Button style={{ width: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <HeartOutlined />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </List.Item>
                        </Flex>
                    </a>
                )}
            />
        </div>
    );
};

export default ListPostPaginationComponent;

var styleButton: any = {
    fontFamily: "Lexend Medium, Roboto, Arial",
    background: "#009BA1",
    color: "#fff",
    //margin: "10px 0",
};