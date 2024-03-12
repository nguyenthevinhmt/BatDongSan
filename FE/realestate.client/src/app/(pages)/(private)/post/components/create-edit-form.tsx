import { RootState } from "@/redux/store";
import {
  addPost,
  apiRemoveImage,
  apiUploadImage,
  getPublicIdFromUrl,
  getRealEstateType,
} from "@/services/post/post.service";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "@/services/post/vnAddress.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  GetProp,
  Input,
  Modal,
  Select,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface IPost {
  title: string;
  description: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  detailAddress?: string;
  area: number;
  price: number;
  rentalObject?: number;
  youtubeLink?: string;
  postTypeId: number;
  realEstateTypeId: number;
  options: number;
  lifeTime: number;
  calculateType: number;
  listMedia?: MediaType[];
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

//type = [create: 1, edit: 2]
const CreateEditForm = ({ type }: { type: number }) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    detailAddress: "",
    area: 0,
    price: 0,
    rentalObject: 0,
    youtubeLink: 0,
    postTypeId: 1,
    realEstateTypeId: 0,
    options: 1,
    lifeTime: 10,
    calculateType: 1,
    listMedia: [],
  });
  const [postType, setPostType] = useState<number>(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listMedia, setListMedia] = useState<MediaType[]>([]);
  const [provinces, setProvinces] = useState<any>();
  const [districts, setDistricts] = useState<any>();
  const [wards, setWards] = useState<any>();
  const [isDisableSelect, setIsDisableSelect] = useState({
    districtDisable: true,
    wardDisable: true,
  });
  const [realEstateType, setRealEstateType] = useState<any>();

  const userSelector = useSelector((state: RootState) => {
    return state.auth.user.data;
  });
  const fullname = (userSelector as any)?.fullname;
  const phoneNumber = (userSelector as any)?.phoneNumber;
  const email = (userSelector as any)?.email;
  const [userInfo, setUserInfo] = useState({
    fullname,
    phoneNumber,
    email,
  });

  const [location, setLocation] = useState({
    provinces: "",
    districts: "",
    wards: "",
  });

  const [calculateType, setCalculateType] = useState([
    {
      value: "1",
      label: "VND",
    },
    {
      value: "2",
      label: "Giá/m²",
    },
    {
      value: "3",
      label: "Thỏa thuận",
    },
  ]);
  useEffect(() => {
    const fetchProvince = async () => {
      const provinceResponse = await getProvinces();
      console.log("object", provinceResponse?.data);
      await setProvinces(provinceResponse?.data);
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    const fetchRealEstateType = async () => {
      const response = await getRealEstateType();
      await setRealEstateType(response?.data?.items);
    };
    fetchRealEstateType();
  }, []);

  const initialValues = {
    name: fullname,
    phonNumber: phoneNumber,
    email: email,
    calculateType: calculateType[0].value,
    provinces: "",
    districts: "",
    wards: "",
  };

  // Xử lý sự kiện khi chọn tỉnh/thành phố
  const handleProvinceChange = async (value: any, option: any) => {
    const provinceId = option?.value;
    setLocation((prev: any) => {
      return {
        ...prev,
        provinces: option?.label,
      };
    });
    const districtsResponse = await getDistricts(provinceId); // Gọi API lấy danh sách quận/huyện
    await setDistricts(districtsResponse?.data);
    setIsDisableSelect((prev) => {
      return {
        ...prev,
        districtDisable: false,
      };
    });
  };

  // Xử lý sự kiện khi chọn quận/huyện
  const handleDistrictChange = async (value: any, option: any) => {
    const districtId = option?.value;
    setLocation((prev: any) => {
      return {
        ...prev,
        districts: option?.label,
      };
    });
    const wardsResponse = await getWards(districtId); // Gọi API lấy danh sách quận/huyện
    await setWards(wardsResponse?.data);
    setIsDisableSelect((prev) => {
      return {
        ...prev,
        wardDisable: false,
      };
    });
  };

  const handleWardChange = async (value: any, option: any) => {
    setLocation((prev: any) => {
      return {
        ...prev,
        wards: option?.label,
      };
    });
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

  const handleSubmit = async (formValue: any) => {
    const postInfo: IPost = {
      title: formValue.title,
      description: formValue.description,
      province: location?.provinces,
      district: location?.districts,
      ward: location?.wards,
      street: formValue.street,
      detailAddress: formValue.detailAddress,
      area: formValue.area,
      price: formValue.price,
      youtubeLink: formValue.youtubeLink,
      postTypeId: postType,
      realEstateTypeId: formValue.realEstateTypeId,
      calculateType: formValue.calculateType,
      lifeTime: 10,
      options: 1,
      listMedia: listMedia,
    };

    const response = await addPost(postInfo);
    if (response?.data?.code === HTTP_STATUS_CODE.OK) {
      console.log("đã đăng tin!", response?.data);
    }
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
        <Form
          layout="vertical"
          autoComplete="off"
          onFinish={(formValue) => handleSubmit(formValue)}
          onError={(formValue) => {
            console.log("object", formValue);
          }}
          initialValues={initialValues}
        >
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
                  color: postType === 2 ? "white" : "rgb(153, 153, 153)",
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
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Chọn loại bất động sản"
                options={realEstateType?.map((item: any) => {
                  return {
                    value: item?.id,
                    label: item?.name,
                  };
                })}
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
                onChange={(value, option) =>
                  handleProvinceChange(value, option)
                }
                options={provinces?.map((item: any) => {
                  return {
                    value: item?.id,
                    label: item?.name,
                  };
                })}
              />
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
                onChange={(value, option) =>
                  handleDistrictChange(value, option)
                }
                disabled={isDisableSelect.districtDisable}
                options={districts?.map((item: any) => {
                  return {
                    value: item?.id,
                    label: item?.fullName,
                  };
                })}
              />
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
                disabled={isDisableSelect.wardDisable}
                options={wards?.map((item: any) => {
                  return {
                    value: item?.id,
                    label: item?.name,
                  };
                })}
                onChange={(value, option) => handleWardChange(value, option)}
              />
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
                name="calculateType"
                label={<strong>Đơn vị</strong>}
                style={{ width: "30%" }}
                rules={[{ required: true, message: "Trường bắt buộc nhập" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  defaultValue={calculateType[0].value}
                  value={calculateType[0].value}
                  optionFilterProp="children"
                  options={calculateType}
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
              >
                <Input
                  value={userInfo.fullname}
                  placeholder={userInfo.fullname}
                  disabled={true}
                />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label={<strong>Số điện thoại</strong>}
                style={{ width: "50%" }}
              >
                <Input
                  value={userInfo.phoneNumber}
                  placeholder={userInfo.phoneNumber}
                  disabled={true}
                />
              </Form.Item>
            </Flex>

            <Form.Item
              name="email"
              label={<strong>Email</strong>}
              style={{ width: "50%", marginTop: "-5px" }}
            >
              <Input
                value={userInfo.email}
                placeholder={userInfo.email}
                disabled={true}
              />
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

export default CreateEditForm;