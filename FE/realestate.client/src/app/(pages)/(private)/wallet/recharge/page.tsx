'use client';

import isAuth from '@/app/isAuth';
import { createPayment } from '@/services/vnpay/vnpay.service';
import { walletInfo } from '@/services/wallet/wallet.service';
import { UserType } from '@/shared/consts/userType';
import { vnp_BankCode } from '@/shared/consts/vnp_BankCode';
import CreditCardOutlined from '@ant-design/icons/lib/icons/CreditCardOutlined';
import QrcodeOutlined from '@ant-design/icons/lib/icons/QrcodeOutlined';
import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import Form from 'antd/es/form';
import InputNumber from 'antd/es/input-number';
import Radio from 'antd/es/radio';
import { useRouter } from 'next/navigation';
import React from 'react';


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
                router.push(paymentUrl, );
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
                    //style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: '20%'}}
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
                        <InputNumber addonAfter="đ" style={{ width: '50%' }} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}/>                    
                    </Form.Item>

                    <Form.Item 
                        name="radioGroup" 
                        label="Chọn hình thức nạp"
                        rules={[
                            {
                              required: true,
                              message: "Hình thức nạp không được bỏ trống!",
                            },
                          ]}
                    >
                        <Radio.Group>
                            <Radio.Button value={vnp_BankCode.VNPAYQR} >
                                <QrcodeOutlined /> QR Code
                            </Radio.Button>
                            <Radio.Button value={vnp_BankCode.VNBANK}>
                                <CreditCardOutlined /> Thẻ nội địa
                            </Radio.Button>
                            <Radio.Button value={vnp_BankCode.INTCARD}>
                                <CreditCardOutlined /> Thẻ Visa
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item style={{ 
                        textAlign: 'center' 
                    }}
                    >
                        <Button htmlType="submit">Thanh toán</Button>
                    </Form.Item>
                </Form>

            </div>
        </Flex>
    );
};

export default isAuth(RechangePage, [UserType.ADMIN, UserType.CUSTOMER]);