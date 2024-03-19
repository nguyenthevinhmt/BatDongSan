"use client";
import isAuth from '@/app/isAuth';
import { UserType } from '@/shared/consts/userType';
import { Form, TableColumnsType } from 'antd';
import React, { use, useState } from 'react';

interface ITransaction {
    id: number;
    walletID: number;
    amount: number;
    transactionNumber: string;
    transactionType: number;
    transactionFrom: string;
    transactionTo: string;
    description: string;
    createDate: string;
}
const WalletHistoryPage = () => {
    // Add your component logic here
    const [form] = Form.useForm<any>();
    const [listPost, setListPost] = useState<ITransaction[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [change, setChange] = useState(false);
  
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
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      handleSearch();
    }, [change]);
  
    const columns: TableColumnsType<ITransaction> = [
      {
        title: "#ID",
        width: 3,
        dataIndex: "id",
        key: "id",
        fixed: "left",
      },
      {
        title: "WalletId",
        width: 100,
        dataIndex: "walletId",
        key: "walletId",
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
        render: (text, record) => {
          return record.description.length > 20
            ? record.description.substring(0, 20) + "..."
            : record.description;
        }
      },
      {
        title: "Loại bất động sản",
        width: 170,
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
        width: 100,
        dataIndex: "status",
        key: "status",
        fixed: "right",
        render: (statusId: number) => {
          const statusItem = Status.find((item) => item.value === statusId);
            if (statusItem) {
                if (statusItem.value === postStatus.INIT) {
                    return <Tag icon={<ClockCircleOutlined />} color="default">khởi tạo</Tag>;
                } else if (statusItem.value === postStatus.PENDING) {
                    return <Tag icon={<SyncOutlined spin />} color="processing">chờ xử lý/ yêu cầu duyệt</Tag>;
                } else if (statusItem.value === postStatus.POSTED) {
                    return <Tag icon={<CheckCircleOutlined />} color="success">đã đăng</Tag>;
                } else if (statusItem.value === postStatus.CANCEL) {
                    return <Tag icon={<ExclamationCircleOutlined />} color="warning">hủy duyệt</Tag>;
                } else {
                    return <Tag icon={<MinusCircleOutlined />} color="error">đã gỡ</Tag>;
                }
          }
          else {
              return "";
          }
          
        },
      },
      {
        title: "",
        width: 50,
        dataIndex: "action",
        key: "action",
        fixed: "right",
        render: (text, record) => {
          let items = [];
          if (record.status === postStatus.INIT) {
            items.push(actions[1]);
            items.push(actions[2]);
          } else if (record.status === postStatus.PENDING) {
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
          );
        },
      },
    ];
  
    const handleSearch = async (pageNumber?: number, pageSize?: number) => {
      const values = form.getFieldsValue();
      const res = await findAll({
        pageSize: pageSize || -1,
        pageNumber: pageNumber || 1,
        status: values.status,
        postType: values.postTypeId,
        realEstateType: values.realEstateTypeId,
        keyword: values.keyword,
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
    };
  
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
                <Input placeholder="Tìm theo tiêu đề" onChange={() => setChange(!change)}/>
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
                  onChange={() => setChange(!change)}
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
                  onChange={() => setChange(!change)}
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
                  onChange={() => setChange(!change)}
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
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </Flex>
    );
};

export default isAuth(WalletHistoryPage, [UserType.ADMIN, UserType.CUSTOMER]);