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
  addPost
} from "@/services/post/post.service";
import { getUserInfo } from "@/services/user/user.service";
import { getProvinces, getDistricts, getWards } from "@/services/post/vnAddress.service";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface post {
  title: string,
  description: string,
  province: string,
  distinct: string,
  ward: string,
  street: string,
  detailAddress: string,
  area: number,
  price: number,
  rentalObject: number,
  youtubeLink: string,
  postTypeId: number,
  realEstateTypeId: number,
  walletNumber: string,
  transactionAmount: number,
  transactionNumber: string,
  listMedia: MediaType[]
}

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

const { Option } = Select;

const CreatePost = () => {
  const [form] = Form.useForm<{}>();
  const [postType, setPostType] = useState<number>(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listMedia, setListMedia] = useState<MediaType[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const info = await getUserInfo();
      const response = info?.data.data;
      const provincesResponse = await getProvinces();

      setFullName(response.fullname);
      setPhone(response.phoneNumber);
      setEmail(response.email);
      setProvinces(provincesResponse?.data);
      setDistricts([]);
      setWards([]);
    }

    getData();
  }, []);

  const initialValues = {
    name: fullName,
    phonNumber: phone,
    email: email
  }

  // Xử lý sự kiện khi chọn tỉnh/thành phố
  const handleProvinceChange = async (value: any, option: any) => {
    const provinceId = option.key;
    const districtsResponse = await getDistricts(); // Gọi API lấy danh sách quận/huyện
    
    const filteredDistricts = districtsResponse?.data.filter(
      (district: any) => district.cityId === provinceId
    );

    setDistricts(filteredDistricts);
    // Reset danh sách phường/xã
    setWards([]);
  };

  // Xử lý sự kiện khi chọn quận/huyện
  const handleDistrictChange = async (value: any, option: any) => {
    const districtId = option.key;
    const wardsResponse = await getWards(); // Gọi API lấy danh sách quận/huyện
    
    const filteredWards = wardsResponse?.data.filter(
      (ward: any) => ward.districtId === districtId
    );

    setWards(filteredWards);
  };

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

  const handleSubmit = async () => {
    const value = await form.validateFields() as post;

    const postInfo: post = {
      title: value.title,
      description: value.description,
      province: value.province,
      distinct: value.distinct,
      ward: value.ward,
      street: value.street,
      detailAddress: value.detailAddress,
      area: value.area,
      price: value.price,
      rentalObject: 1,
      youtubeLink: value.youtubeLink,
      postTypeId: postType,
      realEstateTypeId: value.realEstateTypeId,
      walletNumber: "3", //tự tạo trong db
      transactionAmount: 3, //tự tạo trong db
      transactionNumber: "string", //tự tạo trong db
      listMedia: listMedia
    };

    const response = await addPost(postInfo);
    console.log("đã đăng tin!", response?.data);
  }

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
        <Form form={form} layout="vertical" autoComplete="off" onFinish={handleSubmit} initialValues={initialValues}>
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
                    postType === 1 ? "rgba(0, 0, 0, 0.6)" : "#fff",
                  color: postType === 1 ? "white" : "rgb(153, 153, 153)",
                  fontWeight: postType === 1 ? "bold" : "normal",
                  border: "1px solid rgb(204, 204, 204)",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
                value={1}
                onClick={() => setPostType(1)}
              >
                Bán
              </Button>
            </Form.Item>
            <Form.Item style={{ width: "50%" }}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor:
                    postType === 2 ? "rgba(0, 0, 0, 0.6)" : "#fff",
                  color:
                    postType === 2 ? "white" : "rgb(153, 153, 153)",
                  fontWeight: postType === 2 ? "bold" : "normal",
                  border: "1px solid rgb(204, 204, 204)",
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
                value={2}
                onClick={() => setPostType(2)}
              >
                Cho thuê
              </Button>
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="realEstateTypeId"
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
              name="province"
              label={<strong>Tỉnh, thành phố</strong>}
              style={{ width: "50%" }}
              rules={[
                {
                  required: true,
                  message: "Tỉnh, Thành phố không được bỏ trống",
                },
              ]}
            >
              <Select
                placeholder="Chọn tỉnh/thành phố"
                onChange={(value, option) => handleProvinceChange(value, option)}
              >
                {provinces.map((province) => (
                  <Option key={province['cityId']} value={province['name']}>
                    {province['name']}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="distinct"
              label={<strong>Quận, huyện</strong>}
              style={{ width: "50%" }}
              rules={[
                { required: true, message: "Quận, huyện không được bỏ trống" },
              ]}
            >
              <Select
                placeholder="Chọn quận/huyện"
                onChange={(value, option) => handleDistrictChange(value, option)}
              >
                {districts.map((district) => (
                  <Option key={district['districtId']} value={district['name']}>
                    {district['name']}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>

          <Flex justify="center" gap={"small"}>
            <Form.Item
              name="ward"
              label={<strong>Phường, xã</strong>}
              style={{ width: "50%" }}
              rules={[
                { required: true, message: "Phường, xã không được bỏ trống" },
              ]}
            >
              <Select
                placeholder="Chọn phường/xã"
              >
                {wards.map((ward) => (
                  <Option key={ward['wardId']} value={ward['name']}>
                    {ward['name']}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="street"
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
            name="detailAddress"
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
              <Form.Item
                name="title"
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

                <Input style={{ height: 50 }} />

              </Form.Item>
            </Tooltip>
            <Form.Item
              name="description"
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
              name="area"
              label={<strong>Diện tích</strong>}
              rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
            >
              <Input type="number" placeholder="m2" />
            </Form.Item>
            <Flex justify="center" gap={"small"}>
              <Form.Item
                name="price"
                label={<strong>Mức giá</strong>}
                style={{ width: "70%" }}
                rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
              >
                <Input />
              </Form.Item>

              {
                //chưa có trường dữ liệu trong db cần thông tin này
              }
              <Form.Item
                name="Đơn vị"
                label={<strong>Đơn vị</strong>}
                style={{ width: "30%" }}
                rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
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
              name={"youtubeLink"}
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
                name="name"
                label={<strong>Tên liên hệ</strong>}
                style={{ width: "50%" }}
              //rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
              >
                <Input value={fullName} placeholder={fullName} onChange={e => setFullName(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label={<strong>Số điện thoại</strong>}
                style={{ width: "50%" }}
              //rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
              >
                <Input value={phone} placeholder={phone} onChange={e => setPhone(e.target.value)} />
              </Form.Item>
            </Flex>

            <Form.Item
              name="email"
              label={<strong>Email</strong>}
              style={{ width: "50%", marginTop: "-5px" }}
            //rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
            >
              <Input value={email} placeholder={email} onChange={e => setEmail(e.target.value)} />
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
                  type="primary"
                  htmlType="submit"
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
