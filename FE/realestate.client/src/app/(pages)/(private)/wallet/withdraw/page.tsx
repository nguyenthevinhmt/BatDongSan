'use client';
import isAuth from '@/app/isAuth';
import { UserType } from '@/shared/consts/userType';
import Button from 'antd/es/button';
import ConfigProvider from 'antd/es/config-provider';
import Flex from 'antd/es/flex';
import Form from 'antd/es/form';
import InputNumber from 'antd/es/input-number';
import Radio from 'antd/es/radio';
import Result from 'antd/es/result';
import Segmented from 'antd/es/segmented';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
import { vnp_BankCode } from '@/shared/consts/vnp_BankCode';
import { useRouter } from 'next/navigation';
import { getAllBank } from '@/services/bank/bank.service';
import { walletInfo, withdrawWallet } from '@/services/wallet/wallet.service';
import { HTTP_STATUS_CODE } from '@/shared/consts/http';
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

interface IWallet {
    id: number;
    walletNumber: string;
    balance: number;
    userId: number;
    userName: string;
}

const withdrawPage = () => {
    // Add your component logic here
    const router = useRouter();
    const [listBank, setListBank] = useState<IBank[]>([]);
    const [wallet, setWallet] = useState<IWallet>({} as IWallet);
    const [form] = Form.useForm();
    const [isChange, setIsChange] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            //lấy thông tin ví
            const walletResponse = await walletInfo();

            setWallet({
                id: walletResponse?.data.data.id,
                walletNumber: walletResponse?.data.data.walletNumber,
                balance: walletResponse?.data.data.balance,
                userId: walletResponse?.data.data.userId,
                userName: walletResponse?.data.data.userName
            });

            form.setFieldValue("currentBalance", walletResponse?.data.data.balance);

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

    const handleWithdraw = async (values: any) => {
        const payload = {
            walletNumber: wallet.walletNumber,
            transactionAmount: values.amount,
            transactionTo: values.radioGroup
        };
        const response = await withdrawWallet(payload);
        if (response?.code === HTTP_STATUS_CODE.OK) {
            alert("Rút tiền thành công!");
            setIsChange(!isChange);
        } else {
            alert("Rút tiền thất bại!");
            setIsChange(!isChange);
        }
    };

    return (
        <div
            style={{
                width: '100%',
                borderRadius: 8,
            }}>
            <div>
                {listBank && listBank.length > 0 ?
                    (<Flex justify="center" gap="small" vertical>
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
                                Rút tiền về ngân hàng
                            </p>

                            <Form
                                form={form}
                                style={{ width: '100%' }}
                                layout="vertical"
                                autoComplete="off"
                                onFinish={handleWithdraw}
                            >
                                <Form.Item
                                    name="currentBalance"
                                    label="Số dư hiện tại: "
                                >
                                    <InputNumber 
                                        disabled={true} 
                                        addonAfter="đ" 
                                        style={{ width: '50%' }} 
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => parseFloat(value!.replace(/\$\s?|(,*)/g, ''))} 
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="amount"
                                    label="Số tiền bạn muốn rút"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Số tiền không được bỏ trống!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                const balance = wallet.balance; // Giả sử 'balance' là trường chứa số dư
                                                if (value && value > balance) {
                                                    return Promise.reject('Số tiền rút không thể lớn hơn số dư!' + ' Số dư hiện tại: ' + `${balance}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ');
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <InputNumber addonAfter="đ" style={{ width: '50%' }} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value!.replace(/\$\s?|(,*)/g, '')} />
                                </Form.Item>

                                <Form.Item
                                    name="quickChoice"
                                    label="Hoặc chọn nhanh:"
                                >
                                    <Radio.Group>
                                        {
                                            quickChoice.map((item) => {
                                                return <Radio.Button
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
                                    <Form.Item
                                        name="radioGroup"
                                        label="Chọn ngân hàng nhận tiền: "
                                        rules={[
                                            {
                                                required: true,
                                                message: "Ngân hàng nhận tiền không được bỏ trống!",
                                            },
                                        ]}
                                    >
                                        <Segmented
                                            options={
                                                listBank.map((item) => {
                                                    return {
                                                        key: item.bankCode,
                                                        label: (
                                                            <div style={{ padding: 4 }}>
                                                                <div>{item.bankName}</div>
                                                                <div>{item.bankCode}</div>
                                                            </div>
                                                        ),
                                                        value: item.bankCode,
                                                    };
                                                })
                                            }
                                        />
                                    </Form.Item>
                                </ConfigProvider>

                                <Form.Item style={{
                                    textAlign: 'center'
                                }}
                                >
                                    <Button htmlType="submit">Rút tiền</Button>
                                </Form.Item>

                                <Form.Item
                                    name="bankName"
                                    label={<span>Các ngân hàng hỗ trợ rút tiền về:</span>}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >
                                    <Radio.Group disabled={true}>
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
                                                        borderRadius: 0,
                                                    }}
                                                >{item.img}</Radio.Button>
                                            })
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </Form>

                        </div>
                    </Flex>)
                    :
                    (<div>
                        <Result
                            title={"Bạn chưa có tài khoản ngân hàng nào cả. "
                                + "Vui lòng thêm tài khoản ngân hàng để tiếp tục sử dụng dịch vụ của chúng tôi."}
                            extra={
                                <Button
                                    type="primary"
                                    key="console"
                                    onClick={() => {
                                        router.push('bank');
                                    }}
                                >
                                    Thêm tài khoản ngân hàng
                                </Button>
                            }
                        />
                    </div>)
                }
            </div>

        </div >
    );

};

export default isAuth(withdrawPage, [UserType.ADMIN, UserType.CUSTOMER]);