import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, Menu, Space } from 'antd'
import { Table } from 'antd';
import { TableColumnsType } from 'antd/lib';
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import AddIdentificationModal from './AddIdentificationModal';
import type { MenuProps } from 'antd';
import { getAllUserIdentification } from '@/services/user/user.service';

const VerificationForm = () => {
    const [data, setData] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserIdentification = async () => {
            const res = await getAllUserIdentification();
            setData(res?.data)
            console.log("data", res?.data)
        }
        fetchUserIdentification();
    }, []);

    const items: MenuProps['items'] = [
        {
            label: 'Thông tin chi tiết',
            key: '1',
        },
    ];

    const showModal = () => {
        setIsOpenModal(true);
        return <AddIdentificationModal isOpen={true} />
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
                // return <Menu>
                //     <Menu.Item
                //         key={index}
                //     //onClick={() => item && item.onClick && item.onClick(record.id)}
                //     >
                //         action `${index}`
                //     </Menu.Item>
                // </Menu>
                return (
                    <Space size="middle">
                        <Dropdown
                            menu={{ items }}
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
                {!!data && <Button size='large' onClick={() => {
                    setIsOpenModal(true)
                }} style={{ backgroundColor: '#FF4D4F', color: '#fff' }}>Thêm mới</Button>}
            </Flex>
            <Table columns={columns} dataSource={data} />
            <AddIdentificationModal isOpen={isOpenModal} handleShowModal={() => { setIsOpenModal(!isOpenModal) }} />
        </div>
    )
}

export default VerificationForm
