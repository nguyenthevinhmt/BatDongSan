'use client';
import isAuth from '@/app/isAuth';
import { createBank, getAllBank, removeBank } from '@/services/bank/bank.service';
import { UserType } from '@/shared/consts/userType';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Flex from 'antd/es/flex';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Radio from 'antd/es/radio';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import vietcombank from '@/assets/image/vietcombank.jpg';
import techcombank from '@/assets/image/techcombank.jpg';
import acbbank from '@/assets/image/acbbank.jpg';
import bidvbank from '@/assets/image/bidvbank.jpg';
import viettinbank from '@/assets/image/viettinbank.jpg';
import vpbank from '@/assets/image/vpbank.jpg';
import sacombank from '@/assets/image/sacombank.jpg';
import eximbank from '@/assets/image/eximbank.jpg';
import publicbank from '@/assets/image/publicbank.jpg';
import shbbank from '@/assets/image/shbbank.jpg';
import abbank from '@/assets/image/abbank.jpg';
import wooribank from '@/assets/image/wooribank.jpg';
import vibbank from '@/assets/image/vibbank.jpg';
import hdbank from '@/assets/image/hdbank.jpg';
import oceanbank from '@/assets/image/oceanbank.jpg';
import vrbbank from '@/assets/image/vrbbank.jpg';
import lienvietpostbank from '@/assets/image/lienvietpostbank.jpg';
import mbbank from '@/assets/image/mbbank.jpg';
import saigonbank from '@/assets/image/saigonbank.jpg';
import namabank from '@/assets/image/namabank.jpg';
import uobbank from '@/assets/image/uobbank.jpg';
import baovietbank from '@/assets/image/baovietbank.jpg';
import bacabank from '@/assets/image/bacabank.jpg';
import vietcapitalbank from '@/assets/image/vietcapitalbank.jpg';
import pvcombank from '@/assets/image/pvcombank.jpg';
import pgbank from '@/assets/image/pgbank.jpg';
import shinhanbank from '@/assets/image/shinhanbank.jpg';
import gpbank from '@/assets/image/gpbank.jpg';
import vietbank from '@/assets/image/vietbank.jpg';
import ivbbank from '@/assets/image/ivbbank.jpg';
import kienlongbank from '@/assets/image/kienlongbank.jpg';
import msbbank from '@/assets/image/msbbank.jpg';
import ncbank from '@/assets/image/ncbank.jpg';
import ocbank from '@/assets/image/ocbank.jpg';
import seabank from '@/assets/image/seabank.jpg';
import vietabank from '@/assets/image/vietabank.jpg';
import DatePicker from 'antd/es/date-picker';
import { Col, Row } from 'antd/es/grid';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdAddCard } from 'react-icons/md';
import Modal from 'antd/es/modal';
import ConfigProvider from 'antd/es/config-provider';
import theme from '@/theme/themeConfig';

interface IBank {
    id: number;
    bankName: string;
    bankCode: string;
};

interface ISearch {
    pageSize?: number;
    pageNumber?: number;
    keyWord?: string;
};

interface ICreateBank {
    bankName: string;
    bankCode: string;
    ownerBankFullname: string;
    releaseDate: Date;
};

const listBankDetail = [
    {
        value: "Vietcombank",
        img: <Image src={vietcombank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "Techcombank",
        img: <Image src={techcombank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "acbbank",
        img: <Image src={acbbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "bidvbank",
        img: <Image src={bidvbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "viettinbank",
        img: <Image src={viettinbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "vpbank",
        img: <Image src={vpbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "sacombank",
        img: <Image src={sacombank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "eximbank",
        img: <Image src={eximbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "publicbank",
        img: <Image src={publicbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "shbbank",
        img: <Image src={shbbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "abbank",
        img: <Image src={abbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "wooribank",
        img: <Image src={wooribank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "vibbank",
        img: <Image src={vibbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "hdbank",
        img: <Image src={hdbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "oceanbank",
        img: <Image src={oceanbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "vrbbank",
        img: <Image src={vrbbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "lienvietpostbank",
        img: <Image src={lienvietpostbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "mbbank",
        img: <Image src={mbbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "saigonbank",
        img: <Image src={saigonbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "namabank",
        img: <Image src={namabank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "uobbank",
        img: <Image src={uobbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "baovietbank",
        img: <Image src={baovietbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "bacabank",
        img: <Image src={bacabank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "vietcapitalbank",
        img: <Image src={vietcapitalbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "pvcombank",
        img: <Image src={pvcombank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "pgbank",
        img: <Image src={pgbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "shinahanbank",
        img: <Image src={shinhanbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "gpbank",
        img: <Image src={gpbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "vietbank",
        img: <Image src={vietbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "ivbbank",
        img: <Image src={ivbbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "kienlongbank",
        img: <Image src={kienlongbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "msbbank",
        img: <Image src={msbbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "ncbank",
        img: <Image src={ncbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "ocbank",
        img: <Image src={ocbank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "seabank",
        img: <Image src={seabank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    },
    {
        value: "vietabank",
        img: <Image src={vietabank} alt='' width={104} height={38} style={{ objectFit: "cover" }} />
    }
]

const ListBankPage = () => {
    const [form] = Form.useForm<any>();
    const [listBank, setListBank] = useState<IBank[]>([]);
    const [isAddBank, setIsAddBank] = useState<boolean>(false);
    const [isChange, setIsChange] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            //lấy danh sách ngân hàng
            const search: ISearch = {
                pageSize: -1
            };
            const bankResponse = await getAllBank(search);
            const banks: IBank[] = bankResponse?.data?.items?.map((item: any) => {
                return {
                    id: item.id,
                    bankName: item.bankName,
                    bankCode: item.bankCode
                };
            });
            setListBank(banks);
        };

        fetchData();
    }, [isChange]);

    const handleCreate = async (values: ICreateBank) => {
        const bank: ICreateBank = {
            bankName: values.bankName,
            bankCode: values.bankCode,
            ownerBankFullname: values.ownerBankFullname,
            releaseDate: values.releaseDate
        };
        const response = await createBank(bank);
        console.log("response", response);
        setIsAddBank(false);
        setIsChange(!isChange);
    };

    const handleRemoveBank = async (id: number) => {
        //xóa ngân hàng
        const response = await removeBank(id);
        console.log("response", response);
        setIsChange(!isChange);
    }
    return (
        <div>
            {!isAddBank ?
                <div
                    style={{
                        width: '100%',
                        borderRadius: 8,
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    }}>
                    <div style={{
                        width: '100%',
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 8,
                        backgroundColor: "#fff",
                    }}>
                        <Flex
                            vertical
                            align='center'
                            style={{
                                width: '100%'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                fontSize: 24,
                                fontWeight: "500",
                                marginBottom: 15,
                            }}>Danh sách ngân hàng</div>

                            <div style={{
                                width: '100%',
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginBottom: 10
                            }}>

                                <ConfigProvider
                                    theme={theme}
                                >
                                    <Row gutter={[16, 10]}>
                                        {listBank?.map((item, index) => {
                                            return <Col span={6}>
                                                <Card
                                                    hoverable={true}
                                                    title={<div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'center',
                                                        }}
                                                    >{item.bankName}</div>
                                                    }
                                                    bordered={false}
                                                    style={{
                                                        border: '1px solid #aaa',
                                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                                                    }}
                                                    headStyle={{
                                                        borderBottom: '1px solid #aaa',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                    }}
                                                    bodyStyle={{
                                                        borderBottom: '1px solid #aaa',

                                                    }}
                                                    actions={[
                                                        <TiDeleteOutline style={{ width: 20, height: 20 }} onClick={() => {
                                                            Modal.confirm({
                                                                title: "Bạn có chắc chắn muốn xóa ngân hàng?",
                                                                content: "Các thay đổi của bạn sẽ được lưu và không thể hoàn tác.",
                                                                okText: "Đồng ý",
                                                                cancelText: "Hủy",
                                                                onOk() {
                                                                    handleRemoveBank(item.id);
                                                                },
                                                                onCancel() {
                                                                    console.log("cancel");
                                                                },
                                                            });
                                                        }} />
                                                    ]}
                                                >
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                        <span>Số thẻ: </span>
                                                        <div>{item.bankCode}</div>
                                                    </div>

                                                </Card>
                                            </Col>
                                        })}

                                        <Col span={6} onClick={() => setIsAddBank(true)}>
                                            <Card
                                                title="Thêm ngân hàng mới"
                                                hoverable={true}
                                                bordered={false}
                                                style={{
                                                    border: '1px solid #aaa',
                                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                                                }}
                                                headStyle={{
                                                    borderBottom: '1px solid #aaa', // Đường viền dưới của title
                                                    alignItems: 'center',
                                                }}
                                                bodyStyle={{
                                                    borderBottom: '1px solid #aaa', // Đường viền trên của nội dung
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}
                                                onMouseEnter={() => setHover(true)}
                                                onMouseLeave={() => setHover(false)}
                                            >
                                                <MdAddCard style={{ width: 30, height: 30, color: hover ? '#ff4d4f' : 'black' }} />
                                            </Card>
                                        </Col>
                                    </Row>
                                </ConfigProvider>
                            </div>
                        </Flex>
                    </div>
                </div>
                :
                <div
                    style={{
                        width: '100%',
                        borderRadius: 8,
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    }}>
                    <div style={{
                        width: '100%',
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 8,
                        backgroundColor: "#fff",
                    }}>
                        <Flex
                            vertical
                            align='flex-start'

                        >
                            <Form
                                form={form}
                                onFinish={() => handleCreate(form.getFieldsValue())}
                            >
                                <Form.Item
                                    name="bankCode"
                                    label="Số tài khoản"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
                                >
                                    <Input placeholder="Vui lòng nhập số tài khoản" />
                                </Form.Item>

                                <Form.Item
                                    name="ownerBankFullname"
                                    label="Họ và tên chủ sở hữu"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ họ và tên' }]}
                                >
                                    <Input
                                        placeholder="Vui lòng nhập đầy đủ họ và tên"
                                        onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="releaseDate"
                                    label="Ngày phát hành"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Vui lòng chọn ngày phát hành' }]}
                                >
                                    <DatePicker picker="month" />
                                </Form.Item>

                                <Form.Item
                                    name="bankName"
                                    label="Ngân hàng"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Vui lòng chọn ngân hàng' }]}
                                >
                                    <Radio.Group>
                                        {
                                            listBankDetail.map((item) => {
                                                return <Radio.Button
                                                    value={item.value}
                                                    style={{
                                                        width: 'auto',
                                                        height: 'auto',
                                                        lineHeight: 'initial',
                                                        paddingTop: 5,
                                                        paddingBottom: 5,
                                                        paddingLeft: 5,
                                                        paddingRight: 5,
                                                    }}
                                                >{item.img}</Radio.Button>
                                            })
                                        }
                                    </Radio.Group>
                                </Form.Item>

                                <Flex
                                    justify='flex-end'
                                >
                                    <Form.Item style={{ marginRight: 10 }}>
                                        <Button onClick={() => setIsAddBank(false)}>hủy</Button>
                                    </Form.Item>

                                    <Form.Item style={{ marginRight: 10 }}>
                                        <Button htmlType='submit' style={{ backgroundColor: "#ff4d4f", color: "#fff" }}>Thêm</Button>
                                    </Form.Item>
                                </Flex>
                            </Form>
                        </Flex>
                    </div>
                </div>
            }
        </div>
    );
};

export default isAuth(ListBankPage, [UserType.ADMIN, UserType.CUSTOMER]);