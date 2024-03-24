'use client';
import isAuth from '@/app/isAuth';
import { UserType } from '@/shared/consts/userType';
import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import Result from 'antd/es/result';
import React, { useState } from 'react';

interface IBank {
    id: number;
    bankName: string;
    bankCode: string;
};

const withdrawPage = () => {
    // Add your component logic here
    const [listBank, setListBank] = useState<IBank[]>([]);

    return (
        <div
            style={{
                width: '100%',
                borderRadius: 8,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}>
            <div>
                {listBank ?
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
                                marginBottom: 5,
                            }}>Rút tiền</div>

                            <div style={{
                                width: '100%',
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}>
                            </div>

                        </Flex>
                    </div>
                    :
                    <div>
                        <Result
                            title={"Bạn chưa có tài khoản ngân hàng nào cả. "
                                + "Vui lòng thêm tài khoản ngân hàng để tiếp tục sử dụng dịch vụ của chúng tôi."}
                            extra={
                                <Button
                                    type="primary"
                                    key="console"
                                >
                                    Thêm tài khoản ngân hàng
                                </Button>
                            }
                        />
                    </div>
                }
            </div>

        </div >
    );

};

export default isAuth(withdrawPage, [UserType.ADMIN, UserType.CUSTOMER]);