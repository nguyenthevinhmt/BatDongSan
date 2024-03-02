"use client";

import React, { useEffect, useMemo, useState } from "react";
import "@/app/(pages)/(private)/styles/style.layout.css";
import {
  Button,
  Collapse,
  CollapseProps,
  Flex,
  Form,
  GetProp,
  Image,
  Input,
  Modal,
  Radio,
  Select,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  apiRemoveImage,
  apiUploadImage,
  getPublicIdFromUrl,
} from "@/services/post/post.service";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
interface MediaType {
  name: string;
  description: string;
  mediaUrl: string;
}
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreatePost = () => {
  const [form] = Form.useForm<{}>();
  const [postType, setPostType] = useState<String>("Bán");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listMedia, setListMedia] = useState<MediaType[]>([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleRemove = async (file: any) => {
    const originName = file.name.replace(/\.\w+$/, "");
    const selectFile = listMedia.filter((item) => item.name === originName)[0]
      .description;
    const publicId = getPublicIdFromUrl(selectFile)?.replace(/\.\w+$/, "");
    if (publicId) {
      await apiRemoveImage(publicId);
      setFileList((prevList) =>
        prevList.filter((item) => item.uid !== file.uid)
      );
      setListMedia((prevUrls) =>
        prevUrls.filter((url) => url.name !== file.name.replace(/\.\w+$/, ""))
      );
    }
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [arrow, setArrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    const response = await apiUploadImage({ file, onSuccess, onError });
    setListMedia((prevUrls) => [
      ...prevUrls,
      {
        mediaUrl: response.url,
        name: response.original_filename,
        description: response.secure_url,
      },
    ]);
  };

  return (
    <Flex justify="center" gap="small" vertical>
      <div
        style={{
          width: "50%",
          margin: "auto",
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <p
            style={{
              fontSize: 24,
              fontWeight: "500",
              marginBottom: 5,
            }}
          >
            Thông tin cơ bản
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", height: 40 }}
          >
            <Form.Item style={{ width: "50%" }}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor:
                    postType === "Bán" ? "rgba(0, 0, 0, 0.6)" : "#fff",
                  color: postType === "Bán" ? "white" : "rgb(153, 153, 153)",
                  fontWeight: postType === "Bán" ? "bold" : "normal",
                  border: "1px solid rgb(204, 204, 204)",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
                value={"Bán"}
                onClick={() => setPostType("Bán")}
              >
                Bán
              </Button>
            </Form.Item>
            <Form.Item style={{ width: "50%" }}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor:
                    postType === "Cho thuê" ? "rgba(0, 0, 0, 0.6)" : "#fff",
                  color:
                    postType === "Cho thuê" ? "white" : "rgb(153, 153, 153)",
                  fontWeight: postType === "Cho thuê" ? "bold" : "normal",
                  border: "1px solid rgb(204, 204, 204)",
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
                value={"Cho thuê"}
                onClick={() => setPostType("Cho thuê")}
              >
                Cho thuê
              </Button>
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="Loại bất động sản"
              label={<strong>Loại bất động sản</strong>}
              rules={[
                { required: true, message: "Vui lòng chọn loại bất động sản" },
              ]} // Thêm quy tắc yêu cầu
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chọn loại bất động sản"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Căn hộ chung cư",
                  },
                  {
                    value: "2",
                    label: "Nhà riêng",
                  },
                  {
                    value: "3",
                    label: "Nhà biệt thự, liền kề",
                  },
                  {
                    value: "4",
                    label: "Nhà mặt phố",
                  },
                  {
                    value: "5",
                    label: "Shophouse, nhà phố thương mại",
                  },
                  {
                    value: "6",
                    label: "Đất nền dự án",
                  },
                  {
                    value: "7",
                    label: "Đất",
                  },
                  {
                    value: "8",
                    label: "Trang trại, khu nghỉ dưỡng",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <Flex justify="center" gap={"small"}>
            <Form.Item
              name="Province"
              label={<strong>Tỉnh, thành phố</strong>}
              style={{ width: "50%" }}
              rules={[
                {
                  required: true,
                  message: "Tỉnh, Thành phố không được bỏ trống",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Distinct"
              label={<strong>Quận, huyện</strong>}
              style={{ width: "50%" }}
              rules={[
                { required: true, message: "Quận, huyện không được bỏ trống" },
              ]}
            >
              <Input />
            </Form.Item>
          </Flex>

          <Flex justify="center" gap={"small"}>
            <Form.Item
              name="Ward"
              label={<strong>Phường, xã</strong>}
              style={{ width: "50%" }}
              rules={[
                { required: true, message: "Phường, xã không được bỏ trống" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Street"
              label={<strong>Đường, phố</strong>}
              style={{ width: "50%" }}
              rules={[
                { required: true, message: "Đường, phố không được bỏ trống" },
              ]}
            >
              <Input />
            </Form.Item>
          </Flex>

          <Form.Item
            name="Detail address"
            label={<strong>Địa chỉ chi tiết</strong>}
            rules={[
              {
                required: true,
                message: "Địa chỉ chi tiết không được bỏ trống",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div
            style={{
              width: "100%",
              margin: "auto",
              backgroundColor: "#fff",
            }}
          >
            <p
              style={{
                fontSize: 24,
                marginBottom: 5,
                fontWeight: "500",
              }}
            >
              Thông tin bài viết
            </p>
            <Form.Item
              name={"Tiêu đề"}
              label={
                <strong>
                  Tiêu đề{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    (Tối thiểu 30 ký tự, tối đa 99 ký tự)
                  </span>
                </strong>
              }
              rules={[{ required: true, message: "* Tiêu đề bắt buộc nhập" }]}
            >
              <Tooltip
                placement="bottom"
                title={
                  <div style={{ width: "100%" }}>
                    <strong>Tiêu đề nên có:</strong>
                    <p>Loại hình bất động sản, diện tích, địa chỉ.</p>
                    <p>VD: bán nhà riêng 50m2 chính chủ tại Cầu Giấy</p>
                    <strong>Tiêu đề không nên có:</strong>
                    <p>Nội dung không liên quan đến bất động sản.</p>
                    <p>Số điện thoại chưa đăng ký.</p>
                    <p>
                      Tiếng Việt không dấu hoặc ngôn ngữ khác ngoài tiếng Việt.
                    </p>
                  </div>
                }
                arrow={mergedArrow}
              >
                <Input style={{ height: 50 }} />
              </Tooltip>
            </Form.Item>
            <Form.Item
              name={"Mô tả"}
              label={
                <strong>
                  Mô tả{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    (Tối thiểu 30 ký tự, tối đa 3000 ký tự)
                  </span>
                </strong>
              }
              rules={[{ required: true, message: "* Mô tả bắt buộc nhập" }]}
            >
              <Input.TextArea style={{ height: 150 }} />
            </Form.Item>
          </div>

          <div
            style={{
              width: "100%",
              margin: "auto",
              backgroundColor: "#fff",
            }}
          >
            <p
              style={{
                fontSize: 24,
                marginBottom: 5,
                fontWeight: "500",
              }}
            >
              Thông tin bất động sản
            </p>
            <Form.Item
              name="Detail address"
              label={<strong>Diện tích</strong>}
              rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
            >
              <Input type="number" placeholder="m2" />
            </Form.Item>
            <Flex justify="center" gap={"small"}>
              <Form.Item
                name="Ward"
                label={<strong>Mức giá</strong>}
                style={{ width: "70%" }}
                rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Đơn vị"
                label={<strong>Đơn vị</strong>}
                style={{ width: "30%" }}
                rules={[{ required: true, message: "Trường bắt buộc nhập" }]} // Thêm quy tắc yêu cầu
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "VND",
                    },
                    {
                      value: "2",
                      label: "Giá / m2",
                    },
                    {
                      value: "3",
                      label: "Thỏa thuận",
                    },
                  ]}
                />
              </Form.Item>
            </Flex>
          </div>

          <div
            style={{
              width: "100%",
              margin: "auto",
              backgroundColor: "#fff",
            }}
          >
            <p
              style={{
                fontSize: 24,
                marginBottom: 5,
                fontWeight: "500",
              }}
            >
              Hình ảnh & Video
            </p>
            <ul style={{ paddingLeft: 20 }}>
              <li>Đăng tối thiểu 4 ảnh thường với tin VIP</li>
              <li>Đăng tối đa 24 ảnh với tất cả các loại tin</li>
              <li>Hãy dùng ảnh thật, không trùng, không chèn SDT</li>
              <li>Mỗi ảnh kích thước tối thiểu 100x100 px, tối đa 15MB</li>
              <li>Mô tả ảnh tối đa 45 ký tự</li>
            </ul>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                customRequest={handleUpload}
                multiple={true}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onRemove={handleRemove}
                onChange={handleChange}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>
                    Bấm để chọn ảnh cần tải lên
                  </div>
                </button>
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <Image
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item
              name={"Link youtube"}
              label={<strong>Link youtube</strong>}
            >
              <Input placeholder="Dán đường dẫn youtube tại đây" />
            </Form.Item>
          </div>

          <div
            style={{
              width: "100%",
              margin: "auto",
              backgroundColor: "#fff",
            }}
          >
            <p
              style={{
                fontSize: 24,
                fontWeight: "500",
              }}
            >
              Thông tin liên hệ
            </p>
            <Flex justify="center" gap={"small"}>
              <Form.Item
                name="Province"
                label={<strong>Tên liên hệ</strong>}
                style={{ width: "50%" }}
                rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Distinct"
                label={<strong>Số điện thoại</strong>}
                style={{ width: "50%" }}
                rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
              >
                <Input />
              </Form.Item>
            </Flex>

            <Form.Item
              name="Detail address"
              label={<strong>Email</strong>}
              style={{ width: "50%", marginTop: "-5px" }}
              rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div
            style={{
              // height: 70,
              width: "100%",
              margin: "auto",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Form.Item>
                <Button
                  style={{
                    padding: "0 15px",
                    margin: "0 10px",
                    color: "#555",
                    backgroundColor: "#fafafa",
                    border: "1px solid #ccc",
                  }}
                  onClick={() => {
                    console.log("urls", listMedia);
                    console.log("urls1", fileList);
                  }}
                >
                  Hủy
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    padding: "0 15px",
                    color: "white",
                    backgroundColor: "rgb(224, 60, 49)",
                    border: "none",
                  }}
                >
                  Tiếp tục
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Flex>
  );
};

export default CreatePost;
