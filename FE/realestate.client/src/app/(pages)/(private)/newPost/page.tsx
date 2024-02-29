"use client";

import { RootState, AppDispatch } from "@/redux/store";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/app/(pages)/(private)/styles/style.layout.css";
import { Button, Collapse, CollapseProps, Flex, Form, Input, Radio, Select, Tooltip, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const NewPostPage = () => {
    //const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm<{}>();
    const [postType, setPostType] = useState<String>('Bán');

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [arrow, setArrow] = useState('Show');

    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            return false;
        }

        if (arrow === 'Show') {
            return true;
        }

        return {
            pointAtCenter: true,
        };
    }, [arrow]);

    return (
        <Flex justify="center" gap='small' vertical>
            <div
                style={{
                    width: '50%',
                    margin: 'auto',
                    padding: 20,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                }}>
                <p
                    style={{
                        fontSize: 25,
                        marginBottom: 5
                    }}
                >Thông tin cơ bản</p>
                <Form form={form} layout="vertical" autoComplete="off">
                    <div style={{ display: 'flex', justifyContent: 'center', height: 40 }}>
                        <button
                            style={{
                                width: '50%',
                                backgroundColor: postType === 'Bán' ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                                color: postType === 'Bán' ? 'white' : 'rgb(153, 153, 153)',
                                fontWeight: postType === 'Bán' ? 'bold' : 'normal',
                                border: '1px solid rgb(204, 204, 204)',
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                            }}
                            value={'Bán'}
                            onClick={() => setPostType('Bán')}>Bán</button>
                        <button
                            style={{
                                width: '50%',
                                backgroundColor: postType === 'Cho thuê' ? 'rgba(0, 0, 0, 0.6)' : '#fff',
                                color: postType === 'Cho thuê' ? 'white' : 'rgb(153, 153, 153)',
                                fontWeight: postType === 'Cho thuê' ? 'bold' : 'normal',
                                border: '1px solid rgb(204, 204, 204)',
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5
                            }}
                            value={'Cho thuê'}
                            onClick={() => setPostType('Cho thuê')}>Cho thuê</button>
                    </div>

                    <div>
                        <Form.Item
                            name="Loại bất động sản"
                            label={<strong>Loại bất động sản</strong>}
                            rules={[{ required: true, message: 'Please select an option' }]} // Thêm quy tắc yêu cầu
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: '1',
                                        label: 'Căn hộ chung cư',
                                    },
                                    {
                                        value: '2',
                                        label: 'Nhà riêng',
                                    },
                                    {
                                        value: '3',
                                        label: 'Nhà biệt thự, liền kề',
                                    },
                                    {
                                        value: '4',
                                        label: 'Nhà mặt phố',
                                    },
                                    {
                                        value: '5',
                                        label: 'Shophouse, nhà phố thương mại',
                                    },
                                    {
                                        value: '6',
                                        label: 'Đất nền dự án',
                                    },
                                    {
                                        value: '7',
                                        label: 'Đất',
                                    },
                                    {
                                        value: '8',
                                        label: 'Trang trại, khu nghỉ dưỡng',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <Flex justify='center' gap={'small'}>
                        <Form.Item name="Province" label={<strong>Tỉnh, thành phố</strong>} style={{ width: '50%' }} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Distinct" label={<strong>Quận, huyện</strong>} style={{ width: '50%' }} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Flex>

                    <Flex justify='center' gap={'small'}>
                        <Form.Item name="Ward" label={<strong>Phường, xã</strong>} style={{ width: '50%' }} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Street" label={<strong>Đường, phố</strong>} style={{ width: '50%' }} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Flex>

                    <Form.Item name="Detail address" label={<strong>Địa chỉ chi tiết</strong>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </div>

            <div
                style={{
                    width: '50%',
                    margin: 'auto',
                    padding: 20,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                }}>
                <p
                    style={{
                        fontSize: 30,
                        marginBottom: 5
                    }}
                >Thông tin bài viết</p>
                <Form form={form} layout="vertical" autoComplete="off">
                    <Form.Item name={'Tiêu đề'} label={<strong>Tiêu đề</strong>} rules={[{ required: true, message: 'Please select an option' }]}>
                        <Tooltip
                            placement="bottom"
                            title={
                                <div style={{ width: '100%' }}>
                                    <strong>Tiêu đề nên có:</strong>
                                    <p>Loại hình bất động sản, diện tích, địa chỉ.</p>
                                    <p>VD: bán nhà riêng 50m2 chính chủ tại Cầu Giấy</p>
                                    <strong>Tiêu đề không nên có:</strong>
                                    <p>Nội dung không liên quan đến bất động sản.</p>
                                    <p>Số điện thoại chưa đăng ký.</p>
                                    <p>Tiếng Việt không dấu hoặc ngôn ngữ khác ngoài tiếng Việt.</p>
                                </div>
                            }
                            arrow={mergedArrow}>
                            <Input style={{ height: 50 }} />
                        </Tooltip>
                        <span>Tối thiểu 30 ký tự, tối đa 99 ký tự</span>
                    </Form.Item>
                    <Form.Item name={'Mô tả'} label={<strong>Mô tả</strong>} rules={[{ required: true, message: 'Please select an option' }]}>
                        <Input.TextArea style={{ height: 150 }} />
                        <span>Tối thiểu 30 ký tự, tối đa 3000 ký tự</span>
                    </Form.Item>
                </Form>
            </div>

            <div
                style={{
                    width: '50%',
                    margin: 'auto',
                    padding: 20,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                }}>
                <p
                    style={{
                        fontSize: 30,
                        marginBottom: 5
                    }}
                >Thông tin bất động sản</p>
                <Form form={form} layout="vertical" autoComplete="off">
                    <Form.Item name="Detail address" label={<strong>Diện tích</strong>} rules={[{ required: true }]}>
                        <Input type="number" placeholder="m2" />
                    </Form.Item>
                    <Flex justify='center' gap={'small'}>
                        <Form.Item name="Ward" label={<strong>Mức giá</strong>} style={{ width: '70%' }} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Đơn vị"
                            label={<strong>Đơn vị</strong>}
                            style={{ width: '30%' }}
                            rules={[{ required: true, message: 'Please select an option' }]} // Thêm quy tắc yêu cầu
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: '1',
                                        label: 'VND',
                                    },
                                    {
                                        value: '2',
                                        label: 'Giá / m2',
                                    },
                                    {
                                        value: '3',
                                        label: 'Thỏa thuận',
                                    }
                                ]}
                            />
                        </Form.Item>
                    </Flex>
                </Form>
            </div>

            <div
                style={{
                    width: '50%',
                    margin: 'auto',
                    padding: 20,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                }}>
                <p
                    style={{
                        fontSize: 30,
                        marginBottom: 5
                    }}
                >Hình ảnh & Video</p>
                <ul style={{ paddingLeft: 20 }}>
                    <li>Đăng tối thiểu 4 ảnh thường với tin VIP</li>
                    <li>Đăng tối đa 24 ảnh với tất cả các loại tin</li>
                    <li>Hãy dùng ảnh thật, không trùng, không chèn SDT</li>
                    <li>Mỗi ảnh kích thước tối thiểu 100x100 px, tối đa 15MB</li>
                    <li>Mô tả ảnh tối đa 45 ký tự</li>
                </ul>
                <Form form={form} layout="vertical" autoComplete="off">
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }} valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="/upload.do" listType="picture-card">
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Bấm để chọn ảnh cần tải lên</div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Collapse items={[{
                        key: '3',
                        label: <strong>Thêm video từ youtube</strong>,
                        children:
                            <div>
                                <div>
                                    <Form.Item>
                                        <Input placeholder="Dán đường dẫn youtube tại đây" />
                                    </Form.Item>
                                </div>
                            </div>
                    }]}
                        style={{ marginBottom: 2 }}
                    />
                </Form>
            </div>

            <div
                style={{
                    width: '50%',
                    margin: 'auto',
                    padding: 20,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                }}>
                <p
                    style={{
                        fontSize: 30,
                        marginBottom: 5
                    }}
                >Thông tin liên hệ</p>
                <Form form={form} layout="vertical" autoComplete="off">

                    <Flex justify='center' gap={'small'}>
                        <Form.Item name="Province" label={<strong>Tên liên hệ</strong>} style={{ width: '50%' }} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Distinct" label={<strong>Số điện thoại</strong>} style={{ width: '50%' }} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Flex>

                    <Form.Item name="Detail address" label={<strong>Email</strong>} style={{ width: '50%' }} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </div>

            <div
                style={{
                    height: 70,
                    width: '50%',
                    margin: 'auto',
                    padding: 20,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                }}>
                <Form form={form} layout="vertical" autoComplete="off">
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Form.Item>
                            <Button
                                style={{
                                    padding: '0 15px',
                                    color: 'white',
                                    backgroundColor: 'rgb(224, 60, 49)',
                                    border: 'none'
                                }}>Tiếp tục</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </Flex>
    );
};

export default NewPostPage;
