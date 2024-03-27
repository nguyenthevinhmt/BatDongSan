import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, Menu, Space } from 'antd'
import { Table } from 'antd';
import { TableColumnsType } from 'antd/lib';
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import AddIdentificationModal from './AddIdentificationModal';
import type { MenuProps } from 'antd';
import { getAllUserIdentification, getDetailUserIdentification } from '@/services/user/user.service';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const VerificationForm = () => {
    const [data, setData] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [dataDetail, setDataDetail] = useState<any>();


    const userSelector = useSelector((state: RootState) => {
        return state.auth.user.data;
    });
    useEffect(() => {
        const fetchUserIdentification = async () => {
            const res = await getAllUserIdentification();
            setData(res?.data)
        }
        fetchUserIdentification();
    }, [isOpenModal]);
    const getDetail = async (id: number) => {
        const response = await getDetailUserIdentification(id);
        await setDataDetail(response?.data);

        setIsOpenModal(true);
        return response?.data;
    }
    const columns: TableColumnsType<any> = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Mã số giấy tờ',
            // width: 20,
            dataIndex: 'idNo',
            key: 'idNo',
        },
        {
            title: 'Mặt trước',
            dataIndex: 'frontImageUrl',
            key: 'frontImageUrl',
            render: (index, record) => {
                const isAbsoluteUrl = /^https?:\/\//i.test(record?.front || "");
                const imageUrl = isAbsoluteUrl
                    ? record?.frontImageUrl
                    : "https://res.cloudinary.com/deurdoich/image/upload/v1710429504/DATN/g5flsesusjkanoa6fg0q.jpg";
                return (
                    <img
                        src={record?.frontImageUrl}
                        alt="Mô tả ảnh"
                        width={100}
                        height={80}
                        style={{ objectFit: "cover" }}
                    />
                );
            }
        },
        {
            title: 'Mặt sau',
            dataIndex: 'backwardImageUrl',
            key: 'backwardImageUrl',
            render: (index, record) => {
                const isAbsoluteUrl = /^https?:\/\//i.test(record?.backward || "");
                const imageUrl = isAbsoluteUrl
                    ? record?.backwardImageUrl
                    : "https://res.cloudinary.com/deurdoich/image/upload/v1710429504/DATN/g5flsesusjkanoa6fg0q.jpg";
                return (
                    <img
                        src={record?.backwardImageUrl}
                        alt="Mô tả ảnh"
                        width={100}
                        height={80}
                        style={{ objectFit: "cover" }}
                    />
                );
            }
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (index, record) => {
                const menu = (
                    <Menu>
                        <Menu.Item
                            key={index}
                            onClick={() => {
                                getDetail(record?.id);
                            }}
                        >
                            Thông tin chi tiết
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Space size="middle">
                        <Dropdown
                            overlay={menu}
                            placement="bottomRight">
                            <a>
                                <EllipsisOutlined style={{ fontSize: 25 }} />
                            </a>
                        </Dropdown>
                    </Space>
                );
            }
        },
    ];

    return (
        <div>
            <Flex justify='flex-end' style={{ marginBottom: '20px' }}>
                {!userSelector?.isConfirm && <Button size='large' onClick={() => {
                    setIsOpenModal(true)
                }} style={{ backgroundColor: '#FF4D4F', color: '#fff' }}>Thêm mới</Button>}
            </Flex>
            <Table columns={columns} dataSource={data} />
            <AddIdentificationModal isOpen={isOpenModal} handleShowModal={() => { setIsOpenModal(!isOpenModal) }} data={dataDetail} />
        </div>
    )
}

export default VerificationForm

