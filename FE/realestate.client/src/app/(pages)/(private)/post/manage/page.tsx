"use client";
import isAuth from "@/app/isAuth";
import { UserType } from "@/shared/consts/userType";
import Dropdown from "antd/es/dropdown/dropdown";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Menu from "antd/es/menu";
import Select from "antd/es/select";
import Space from "antd/es/space";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
import React, { useEffect, useState } from "react";
import { postStatus } from "@/shared/consts/postStatus";
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import MinusCircleOutlined from "@ant-design/icons/MinusCircleOutlined";
import SyncOutlined from "@ant-design/icons/SyncOutlined";
import type { TableColumnsType } from "antd";
import {
  findAll,
  approvedPost,
  updateStatus,
  findAllPersonal,
} from "@/services/post/post.service";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

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
}

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

const Status = [
  {
    value: postStatus.INIT,
    label: "Khởi tạo",
    accept: [UserType.CUSTOMER],
  },
  {
    value: postStatus.PENDING,
    label: "Chờ xử lý/yêu cầu duyệt",
    accept: [UserType.ADMIN, UserType.CUSTOMER],
  },
  {
    value: postStatus.POSTED,
    label: "Đã đăng",
    accept: [UserType.ADMIN, UserType.CUSTOMER],
  },
  {
    value: postStatus.CANCEL,
    label: "Hủy duyệt",
    accept: [UserType.ADMIN, UserType.CUSTOMER],
  },
  {
    value: postStatus.REMOVED,
    label: "Đã gỡ",
    accept: [UserType.ADMIN, UserType.CUSTOMER],
  },
];

const ManagePost = () => {
  const authStore = useSelector((state: RootState) => state.auth);
  const role = authStore?.user?.data?.userType;

  const timerRef = React.useRef<any>(null);
  const [form] = Form.useForm<any>();
  const [listPost, setListPost] = React.useState<IPost[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [change, setChange] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (role === UserType.ADMIN) {
        const res = await findAll({ pageSize: 10, pageNumber: 1 });
        const data = res?.data.items;
        const posts: IPost[] = data?.map((post: any) => ({
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
      } else {
        const res = await findAllPersonal({ pageSize: 10, pageNumber: 1 });
        const data = res?.data.items;
        const posts: IPost[] = data?.map((post: any) => ({
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
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [change]);

  const actions = [
    {
      key: 1,
      label: "phê duyệt",
      onClick: async (id: number) => {
        const res = await approvedPost(id);
        handleSearch(pageNumber, pageSize);
        console.log(res);
      },
      accept: [UserType.ADMIN],
    },
    {
      key: 2,
      label: "hủy duyệt",
      onClick: async (id: number) => {
        const res = await updateStatus({ id: id, status: postStatus.CANCEL });
        handleSearch(pageNumber, pageSize);
        console.log(res);
      },
      accept: [UserType.ADMIN],
    },
    {
      key: 3,
      label: "xem chi tiết",
      onClick: (id: number) => {
        const role = authStore?.user?.data?.userType;
        return router.push(`/post/edit/?role=${role}&postId=${id}`);
      },
      accept: [UserType.ADMIN, UserType.CUSTOMER],
    },
    // {
    //   key: 4,
    //   label: "Đăng lại (chưa xử lý)",
    //   accept: [UserType.CUSTOMER]
    // }
  ];

  const columns: TableColumnsType<IPost> = [
    {
      title: "#ID",
      width: 20,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Danh sách hình ảnh",
      width: 50,
      dataIndex: "listMedia",
      key: "listMedia",
      render: (index, record) => {
        const isAbsoluteUrl = /^https?:\/\//i.test(record?.mediaUrl || "");
        const imageUrl = isAbsoluteUrl
          ? record?.mediaUrl || ""
          : "https://res.cloudinary.com/deurdoich/image/upload/v1710429504/DATN/g5flsesusjkanoa6fg0q.jpg";
        return (
          <Image
            src={imageUrl}
            alt="Mô tả ảnh"
            width={100}
            height={80}
            style={{ objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Tiêu đề",
      width: 80,
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      width: 100,
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        return record.description.length > 40
          ? record.description.substring(0, 40) + "..."
          : record.description;
      },
    },
    {
      title: "Loại bất động sản",
      width: 50,
      dataIndex: "realEstateTypeId",
      key: "realEstateTypeId",
      render: (realEstateTypeId: number) => {
        const realEstateTypeItem = realEstateType.find(
          (item) => item.value === realEstateTypeId
        );
        return realEstateTypeItem ? realEstateTypeItem.label : "";
      },
    },
    {
      title: "Loại bài đăng",
      width: 50,
      dataIndex: "postTypeId",
      key: "postTypeId",
      render: (postTypeId: number) => {
        const postTypeItem = postType.find((item) => item.value === postTypeId);
        return postTypeItem ? postTypeItem.label : "";
      },
    },
    {
      title: "Trạng thái",
      width: 70,
      dataIndex: "status",
      key: "status",
      fixed: "right",
      render: (statusId: number) => {
        const statusItem = Status.find((item) => item.value === statusId);
        if (statusItem) {
          if (statusItem.value === postStatus.INIT) {
            return (
              <Tag icon={<ClockCircleOutlined />} color="processing">
                Khởi tạo
              </Tag>
            );
          } else if (statusItem.value === postStatus.PENDING) {
            return (
              <Tag icon={<SyncOutlined spin />} color="warning">
                Chờ xử lý
              </Tag>
            );
          } else if (statusItem.value === postStatus.POSTED) {
            return (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Đã đăng
              </Tag>
            );
          } else if (statusItem.value === postStatus.CANCEL) {
            return (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Hủy duyệt
              </Tag>
            );
          } else if (statusItem.value === postStatus.REMOVED) {
            return (
              <Tag icon={<MinusCircleOutlined />} color="#ccc">
                Đã gỡ
              </Tag>
            );
          }
        } else {
          return "";
        }
      },
    },
    {
      title: "",
      width: 20,
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (text, record) => {
        let items = [];
        if (record.status === postStatus.INIT) {
          actions[1].accept.includes(role) && items.push(actions[1]);
          actions[2].accept.includes(role) && items.push(actions[2]);
        } else if (record.status === postStatus.PENDING) {
          actions[0].accept.includes(role) && items.push(actions[0]);
          actions[1].accept.includes(role) && items.push(actions[1]);
          actions[2].accept.includes(role) && items.push(actions[2]);
        } else if (record.status === postStatus.POSTED) {
          //actions[1].accept.includes(role) && items.push(actions[1]);
          actions[2].accept.includes(role) && items.push(actions[2]);
        } else if (record.status === postStatus.CANCEL) {
          actions[2].accept.includes(role) && items.push(actions[2]);
        } else {
          actions[2].accept.includes(role) && items.push(actions[2]);
          //actions[3].accept.includes(role) && items.push(actions[3]);
        }

        const menu = (
          <Menu>
            {items?.map((item, index) => (
              <Menu.Item
                key={index}
                onClick={() => item && item.onClick && item.onClick(record.id)}
              >
                {item?.label}
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
        );
      },
    },
  ];

  const handleSearch = async (pageNumber?: number, pageSize?: number) => {
    const values = form.getFieldsValue();
    if (role === UserType.ADMIN) {
      const res = await findAll({
        pageSize: pageSize || -1,
        pageNumber: pageNumber || 1,
        status: values.status,
        postType: values.postTypeId,
        realEstateType: values.realEstateTypeId,
        keyword: values.keyword,
      });

      const data = res?.data.items;

      const posts: IPost[] = data?.map((post: any) => ({
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
    } else {
      const res = await findAllPersonal({
        pageSize: pageSize || -1,
        pageNumber: pageNumber || 1,
        status: values.status,
        postType: values.postTypeId,
        realEstateType: values.realEstateTypeId,
        keyword: values.keyword,
      });

      const data = res?.data.items;

      const posts: IPost[] = data?.map((post: any) => ({
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
  };

  return (
    <Flex justify="center" gap="small" vertical>
      <div
        style={{
          width: "100%",
          height: "95vh",
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
              <Input
                allowClear={true}
                placeholder="Tìm theo tiêu đề"
                onChange={(e) => {
                  if (timerRef.current) {
                    clearTimeout(timerRef.current);
                  }

                  timerRef.current = setTimeout(() => {
                    setChange(!change);
                  }, 1000);
                }}
              />
            </Form.Item>

            <Form.Item
              name="realEstateTypeId"
              label={<strong>Loại bất động sản</strong>}
              style={{ marginRight: 10 }}
            >
              <Select
                allowClear={true}
                placeholder="Tất cả"
                options={realEstateType}
                onChange={() => setChange(!change)}
              />
            </Form.Item>

            <Form.Item
              name="postTypeId"
              label={<strong>Loại bài đăng</strong>}
              style={{ marginRight: 10 }}
            >
              <Select
                allowClear={true}
                placeholder="Tất cả"
                options={postType}
                onChange={() => setChange(!change)}
              />
            </Form.Item>

            <Form.Item
              name="status"
              label={<strong>Trạng thái bài đăng</strong>}
              style={{ marginRight: 10 }}
            >
              <Select
                allowClear={true}
                placeholder="Tất cả"
                options={Status.filter((item) => item.accept.includes(role))}
                onChange={() => setChange(!change)}
              />
            </Form.Item>
          </Flex>
        </Form>

        <div style={{ height: "90%" }}>
          <Table
            columns={columns}
            pagination={{
              position: ["none", "bottomCenter"],
              pageSize: pageSize,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "40"],
              total: totalItems,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`, // Show total number of records and current display range
              itemRender: (current, type, originalElement) => {
                if (type === "prev") {
                  return <a>Previous</a>;
                }
                if (type === "next") {
                  return <a>Next</a>;
                }
                return originalElement;
              },
              onChange: (pageNumber, pageSize) => {
                setPageNumber(pageNumber);
                setPageSize(pageSize);
                handleSearch(pageNumber, pageSize);
              },
            }}
            dataSource={listPost}
            scroll={{ x: 1500, y: 400 }}
          />
        </div>
      </div>
    </Flex>
  );
};

export default isAuth(ManagePost, [UserType.ADMIN, UserType.CUSTOMER]);
