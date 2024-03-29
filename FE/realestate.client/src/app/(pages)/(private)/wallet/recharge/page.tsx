'use client';

import isAuth from '@/app/isAuth';
import { createPayment } from '@/services/vnpay/vnpay.service';
import { walletInfo } from '@/services/wallet/wallet.service';
import UserType from '@/shared/consts/userType';
import { vnp_BankCode } from '@/shared/consts/vnp_BankCode';
import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import Form from 'antd/es/form';
import InputNumber from 'antd/es/input-number';
import Radio from 'antd/es/radio';
import { useRouter } from 'next/navigation';
import React from 'react';
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
import Image from 'next/image';
import Segmented from 'antd/es/segmented';
import ConfigProvider from 'antd/es/config-provider';
import theme from '@/theme/themeConfig';

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
];

const quickChoice = [
    {
        value: 10000,
        label: "10.000đ"
    },
    {
        value: 20000,
        label: "20.000đ"
    },
    {
        value: 50000,
        label: "50.000đ"
    },
    {
        value: 100000,
        label: "100.000đ"
    },
    {
        value: 200000,
        label: "200.000đ"
    },
    {
        value: 500000,
        label: "500.000đ"
    }
]

const RechangePage = () => {
    const router = useRouter();
    const [form] = Form.useForm();

    const handleRecharge = async () => {
        console.log('handleRecharge');
        const values = form.getFieldsValue();
        const wallet = await walletInfo();
        if (wallet) {
            const payload = {
                walletNumber: wallet.data.data.walletNumber,
                transactionAmount: values.amount,
                bankCode: values.radioGroup,
            };
            const response = await createPayment(payload);
            if (response) {
                const paymentUrl = response.data;
                router.push(paymentUrl,);
            }
        }

    }

    return (
        <Flex justify="center" gap="small" vertical>
            <div
                style={{
                    width: "70%",
                    margin: "auto",
                    padding: 20,
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                <p
                    style={{
                        fontSize: 24,
                        fontWeight: "500",
                        marginBottom: 5,
                    }}
                >
                    Nạp tiền vào tài khoản
                </p>

                <Form
                    form={form}
                    style={{ width: '100%' }}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleRecharge}
                >
                    <Form.Item
                        name="amount"
                        label="Số tiền bạn muốn nạp"
                        rules={[
                            {
                                required: true,
                                message: "Số tiền không được bỏ trống!",
                            },
                        ]}
                    >
                        <InputNumber 
                            addonAfter="đ" 
                            style={{ width: '50%' }} 
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')} 
                        />
                    </Form.Item>

                    <Form.Item
                        name="quickChoice"
                        label="Hoặc chọn nhanh:"
                    >
                        <Radio.Group>
                            {
                                quickChoice.map((item, index) => {
                                    return <Radio.Button
                                        key={index}
                                        value={item.value}
                                        style={{
                                            width: '33%',
                                            height: 50,
                                            lineHeight: 'auto',
                                            paddingTop: 5,
                                            paddingBottom: 5,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            borderRadius: 0,
                                        }}
                                        onClick={() => {
                                            form.setFieldsValue({ amount: item.value });
                                        }}
                                    >{item.label}</Radio.Button>
                                })
                            }
                        </Radio.Group>
                    </Form.Item>

                    <ConfigProvider
                        theme={theme}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                            <Form.Item
                                name="radioGroup"
                                label="Chọn hình thức nạp"
                                rules={[
                                    {
                                        required: true,
                                        message: "Hình thức nạp không được bỏ trống!",
                                        validator: (_, value) => {
                                            if (!value) {
                                                console.log(value);
                                                return Promise.reject("Hình thức nạp không được bỏ trống!");
                                            }
                                            return Promise.resolve();
                                        },

                                    },
                                ]}
                            >
                                <Segmented
                                    options={[
                                        {
                                            label: (
                                                <div style={{ padding: 4 }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M24.3074 22.4922H22.4908V24.3088H24.3074V22.4922Z" fill="#999999"></path><path d="M18.8578 17.042H17.0413V18.8586H18.8578V17.042Z" fill="#999999"></path><path d="M20.6744 18.8584H18.8578V20.675H20.6744V18.8584Z" fill="#999999"></path><path d="M18.8577 20.6748H17.0411V22.4914H18.8577V20.6748Z" fill="#999999"></path><path d="M20.6744 22.4922H18.8578V24.3088H20.6744V22.4922Z" fill="#999999"></path><path d="M22.491 20.6748H20.6744V22.4914H22.491V20.6748Z" fill="#999999"></path><path d="M22.491 17.042H20.6744V18.8586H22.491V17.042Z" fill="#999999"></path><path d="M24.3074 18.8584H22.4908V20.675H24.3074V18.8584Z" fill="#999999"></path><rect x="8.61536" y="8.61523" width="5.53846" height="5.53846" stroke="#999999" stroke-width="1.7" stroke-linejoin="round"></rect><rect x="8.61523" y="17.8457" width="5.53846" height="5.53846" stroke="#999999" stroke-width="1.7" stroke-linejoin="round"></rect><rect x="17.8461" y="8.61523" width="5.53846" height="5.53846" stroke="#999999" stroke-width="1.7" stroke-linejoin="round"></rect><path d="M10.4615 4H4V10.4615" stroke="#CCCCCC" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.5385 28H28V21.5385" stroke="#CCCCCC" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.5385 4H28V10.4615" stroke="#CCCCCC" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.4615 28H4V21.5385" stroke="#CCCCCC" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                    <div>QR Code</div>
                                                </div>
                                            ),
                                            value: vnp_BankCode.VNPAYQR,
                                            disabled: true,
                                        },
                                        {
                                            label: (
                                                <div style={{ padding: 4 }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M27.2667 25H4.73333C3.77653 25 3 24.2669 3 23.3636V8.63636C3 7.73309 3.77653 7 4.73333 7H27.2667C28.2235 7 29 7.73309 29 8.63636V23.3636C29 24.2669 28.2235 25 27.2667 25Z" fill="#E3AA49"></path><rect x="3" y="11" width="26" height="3" fill="#FAD48D"></rect><path d="M15.2174 20.8359H13.2972L12.8954 22H12L13.8726 17H14.6454L16.5214 22H15.6226L15.2174 20.8359ZM13.5389 20.1353H14.9757L14.2573 18.0611L13.5389 20.1353Z" fill="#FFFFFF"></path><path d="M20.2597 17.7005H18.714V22H17.8594V17.7005H16.3273V17H20.2597V17.7005Z" fill="#FFFFFF"></path><path d="M22.0302 17L23.4601 20.8324L24.8867 17H26V22H25.142V20.3516L25.2271 18.147L23.7631 22H23.1469L21.6863 18.1504L21.7714 20.3516V22H20.9134V17H22.0302Z" fill="#FFFFFF"></path></svg>
                                                    <div>Thẻ nội địa</div>
                                                </div>
                                            ),
                                            value: vnp_BankCode.VNBANK,
                                        },
                                        {
                                            label: (
                                                <div style={{ padding: 4 }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M27.2667 25H4.73333C3.77653 25 3 24.2669 3 23.3636V8.63636C3 7.73309 3.77653 7 4.73333 7H27.2667C28.2235 7 29 7.73309 29 8.63636V23.3636C29 24.2669 28.2235 25 27.2667 25Z" fill="#999999"></path><rect x="3" y="11" width="26" height="3" fill="#FFFFFF"></rect><path opacity="0.9" d="M24 23C25.6569 23 27 21.6569 27 20C27 18.3431 25.6569 17 24 17C22.3431 17 21 18.3431 21 20C21 21.6569 22.3431 23 24 23Z" fill="#FFFFFF"></path><path opacity="0.9" d="M20 23C21.6569 23 23 21.6569 23 20C23 18.3431 21.6569 17 20 17C18.3431 17 17 18.3431 17 20C17 21.6569 18.3431 23 20 23Z" fill="#FFFFFF"></path></svg>
                                                    <div>Thẻ Visa</div>
                                                </div>
                                            ),
                                            value: vnp_BankCode.INTCARD,
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </ConfigProvider>

                    <Form.Item style={{
                        textAlign: 'center'
                    }}
                    >
                        <Button htmlType="submit">Thanh toán</Button>
                    </Form.Item>

                    <Form.Item
                        name="bankName"
                        label={<span>Các ngân hàng hỗ trợ thanh toán qua <span style={{ color: 'red' }}>VNPAY</span>:</span>}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Radio.Group disabled={true}>
                            {
                                listBankDetail.map((item, index) => {
                                    return <Radio.Button
                                        key={index}
                                        value={item.value}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                            lineHeight: 'initial',
                                            paddingTop: 5,
                                            paddingBottom: 5,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            borderRadius: 0,
                                        }}
                                    >{item.img}</Radio.Button>
                                })
                            }
                        </Radio.Group>
                    </Form.Item>
                </Form>

            </div>
        </Flex>
    );
};

export default isAuth(RechangePage, [UserType.ADMIN, UserType.CUSTOMER]);