import { RootState } from "@/redux/store";
import {
    addPost,
    apiRemoveImage,
    apiUploadImage,
    deleteImage,
    getById,
    getPublicIdFromUrl,
    getRealEstateType,
    updatePost,
} from "@/services/post/post.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { ConsoleSqlOutlined, DeleteOutlined, PlusOutlined, ZoomInOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
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
    message,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import BingMapsReact from "bingmaps-react";
import { environment } from "@/shared/environment/environment";
import axios from "axios";
import { useRouter } from "next/navigation";
import PaymentForm from "./payment-form";
import { toast } from "react-toastify";
import Item from "antd/es/list/Item";
import { getDistricts, getProvinces, getWards } from "@/services/post/address.service";


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
    id: number;
    name: string;
    description: string;
    mediaUrl: string;
}

interface MediaResponse {
    id: number;
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

//type = [watch: 1, edit: 2]
const WatchEditForm = ({ type, postId }: { type: number; postId: number }) => {
    const router = useRouter();
    const [bingMapReady, setBingMapReady] = useState(false);
    const [postType, setPostType] = useState<number>(1);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [listMedia, setListMedia] = useState<MediaType[]>([]);
    const [listMediaId, setListMediaId] = useState<number[]>([]);
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
    const [form] = Form.useForm();
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
        street: "",
    });
    const [coordinates, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [showMap, setShowMap] = useState(false);
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
    const [currentCalculateType, setCurrentCalculateType] = useState<number>(1);
    const [edit, setEdit] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(1);
    const [modalDeleteImg, setModalDeleteImg] = useState(false);
    const [curentFile, setCurrentFile] = useState<UploadFile>();
    useEffect(() => {
        const fetchDetailPost = async () => {
            const response = await getById(postId);
            const data = response?.data.data;
            const post: IPost = {
                title: data?.title,
                description: data?.description,
                province: data?.province,
                district: data?.district,
                ward: data?.ward,
                street: data?.street,
                detailAddress: data?.detailAddress,
                area: data?.area,
                price: data?.price,
                youtubeLink: data?.youtubeLink,
                postTypeId: data?.postTypeId,
                realEstateTypeId: data?.realEstateTypeId,
                calculateType: data?.calculateType,
                lifeTime: data?.lifeTime,
                options: data?.options,
                listMedia: data.medias ? data.medias.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        mediaUrl: item.mediaUrl, 
                })) : [],
            };
            setListMediaId(data.medias.map((item: any) => item.id) || []);
            setListMedia(post.listMedia || []);
            setFileList(data.medias?.map((item: any) => ({
                uid: item.id,
                name: item.name,
                status: "done",
                url: item.mediaUrl,
            })) || []);
            setCurrentCalculateType(post.calculateType);
            setUserInfo(userInfo);
            setStatus(data.status);
            setLocation({
                provinces: post.province,
                districts: post.district,
                wards: post.ward,
                street: post.street,
            });
            setPostType(post.postTypeId);
            form.setFieldsValue({
                title: post.title,
                description: post.description,
                province: post.province,
                district: post.district,
                ward: post.ward,
                street: post.street,
                detailAddress: post.detailAddress,
                area: post.area,
                price: post.price,
                youtubeLink: post.youtubeLink,
                realEstateTypeId: post.realEstateTypeId,
                calculateType: post.calculateType,
            });
        };

        if (type === 2) {
            setEdit(true);
        } else {
            setEdit(false);
        }

        fetchDetailPost();
    }, [type, postId]);

    useEffect(() => {
        const fetchProvince = async () => {
            const provinceResponse = await getProvinces();
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

    useEffect(() => {
        const fetchLocation = async () => {
            const res = await axios.get(
                `http://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(
                    location?.street +
                    " " +
                    location.wards +
                    " " +
                    location.districts +
                    " " +
                    location.provinces
                )}&key=${environment.BingMapsApiKey}`
            );
            const coordinates = {
                latitude: res.data.resourceSets[0].resources[0].point.coordinates[0],
                longitude: res.data.resourceSets[0].resources[0].point.coordinates[1],
            };
            await setCoordinates(coordinates);
            return res.data;
        };

        if (location.districts && location.provinces && location.wards) {
            setShowMap(true);
            fetchLocation();
        } else {
        }
    }, [location]);

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
        console.log("object", option?.label);
        const districtsResponse = await getDistricts(provinceId);
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

    // Xử lý sự kiện khi chọn phường/xã
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
        const selectFile = listMedia.filter((item) => item.name === originName)[0].description;
        const publicId = getPublicIdFromUrl(selectFile)?.replace(/\.\w+$/, "");
        console.log(listMediaId);
        if (publicId) {
            if (listMediaId.includes(file.uid)) {
                handleDeleteImage(file.uid, publicId);
                setFileList((prevList) =>
                    prevList.filter((item) => item.uid !== file.uid)
                );
                setListMedia((prevUrls) =>
                    prevUrls.filter((url) => url.name !== file.name.replace(/\.\w+$/, ""))
                );
                setListMediaId((prevIds) => prevIds.filter((id) => id !== file.uid));
            } else {
                await apiRemoveImage(publicId);
                setFileList((prevList) =>
                    prevList.filter((item) => item.uid !== file.uid)
                );
                setListMedia((prevUrls) =>
                    prevUrls.filter((url) => url.name !== file.name.replace(/\.\w+$/, "") && url.description !== file.secure_url)
                );
            }
        }
    };

    const handleDeleteImage = async (imageId: number, imageUrl: string) => {
        const response = await deleteImage(imageId, imageUrl || "");
        console.log("delete image response", response);
    }

    const showModalDeleteImg = () => {
        setModalDeleteImg(true);
    }

    const hideModalDeleteImg = () => {
        setModalDeleteImg(false);
    }

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
                id: -1,
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
        console.log("listMedia: ", listMedia);
        console.log("listFile: ", fileList);

        const response = await updatePost({ ...postInfo, id: postId, status: status });
        if (response?.code === HTTP_STATUS_CODE.OK) {
            console.log("đã sửa tin!", response?.data);
            toast.done("Sửa thành công");
        }
        else {
            console.log("error: ", response);
        }
    };

    const validatePrice = (rule: any, value: any) => {
        if (currentCalculateType === 3) {
            return Promise.resolve();
        }

        if (!value) {
            return Promise.reject("Trường bắt buộc nhập");
        }
        return Promise.resolve();
    };

    const goBack = () => {
        router.back();
    };

    return (
        <>
            {" "}
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
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                        onFinish={(formValue) => handleSubmit(formValue)}
                        onFinishFailed={() => {
                            message.error("Vui lòng kiểm tra lại các trường thông tin!");
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
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                height: 40,
                            }}
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
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                    {
                                        required: true,
                                        message: "Vui lòng chọn loại bất động sản",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Chọn loại bất động sản"
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                name="district"
                                label={<strong>Quận, huyện</strong>}
                                style={{ width: "50%" }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Quận, huyện không được bỏ trống",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn quận/huyện"
                                    onChange={(value, option) =>
                                        handleDistrictChange(value, option)
                                    }
                                    disabled={isDisableSelect.districtDisable || !edit}
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
                                    {
                                        required: true,
                                        message: "Phường, xã không được bỏ trống",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn phường/xã"
                                    disabled={isDisableSelect.wardDisable || !edit}
                                    options={wards?.map((item: any) => {
                                        return {
                                            value: item?.id,
                                            label: item?.name,
                                        };
                                    })}
                                    onChange={(value, option) =>
                                        handleWardChange(value, option)
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name="street"
                                label={<strong>Đường, phố</strong>}
                                style={{ width: "50%" }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Đường, phố không được bỏ trống",
                                    },
                                ]}
                            >
                                <Input
                                    value={location.street}
                                    disabled={!edit}
                                    onChange={(e) => {
                                        setLocation((prev: any) => {
                                            return {
                                                ...prev,
                                                street: e.target.value,
                                            };
                                        });
                                    }}
                                />
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
                            <Input disabled={!edit}/>
                        </Form.Item>
                        {showMap && (
                            <Flex justify="center">
                                <BingMapsReact
                                    bingMapsKey={environment.BingMapsApiKey}
                                    height={270}
                                    width={850}
                                    pushPins={
                                        bingMapReady
                                            ? [
                                                {
                                                    center: {
                                                        latitude: coordinates.latitude,
                                                        longitude: coordinates.longitude,
                                                    },
                                                },
                                            ]
                                            : null
                                    }
                                    viewOptions={{
                                        center: {
                                            latitude: coordinates.latitude,
                                            longitude: coordinates.longitude,
                                        },
                                        mapTypeId: "road",
                                        zoom: 16,
                                    }}
                                    onMapReady={() => {
                                        setBingMapReady(true);
                                    }}
                                />
                            </Flex>
                        )}
                        <div
                            style={{
                                width: "100%",
                                margin: "auto",
                                backgroundColor: "#fff",
                                marginTop: "20px",
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
                                            Tiếng Việt không dấu hoặc ngôn ngữ khác ngoài tiếng
                                            Việt.
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
                                    rules={[
                                        { required: true, message: "* Tiêu đề bắt buộc nhập" },
                                    ]}
                                >
                                    <Input style={{ height: 50 }} disabled={!edit}/>
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
                                rules={[
                                    { required: true, message: "* Mô tả bắt buộc nhập" },
                                ]}
                            >
                                <Input.TextArea style={{ height: 150 }} disabled={!edit}/>
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
                                rules={[
                                    { required: true, message: "Trường bắt buộc nhập" },
                                ]}
                            >
                                <Input type="number" placeholder="m²" disabled={!edit}/>
                            </Form.Item>
                            <Flex justify="center" gap={"small"}>
                                <Form.Item
                                    name="price"
                                    label={
                                        <strong>
                                            <span style={{ color: "#ff4d4f" }}>* </span>Mức giá
                                        </strong>
                                    }
                                    style={{ width: "70%" }}
                                    rules={[{ validator: validatePrice }]}
                                >
                                    <Input disabled={currentCalculateType === 3 || !edit}/>
                                </Form.Item>

                                <Form.Item
                                    name="calculateType"
                                    label={<strong>Đơn vị</strong>}
                                    style={{ width: "30%" }}
                                    rules={[
                                        { required: true, message: "Trường bắt buộc nhập" },
                                    ]}
                                >
                                    <Select
                                        style={{ width: "100%" }}
                                        disabled={!edit}
                                        //value={calculateType[0].value}
                                        optionFilterProp="children"
                                        options={calculateType?.map((item: any) => {
                                            return {
                                                value: item?.value,
                                                label: item?.label,
                                            };
                                        })}
                                        onChange={(value: string, option) => {
                                            // console.log("object", value, option)
                                            setCurrentCalculateType(+value);
                                        }}
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
                                <li>
                                    Mỗi ảnh kích thước tối thiểu 100x100 px, tối đa 15MB
                                </li>
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
                                    disabled={!edit}
                                    customRequest={handleUpload}
                                    multiple={true}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onRemove={(item) => {
                                        setCurrentFile(item);
                                        showModalDeleteImg();
                                        return false;
                                    }}
                                    onChange={handleChange}
                                >
                                    <button
                                        style={{ border: 0, background: "none" }}
                                        type="button"
                                        disabled={!edit}
                                    >
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
                                        style={{ width: "100%", height: "100%" }}
                                        width={100}
                                        height={100}
                                        src={previewImage}
                                    />
                                </Modal>
                                <Modal
                                    title="Xóa hình ảnh"
                                    open={modalDeleteImg}
                                    onOk={() => {
                                        handleRemove(curentFile);
                                        hideModalDeleteImg();
                                    }}
                                    onCancel={hideModalDeleteImg}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <p>Bạn sẽ không thể hoàn tác sau khi xóa ảnh.</p>
                                    <p>Bạn chắc chắn muốn xóa ảnh chứ?</p>
                                </Modal>
                            </Form.Item>
                            <Form.Item
                                name={"youtubeLink"}
                                label={<strong>Link youtube</strong>}
                            >
                                <Input placeholder="Dán đường dẫn youtube tại đây" disabled={!edit}/>
                            </Form.Item>
                        </div>
                        
                        {edit ?
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
                            </div> : <></>
                        }  

                        {
                            edit ?
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
                                                    Modal.confirm({
                                                        title: "Bạn có chắc chắn muốn hủy?",
                                                        content: "Các thay đổi của bạn sẽ không được lưu.",
                                                        okText: "Đồng ý",
                                                        cancelText: "Hủy",
                                                        onOk() {
                                                            router.replace("/post");
                                                        },
                                                        onCancel() {
                                                            console.log("cancel");
                                                        },
                                                    });
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
                                </div> : 
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
                                                color: "white",
                                                backgroundColor: "rgb(224, 60, 49)",
                                                border: "none",
                                            }}
                                            onClick={goBack}
                                        >
                                            Quay lại
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        }
                    </Form>
                </div>
            </Flex>
        </>
    );
};

export default WatchEditForm;
