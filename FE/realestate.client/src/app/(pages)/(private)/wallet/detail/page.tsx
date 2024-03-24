'use client';
import isAuth from '@/app/isAuth';
import { walletInfo } from '@/services/wallet/wallet.service';
import { UserType } from '@/shared/consts/userType';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import List from 'antd/es/list';
import router, { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GiWallet } from 'react-icons/gi';

interface IWallet {
    id: number;
    walletNumber: string;
    balance: number;
    userId: number;
    userName: string;
}

const WalletDetail = () => {
    const router = useRouter();
    const [wallet, setWallet] = useState<IWallet>();
    useEffect(() => {
        const fetchData = async () => {
            //lấy id ví ứng với người dùng hiện tại
            const walletResponse = await walletInfo();

            setWallet({
                id: walletResponse?.data.data.id,
                walletNumber: walletResponse?.data.data.walletNumber,
                balance: walletResponse?.data.data.balance,
                userId: walletResponse?.data.data.userId,
                userName: walletResponse?.data.data.userName
            });
        };

        fetchData();
    }, []);


    const handleRecharge = () => {
        router.push("/wallet/recharge");
    }
    return (
        <div>
            <Flex
                vertical
                style={{
                    backgroundColor: "#fff",
                    //height: 70,
                    marginBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 8,
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}>
                <div style={{
                    fontSize: 24,
                    fontWeight: "500",
                    marginBottom: 5,
                }}>Thông tin số dư</div>

                <div style={{
                    width: "100%",
                    //height: "100%",
                    margin: "auto",
                    //padding: 20,
                    backgroundColor: "#fff",
                    //borderRadius: 8,
                    //boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}>
                    <List
                        itemLayout="vertical"
                        dataSource={wallet ? [wallet] : []}
                        renderItem={(item, index) => (
                            <List.Item key={item.id}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, fontSize: 16 }}>
                                    <div style={{ fontWeight: 'bold' }}>Tên:</div>
                                    <div>{item.userName}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, fontSize: 16 }}>
                                    <div style={{ fontWeight: 'bold' }}>Số ví:</div>
                                    <div>{item.walletNumber}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, fontSize: 16 }}>
                                    <div style={{ fontWeight: 'bold' }}>Balance</div>
                                    <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(item.balance)}</div>
                                </div>
                            </List.Item>
                        )}
                    />
                    {
                        wallet?.id ?
                        <Flex justify='space-evenly'>
                            <Button
                                type="primary"
                                style={{
                                    width: "48%",
                                }}
                                onClick={handleRecharge}
                            > <WalletOutlined style={{width: 20}}/> Nạp tiền</Button>
                            <Button
                                type="primary"
                                style={{
                                    width: "48%",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ff4d4f",
                                    color: "#ff4d4f"
                                }}
                                //onClick={handleRecharge}
                            > <GiWallet style={{width: 20, paddingRight: 3}}/> Rút tiền</Button>
                        </Flex>
                            : null
                    }

                </div>

            </Flex>
        </div>
    );
};

export default isAuth(WalletDetail, [UserType.ADMIN, UserType.CUSTOMER]);