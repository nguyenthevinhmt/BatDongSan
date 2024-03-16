"use client";
import isAuth from "@/app/isAuth";
import { UserType } from "@/shared/consts/userType";
import { Button, Dropdown, Flex, Form, Input, List, Menu, Modal, Select, Space, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import { postStatus } from "@/shared/consts/postStatus";
import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import type { TableColumnsType } from 'antd';
import { findAll, approvedPost, updateStatus, getById } from "@/services/post/post.service";
import Image from 'next/image';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

interface IPost {
    id: number;
    title: string;
    description: string;
    rentalObject?: number;
    youtubeLink?: string;
    postTypeId: number;
    realEstateTypeId: number;
    status: number;
    mediaUrl?: string;
};

interface IDetailPost {
    id: number;
    title: string;
    description: string;
    province: string;
    district: string;
    ward: string;
    street: string;
    detailAddress: string;
    area: number;
    price: number;
    youtubeLink: string;
    status: number;
    postTypeId: number;
    realEstateTypeId: number;
    listMedia: MediaType[];
};

interface MediaType {
    name: string;
    description: string;
    mediaUrl: string;
};

interface FormValues {
    status?: number;
    postTypeId?: number;
    realEstateTypeId?: number;
    keyword?: string;
};

const realEstateType = [
    {
        value: null,
        label: "Tất cả",
    },
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
    }
];

const postType = [
    {
        value: null,
        label: "Tất cả",
    },
    {
        value: 1,
        label: "Bán",
    },
    {
        value: 2,
        label: "Cho thuê",
    }
];

const Status = [
    {
        value: null,
        label: "Tất cả",
    },
    {
        value: postStatus.INIT,
        label: "Khởi tạo",
    },
    {
        value: postStatus.PENDING,
        label: "Chờ xử lý/yêu cầu duyệt",
    },
    {
        value: postStatus.POSTED,
        label: "Đã đăng",
    },
    {
        value: postStatus.CANCEL,
        label: "Hủy duyệt",
    },
    {
        value: postStatus.REMOVED,
        label: "Đã gỡ",
    }
];



const ManagePost = () => {
    const [form] = Form.useForm<FormValues>();
    const [listPost, setListPost] = React.useState<IPost[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailPost, setDetailPost] = useState<IDetailPost>({} as IDetailPost);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await findAll({ pageSize: 10, pageNumber: 1 });
            const data = res?.data.items;
            const posts: IPost[] = data.map((post: any) => ({
                id: post.id,
                title: post.title,
                description: post.description,
                rentalObject: post.rentalObject,
                youtubeLink: post.youtubeLink,
                postTypeId: post.postTypeId,
                realEstateTypeId: post.realEstateTypeId,
                status: post.status,
                mediaUrl: post.firstImageUrl,
            }));

            setListPost(posts);
            setTotalItems(res?.data.totalItems);
        }

        fetchData();
    }, []);

    const actions = [
        {
            key: 1,
            label: "phê duyệt",
            onClick: async (id: number) => {
                const res = await approvedPost(id);
                handleSearch(pageNumber, pageSize);
                console.log(res);
            }
        },
        {
            key: 2,
            label: "hủy duyệt",
            onClick: async (id: number) => {
                const res = await updateStatus({ id: id, status: postStatus.REMOVED });
                handleSearch(pageNumber, pageSize);
                console.log(res);
            }
        },
        {
            key: 3,
            label: "xem chi tiết",
            onClick: async (id: number) => {
                const res = await getById(id);
                const data = res?.data.data;
                const post: IDetailPost = {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    province: data.province,
                    district: data.district,
                    ward: data.ward,
                    street: data.street,
                    detailAddress: data.detailAddress,
                    area: data.area,
                    price: data.price,
                    youtubeLink: data.youtubeLink,
                    status: data.status,
                    postTypeId: data.postTypeId,
                    realEstateTypeId: data.realEstateTypeId,
                    listMedia: data.medias ? data.medias.map((media: any) => ({
                        name: media.name,
                        description: media.description,
                        mediaUrl: media.mediaUrl
                    })) : []
                }

                setDetailPost(post);
                showModal();
            }
        }
    ];

    const columns: TableColumnsType<IPost> = [
        {
            title: "ID",
            width: 3,
            dataIndex: "id",
            key: "id",
            fixed: 'left',
        },
        {
            title: "Danh sách hình ảnh",
            width: 100,
            dataIndex: "listMedia",
            key: "listMedia",
            render: (index, record) => {
                const isAbsoluteUrl = /^https?:\/\//i.test(record?.mediaUrl || '');
                const imageUrl = isAbsoluteUrl ? record?.mediaUrl || '' : "https://res.cloudinary.com/deurdoich/image/upload/v1710429504/DATN/g5flsesusjkanoa6fg0q.jpg";
                return (
                    <Image
                        src={imageUrl}
                        alt="Mô tả ảnh"
                        width={100}
                        height={80}
                        style={{ objectFit: "cover" }}
                    />
                )
            }

        },
        {
            title: "Tiêu đề",
            width: 40,
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Mô tả",
            width: 100,
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Loại bất động sản",
            width: 170,
            dataIndex: "realEstateTypeId",
            key: "realEstateTypeId",
            render: (realEstateTypeId: number) => {
                const realEstateTypeItem = realEstateType.find(item => item.value === realEstateTypeId);
                return realEstateTypeItem ? realEstateTypeItem.label : '';
            },
        },
        {
            title: "Loại bài đăng",
            width: 50,
            dataIndex: "postTypeId",
            key: "postTypeId",
            render: (postTypeId: number) => {
                const postTypeItem = postType.find(item => item.value === postTypeId);
                return postTypeItem ? postTypeItem.label : '';
            },
        },
        {
            title: "Trạng thái",
            width: 100,
            dataIndex: "status",
            key: "status",
            fixed: 'right',
            render: (statusId: number) => {
                const statusItem = Status.find(item => item.value === statusId);
                return statusItem ? statusItem.label : '';
            },
        },
        {
            title: "",
            width: 50,
            dataIndex: "action",
            key: "action",
            fixed: 'right',
            render: (text, record) => {
                let items = [];
                if (record.status === postStatus.INIT) {
                    items.push(actions[1]);
                    items.push(actions[2]);
                }
                else if (record.status === postStatus.PENDING) {
                    items.push(actions[0]);
                    items.push(actions[1]);
                    items.push(actions[2]);
                } else if (record.status === postStatus.POSTED) {
                    items.push(actions[1]);
                    items.push(actions[2]);
                } else if (record.status === postStatus.CANCEL) {
                    items.push(actions[2]);
                } else {
                    items.push(actions[2]);
                }

                const menu = (
                    <Menu>
                        {items.map((item, index) => (
                            <Menu.Item key={index} onClick={() => item.onClick(record.id)}>
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                );

                return (
                    <Space size="middle">
                        <Dropdown overlay={menu} placement="bottomRight">
                            <a>
                                <EllipsisOutlined style={{ fontSize: 25 }} />
                            </a>
                        </Dropdown>
                    </Space>
                )
            }
        }
    ]

    const handleSearch = async (pageNumber?: number, pageSize?: number) => {
        const values = form.getFieldsValue();
        const res = await findAll({
            pageSize: pageSize || -1,
            pageNumber: pageNumber || 1,
            status: values.status,
            postType: values.postTypeId,
            realEstateType: values.realEstateTypeId,
            keyword: values.keyword
        });
        const data = res?.data.items;
        const posts: IPost[] = data.map((post: any) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            rentalObject: post.rentalObject,
            youtubeLink: post.youtubeLink,
            postTypeId: post.postTypeId,
            realEstateTypeId: post.realEstateTypeId,
            status: post.status,
            mediaUrl: post.firstImageUrl,
        }));

        setListPost(posts);
        setTotalItems(res?.data.totalItems);
    }

    return (
        <Flex justify="center" gap="small" vertical>
            <div
                style={{
                    width: "100%",
                    margin: "auto",
                    padding: 20,
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleSearch}
                >
                    <p
                        style={{
                            fontSize: 24,
                            fontWeight: "500",
                            marginBottom: 5,
                        }}
                    >
                        Danh sách bài đăng
                    </p>

                    <Flex justify="flex-start" align="flex-end">
                        <Form.Item
                            name="keyword"
                            label={<strong>Từ khóa</strong>}
                            style={{ marginRight: 10 }}
                        >
                            <Input placeholder="Tìm theo tiêu đề" />
                        </Form.Item>

                        <Form.Item
                            name="realEstateTypeId"
                            label={<strong>Loại bất động sản</strong>}
                            style={{ marginRight: 10 }}
                        >
                            <Select
                                defaultValue={realEstateType[0].value}
                                placeholder="Chọn loại bất động sản"
                                options={realEstateType}
                            />
                        </Form.Item>

                        <Form.Item
                            name="postTypeId"
                            label={<strong>Loại bài đăng</strong>}
                            style={{ marginRight: 10 }}
                        >
                            <Select
                                defaultValue={postType[0].value}
                                placeholder="Chọn loại bài đăng"
                                options={postType}
                            />
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label={<strong>Trạng thái bài đăng</strong>}
                            style={{ marginRight: 10 }}
                        >
                            <Select
                                defaultValue={Status[0].value}
                                showSearch
                                placeholder="Chọn loại trạng thái bài đăng"
                                options={Status}
                            />
                        </Form.Item>

                        <Form.Item style={{}}>
                            <Button
                                style={{
                                    padding: "0 15px",
                                    color: "white",
                                    backgroundColor: "rgb(224, 60, 49)",
                                    border: "none",
                                }}
                                type="primary"
                                htmlType="submit"
                            >
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>

                <div>
                    <Table
                        columns={columns}
                        pagination={{
                            position: ["none", "bottomCenter"],
                            pageSize: pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30', '40'],
                            total: totalItems,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // Show total number of records and current display range
                            itemRender: (current, type, originalElement) => {
                                if (type === 'prev') {
                                    return <a>Previous</a>;
                                }
                                if (type === 'next') {
                                    return <a>Next</a>;
                                }
                                return originalElement;
                            },
                            onChange: (pageNumber, pageSize) => {
                                setPageNumber(pageNumber);
                                setPageSize(pageSize);
                                handleSearch(pageNumber, pageSize);
                            }
                        }}
                        dataSource={listPost}
                        scroll={{ x: 'max-content' }}
                    />
                </div>

                <div>
                    <Modal title="Thông tin chi tiết bài đăng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <List
                            itemLayout="vertical"
                            dataSource={[detailPost]}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={"Tiêu đề:"}
                                        description={item.title}
                                    />
                                    <List.Item.Meta
                                        title={"Mô tả:"}
                                        description={item.description}
                                    />
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={[detailPost]}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={"Tỉnh/Thành phố:"}
                                                    description={item.province}
                                                />
                                                <List.Item.Meta
                                                    title={"Quận/Huyện:"}
                                                    description={item.district}
                                                />
                                            </List.Item>
                                        )} 
                                    />
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={[detailPost]}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={"Phường/Xã:"}
                                                    description={item.ward}
                                                />
                                                <List.Item.Meta
                                                    title={"Đường:"}
                                                    description={item.street}
                                                />
                                            </List.Item>
                                        )} 
                                    />
                                    <List.Item.Meta
                                        title={"Địa chỉ chi tiết:"}
                                        description={item.detailAddress}
                                    />
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={[detailPost]}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={"Diện tích:"}
                                                    description={item.area + " m2"}
                                                />
                                                <List.Item.Meta
                                                    title={"Giá:"}
                                                    description={item.price}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    <List.Item.Meta
                                        title={"Link youtube:"}
                                        description={<a href={item.youtubeLink}>item.youtubeLink</a>}
                                    />
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={[detailPost]}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={"Loại bài đăng:"}
                                                    description={(() => {
                                                        const postTypeItem = postType.find(i => i.value === item.postTypeId);
                                                        return postTypeItem ? postTypeItem.label : '';
                                                    })()}
                                                />
                                                <List.Item.Meta
                                                    title={"Loại bất động sản:"}
                                                    description={(() => {
                                                        const realEstateItem = realEstateType.find(i => i.value === item.realEstateTypeId);
                                                        return realEstateItem ? realEstateItem.label : '';
                                                    })()}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    <List.Item.Meta
                                        title={"Trạng thái:"}
                                        description={(() => {
                                            const statusItem = Status.find(i => i.value === item.status);
                                            return statusItem ? statusItem.label : '';
                                        })()}
                                    />
                                    <List.Item.Meta
                                        title={"Danh sách hình ảnh:"}
                                        description={
                                            <List
                                                grid={{ gutter: 16, column: 4 }}
                                                dataSource={item.listMedia}
                                                renderItem={media => (
                                                    <List.Item>
                                                        <Image
                                                            src={media.mediaUrl}
                                                            alt={media.description}
                                                            width={100}
                                                            height={80}
                                                            style={{ objectFit: "cover" }}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Modal>
                </div>
            </div>
        </Flex>
    );
};

export default isAuth(ManagePost, [UserType.ADMIN, UserType.CUSTOMER]);
