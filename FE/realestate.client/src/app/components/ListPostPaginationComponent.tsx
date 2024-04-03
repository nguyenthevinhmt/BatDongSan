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
import React, { useEffect, useState } from 'react';
import Typography from "antd/es/typography";
import { LuDot } from 'react-icons/lu';
import Divider from 'antd/es/divider';
import dayjs from 'dayjs';
import Link from 'next/link';
import { OptionConst } from '@/shared/consts/PostOption.const';
import { addToFavorites, getFavorites, isFavorite, removeFromFavorites } from '@/shared/utils/SavePosts-localStorage';
import { FaHeart } from 'react-icons/fa';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { IoMdHeart } from 'react-icons/io';

interface ListPostPaginationProps {
    header: string;
    data: any[];
    totalItem?: number;
}

const ListPostPaginationComponent: React.FC<ListPostPaginationProps> = (props) => {
    const { Paragraph } = Typography;
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        //re-render component when change localStorage
    }, [isChange]);

    const handleSavePost = (postId: any) => {
        if (isFavorite(postId)) {
            removeFromFavorites(postId);
            console.log("localStorage: ", getFavorites());
            console.log('remove', postId);
        } else {
            addToFavorites(postId);
            console.log("localStorage: ", getFavorites());
            console.log('add', postId);
        }
    };

    return (
        <div>
            <List
                style={{
                    width: '100%',
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
                            color: "#2C2C2C"
                        }}
                    >{props.header}</p>
                }
                footer={
                    <div>
                        hiện có <b>{props.totalItem ? props.totalItem : 0}</b> bất động sản.
                    </div>
                }
                renderItem={(item, i) => (
                    <div key={i}>
                        {
                            item.options === OptionConst.NORMAL ?
                                <Flex vertical className="hover-card" style={{
                                    border: "1px solid #F2F2F2",
                                    margin: "10px 0",
                                    transition: "box-shadow 0.3s, border-color 0.3s",
                                    borderRadius: "10px",
                                }}>
                                    {/* ảnh sản phẩm */}
                                    <Link href={`/home/post/detail/${item?.id}`}>
                                        <List.Item style={{ padding: 0 }}>
                                            <img
                                                src={item?.firstImageUrl ? item?.firstImageUrl : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    padding: 0,
                                                    objectFit: "cover",
                                                    borderTopLeftRadius: "10px",
                                                    borderTopRightRadius: "10px"
                                                }}
                                            />
                                        </List.Item>
                                    </Link>

                                    {/* Thông tin sản phẩm */}
                                    <Link href={`/home/post/detail/${item?.id}`}>
                                        <List.Item
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                paddingTop: 0,
                                                paddingRight: 0,
                                                paddingBottom: 0,
                                                paddingLeft: 10,
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

                                            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
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

                                                <span>{item?.district ? item?.district : 'Thành phố'}, {item?.province ? item?.province : "Tỉnh"}</span>
                                            </div>

                                            <div
                                                style={{
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
                                    </Link>
                                    <Divider />

                                    {/* Thông tin người đăng bán và lưu tin */}
                                    <List.Item style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 0, paddingTop: 0, paddingRight: 10, paddingLeft: 10 }}>
                                        <Link href={{
                                            pathname: "/u/list-post",
                                            query: {
                                                id: item?.user?.id,
                                                fullName: item?.user?.fullName,
                                                avatarUrl: item?.user?.avatarUrl,
                                                phone: item?.user?.phone,
                                            },
                                        }}
                                            style={{}}
                                        >
                                            <List.Item.Meta
                                                style={{ width: 50 }}
                                                avatar={<Avatar size={40} src={item?.user?.avatarUrl ? item?.user.avatarUrl : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"} />}
                                                title={<p className="ellipsis-multiline2"
                                                    style={{
                                                        width: 200,
                                                        fontFamily: "Lexend Medium, Roboto, Arial",
                                                        fontSize: "14px",
                                                        lineHeight: "20px",
                                                        fontWeight: "500",
                                                        color: "#2C2C2C",
                                                        height: "58",
                                                        letterSpacing: "1px"
                                                    }}>{item?.user?.fullName ? item?.user?.fullName : 'Tên người dùng'}</p>}
                                                description={
                                                    item?.createdDate ?
                                                        <Tooltip
                                                            placement="bottom"
                                                            title={dayjs(item?.createdDate).format("DD/MM/YYYY")}
                                                            color={"#423e3e"}
                                                        >
                                                            <p
                                                                style={{
                                                                    width: 200,
                                                                    color: "#999",
                                                                    fontSize: "13px",
                                                                    marginBottom: "4px",
                                                                    fontFamily: "__Lexend_126e48, __Lexend_Fallback_126e48",
                                                                }}
                                                            >
                                                                {formatDate(dayjs(item?.createdDate))}
                                                            </p>
                                                        </Tooltip>
                                                        : 'Ngày đăng'
                                                }
                                            />
                                        </Link>

                                        <div style={{ display: 'flex', }}>
                                            <Button
                                                style={{
                                                    background: "#009BA1",
                                                    margin: "0 10px 0 10px",
                                                }}
                                            >
                                                {item?.user?.phone ?
                                                    <Paragraph style={styleButton} copyable={{ text: item?.user?.phone }}>
                                                        <PhoneOutlined style={{ fontSize: "20px" }} /> {item?.user?.phone.toString() ?? '012345678'}
                                                        <LuDot />
                                                    </Paragraph>
                                                    :
                                                    <Paragraph style={styleButton} copyable={{ text: 'số điện thoại' }}>
                                                        <PhoneOutlined style={{ fontSize: "20px" }} /> {'01245555534'.toString() ?? '012345678'}
                                                        <LuDot />
                                                    </Paragraph>
                                                }
                                            </Button>

                                            <Tooltip placement="top" title={"Lưu tin"}>
                                                    <Button
                                                        style={{
                                                            width: "30px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: isFavorite(item?.id) ? "#ff4d4f" : "black",
                                                            border: isFavorite(item?.id) ? "1px solid #ff4d4f" : "1px solid black",
                                                        }}
                                                        onClick={() => {
                                                            handleSavePost(item?.id);
                                                            setIsChange(!isChange);
                                                        }}
                                                        icon={
                                                            isFavorite(item?.id) ? (
                                                                <PiHeartFill
                                                                    style={{ color: "red", borderColor: "red" }}
                                                                />
                                                            ) : (
                                                                <PiHeart />
                                                            )
                                                        }
                                                    >
                                                    </Button>
                                                </Tooltip>
                                        </div>
                                    </List.Item>
                                </Flex>
                                :
                                <LabelCard
                                    text={
                                        item.options === OptionConst.SILVER ? 'VIP BẠC' :
                                            item.options === OptionConst.GOLD ? 'VIP VÀNG' :
                                                item.options === OptionConst.DIAMOND ? 'VIP KIM CƯƠNG' : ''
                                    }
                                    color={
                                        item.options === OptionConst.SILVER ? "#009BA1" :
                                            item.options === OptionConst.GOLD ? "#E3AA49" :
                                                item.options === OptionConst.DIAMOND ? "#E03C6D" : ''
                                    }
                                >
                                    <Flex vertical className="hover-card" style={{
                                        border: "1px solid #F2F2F2",
                                        margin: "10px 0",
                                        transition: "box-shadow 0.3s, border-color 0.3s",
                                        borderRadius: "10px",
                                    }}>
                                        {/* ảnh sản phẩm */}
                                        <Link href={`/home/post/detail/${item?.id}`}>
                                            <List.Item style={{ padding: 0 }}>
                                                <img
                                                    src={item?.firstImageUrl ? item?.firstImageUrl : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}
                                                    style={{
                                                        width: "100%",
                                                        height: "200px",
                                                        padding: 0,
                                                        objectFit: "cover",
                                                        borderTopLeftRadius: "10px",
                                                        borderTopRightRadius: "10px"
                                                    }}
                                                />
                                            </List.Item>
                                        </Link>

                                        {/* Thông tin sản phẩm */}
                                        <Link href={`/home/post/detail/${item?.id}`}>
                                            <List.Item
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    paddingTop: 0,
                                                    paddingRight: 0,
                                                    paddingBottom: 0,
                                                    paddingLeft: 10,
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

                                                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
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

                                                    <span>{item?.district ? item?.district : 'Thành phố'}, {item?.province ? item?.province : "Tỉnh"}</span>
                                                </div>

                                                <div
                                                    style={{
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
                                        </Link>
                                        <Divider />

                                        {/* Thông tin người đăng bán và lưu tin */}
                                        <List.Item style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 0, paddingTop: 0, paddingRight: 10, paddingLeft: 10 }}>
                                            <Link href={{
                                                pathname: "/u/list-post",
                                                query: {
                                                    id: item?.user?.id,
                                                    fullName: item?.user?.fullName,
                                                    avatarUrl: item?.user?.avatarUrl,
                                                    phone: item?.user?.phone,
                                                },
                                            }}
                                                style={{}}
                                            >
                                                <List.Item.Meta
                                                    style={{ width: 50 }}
                                                    avatar={<Avatar size={40} src={item?.user?.avatarUrl ? item?.user.avatarUrl : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"} />}
                                                    title={<p className="ellipsis-multiline2"
                                                        style={{
                                                            width: 200,
                                                            fontFamily: "Lexend Medium, Roboto, Arial",
                                                            fontSize: "14px",
                                                            lineHeight: "20px",
                                                            fontWeight: "500",
                                                            color: "#2C2C2C",
                                                            height: "58",
                                                            letterSpacing: "1px"
                                                        }}>{item?.user?.fullName ? item?.user?.fullName : 'Tên người dùng'}</p>}
                                                    description={
                                                        item?.createdDate ?
                                                            <Tooltip
                                                                placement="bottom"
                                                                title={dayjs(item?.createdDate).format("DD/MM/YYYY")}
                                                                color={"#423e3e"}
                                                            >
                                                                <p
                                                                    style={{
                                                                        width: 200,
                                                                        color: "#999",
                                                                        fontSize: "13px",
                                                                        marginBottom: "4px",
                                                                        fontFamily: "__Lexend_126e48, __Lexend_Fallback_126e48",
                                                                    }}
                                                                >
                                                                    {formatDate(dayjs(item?.createdDate))}
                                                                </p>
                                                            </Tooltip>
                                                            : 'Ngày đăng'
                                                    }
                                                />
                                            </Link>

                                            <div style={{ display: 'flex', }}>
                                                <Button
                                                    style={{
                                                        background: "#009BA1",
                                                        margin: "0 10px 0 10px",
                                                    }}
                                                >
                                                    {item?.user?.phone ?
                                                        <Paragraph style={styleButton} copyable={{ text: item?.user?.phone }}>
                                                            <PhoneOutlined style={{ fontSize: "20px" }} /> {item?.user?.phone.toString() ?? '012345678'}
                                                            <LuDot />
                                                        </Paragraph>
                                                        :
                                                        <Paragraph style={styleButton} copyable={{ text: 'số điện thoại' }}>
                                                            <PhoneOutlined style={{ fontSize: "20px" }} /> {'01245555534'.toString() ?? '012345678'}
                                                            <LuDot />
                                                        </Paragraph>
                                                    }
                                                </Button>

                                                <Tooltip placement="top" title={"Lưu tin"}>
                                                    <Button
                                                        style={{
                                                            width: "30px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: isFavorite(item?.id) ? "#ff4d4f" : "black",
                                                            border: isFavorite(item?.id) ? "1px solid #ff4d4f" : "1px solid black",
                                                        }}
                                                        onClick={() => {
                                                            handleSavePost(item?.id);
                                                            setIsChange(!isChange);
                                                        }}
                                                        icon={
                                                            isFavorite(item?.id) ? (
                                                                <PiHeartFill
                                                                    style={{ color: "red", borderColor: "red" }}
                                                                />
                                                            ) : (
                                                                <PiHeart />
                                                            )
                                                        }
                                                    >
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </List.Item>
                                    </Flex>
                                </LabelCard>
                        }
                    </div>
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