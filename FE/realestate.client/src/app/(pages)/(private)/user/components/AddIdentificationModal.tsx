import { Button, Flex, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Divider, Form, Input, Spin } from "antd/lib";
import {
    getBackwardIdentificationCardInfo,
    getFrontIdentificationCardInfo,
} from "@/services/user/user.service";

const AddIdentificationModal = ({ isOpen, handleShowModal }: any) => {
    const [form] = Form.useForm();
    const backgroundFrontImg =
        "https://res.cloudinary.com/deurdoich/image/upload/v1711418703/DATN/uo8cbbqzbfleof2apq3n.png";
    const backgroundBackImg =
        "https://res.cloudinary.com/deurdoich/image/upload/v1711418704/DATN/hpfhcegzep4iehstctih.png";

    const [frontImage, setFrontImage] = useState<any>(backgroundFrontImg);
    const [backwardImage, setBackwardImage] = useState<any>(backgroundBackImg);
    const [frontImageFile, setFrontImageFile] = useState<any>();
    const [backwardImageFile, setBackwardImageFile] = useState<any>();
    const frontImageRef = useRef<any>();
    const backwardImageRef = useRef<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isShowSaveButton, setIsShowSaveButton] = useState<boolean>(false);
    const [isDisableUpload, setIsDisableUpload] = useState<boolean>(false);

    const checkExistImg = (): boolean => {
        return (
            frontImage === backgroundFrontImg && backwardImage === backgroundBackImg
        );
    };

    const handleSubmit = async () => {
        console.log("form", form.getFieldsValue())
    }

    const getCardInfo = async (): Promise<any> => {
        const frontImageData = new FormData();
        setIsLoading(true);
        frontImageData.append("file", frontImageFile);
        const frontCardResponse = await getFrontIdentificationCardInfo(
            frontImageData
        );
        const backwardImageData = new FormData();
        backwardImageData.append("file", backwardImageFile);
        const backwardCardResponse = await getBackwardIdentificationCardInfo(
            backwardImageData
        );

        await setIsDisableUpload(true)
        await setIsShowSaveButton(true);
        form.setFieldsValue({
            idNo: frontCardResponse?.data?.idNo,
            fullname: frontCardResponse?.data?.name,
            dateOfBirth: frontCardResponse?.data?.dateOfBirth,
            sex: frontCardResponse?.data?.sex,
            nationality: frontCardResponse?.data?.nationality,
            placeOfResidence: frontCardResponse?.data?.placeOfResidence,
            placeOfOrigin: frontCardResponse?.data?.placeOfOrigin,
            idIssueExpDate: frontCardResponse?.data?.idIssueExpDate,
            idDate: backwardCardResponse?.data?.idDate,
            idIssuer: backwardCardResponse?.data?.idIssuer,
        })
        setIsLoading(false)
    };

    return (
        <Modal
            width={960}
            open={isOpen}
            onCancel={() => {
                handleShowModal();
                setFrontImage(backgroundFrontImg);
                setBackwardImage(backgroundBackImg);
                form.setFieldsValue({
                    idNo: "",
                    fullname: "",
                    dateOfBirth: "",
                    sex: "",
                    nationality: "",
                    placeOfResidence: "",
                    placeOfOrigin: "",
                    idIssueExpDate: "",
                    idDate: "",
                    idIssuer: "",
                });
                setIsShowSaveButton(false);
                setIsDisableUpload(false);
            }}
            title={<div style={{ fontSize: "20px" }}>Thêm mới giấy tờ</div>}
            footer={
                <div style={{ marginTop: "20px" }}>
                    <Divider />
                    <Flex justify="flex-end">
                        <Button
                            size="large"
                            onClick={() => {
                                handleShowModal();
                                setFrontImage(backgroundFrontImg);
                                setBackwardImage(backgroundBackImg);
                                setFrontImageFile(null);
                                setBackwardImageFile(null);
                                setIsShowSaveButton(false);
                                setIsDisableUpload(false);
                                form.setFieldsValue({
                                    idNo: "",
                                    fullname: "",
                                    dateOfBirth: "",
                                    sex: "",
                                    nationality: "",
                                    placeOfResidence: "",
                                    placeOfOrigin: "",
                                    idIssueExpDate: "",
                                    idDate: "",
                                    idIssuer: "",
                                });
                            }}
                        >
                            Hủy
                        </Button>
                        {!isShowSaveButton && (
                            <Button
                                size="large"
                                disabled={checkExistImg()}
                                style={{
                                    marginLeft: "12px",
                                    backgroundColor: "#ff4d4f",
                                    color: "#fff",
                                }}
                                onClick={getCardInfo}
                            >
                                Lấy thông tin
                            </Button>
                        )}
                        {isShowSaveButton && (
                            <Button
                                size="large"
                                disabled={checkExistImg()}
                                style={{
                                    marginLeft: "12px",
                                    backgroundColor: "#ff4d4f",
                                    color: "#fff",
                                }}
                                onClick={handleSubmit}
                            >
                                Lưu
                            </Button>
                        )}
                    </Flex>
                </div>
            }
        >
            <Spin spinning={isLoading} >
                <div style={{ overflow: "scroll", fontFamily: "__Lexend_126e48" }}>
                    <Flex
                        justify="center"
                        style={{ width: "auto", height: "auto", marginTop: "50px" }}
                    >
                        <div>
                            <p style={{ fontWeight: "500", fontSize: "16px" }}>
                                Giấy tờ mặt trước
                            </p>
                            <div style={{ width: "350px", height: "auto" }}>
                                <input
                                    id="upload-front"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e: any) => {
                                        console.log(URL.createObjectURL(e.target.files[0]));
                                        setFrontImage(URL.createObjectURL(e.target.files[0]));
                                        setFrontImageFile(e.target.files[0]);
                                    }}
                                    onClick={() => {
                                        frontImageRef.current.value = "";
                                    }}
                                    disabled={isDisableUpload}
                                    ref={frontImageRef}
                                />
                                <label htmlFor="upload-front">
                                    <img
                                        src={frontImage}
                                        width={350}
                                        alt="front"
                                        style={{ height: "auto" }}
                                    />
                                </label>
                            </div>
                        </div>
                        <div style={{ marginLeft: "90px" }}>
                            <p style={{ fontWeight: "500", fontSize: "16px" }}>
                                Giấy tờ mặt sau
                            </p>
                            <div style={{ width: "350px", height: "auto" }}>
                                <input
                                    ref={backwardImageRef}
                                    id="upload-backward"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e: any) => {
                                        console.log(URL.createObjectURL(e.target.files[0]));
                                        setBackwardImage(URL.createObjectURL(e.target.files[0]));
                                        setBackwardImageFile(e.target.files[0]);
                                    }}
                                    disabled={isDisableUpload}
                                    onClick={() => {
                                        backwardImageRef.current.value = "";
                                    }}
                                />
                                <label htmlFor="upload-backward">
                                    <img
                                        width={350}
                                        src={backwardImage}
                                        alt="backward"
                                        style={{ height: "auto" }}
                                    />
                                </label>
                            </div>
                        </div>
                    </Flex>
                    {isShowSaveButton && <div style={{ marginTop: "50px" }}>
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                            Thông tin giấy tờ
                        </div>
                        <Form layout="vertical" form={form}>
                            <Flex justify="space-between">
                                <Form.Item
                                    name="idNo"
                                    label={<span style={{ fontWeight: "500" }}>Mã số giấy tờ</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "23%" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="fullname"
                                    label={<span style={{ fontWeight: "500" }}>Họ và tên</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "23%" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="sex"
                                    label={<span style={{ fontWeight: "500" }}>Giới tính</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "23%" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="dateOfBirth"
                                    label={<span style={{ fontWeight: "500" }}>Ngày sinh</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "23%" }}
                                >
                                    <Input />
                                </Form.Item>
                            </Flex>
                            <Flex justify="space-between">
                                <Form.Item
                                    name="nationality"
                                    label={<span style={{ fontWeight: "500" }}>Quốc tịch</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "23%" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="idIssuer"
                                    label={<span style={{ fontWeight: "500" }}>Nơi cấp</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "23%" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="idDate"
                                    label={<span style={{ fontWeight: "500" }}>Ngày cấp</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "23%" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="idIssueExpDate"
                                    label={<span style={{ fontWeight: "500" }}>Ngày hết hạn</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "23%" }}
                                >
                                    <Input />
                                </Form.Item>
                            </Flex>
                            <Flex justify="space-between">
                                <Form.Item
                                    name="placeOfOrigin"
                                    label={<span style={{ fontWeight: "500" }}>Nguyên quán</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "48%" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="placeOfResidence"
                                    label={
                                        <span style={{ fontWeight: "500" }}>Địa chỉ thường trú</span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường bắt buộc nhập",
                                        },
                                    ]}
                                    style={{ width: "48%" }}
                                >
                                    <Input />
                                </Form.Item>
                            </Flex>
                        </Form>
                    </div>}
                </div>
            </Spin>
        </Modal>
    );
};

export default AddIdentificationModal;
