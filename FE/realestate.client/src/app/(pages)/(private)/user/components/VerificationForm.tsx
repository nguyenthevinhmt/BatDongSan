import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, Menu, Space } from 'antd'
import { Table } from 'antd';
import { TableColumnsType } from 'antd/lib';
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import AddIdentificationModal from './AddIdentificationModal';

const VerificationForm = () => {
    const [data, setData] = useState([{
        id: 1,
        idNo: '019202000120',
        front: 'https://res.cloudinary.com/deurdoich/image/upload/v1711342300/DATN/tbxg0o5zp2gcctcdw9mo.jpg',
        backward: 'https://res.cloudinary.com/deurdoich/image/upload/v1711342331/DATN/bufqlqobakww5tavqn8s.jpg'

    }]);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    useEffect(() => {

    }, []);

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
            dataIndex: 'front',
            key: 'front',
            render: (index, record) => {
                const isAbsoluteUrl = /^https?:\/\//i.test(record?.front || "");
                const imageUrl = isAbsoluteUrl
                    ? record?.front || ""
                    : "https://res.cloudinary.com/deurdoich/image/upload/v1710429504/DATN/g5flsesusjkanoa6fg0q.jpg";
                return (
                    <img
                        src={imageUrl}
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
            dataIndex: 'backward',
            key: 'backward',
            render: (index, record) => {
                const isAbsoluteUrl = /^https?:\/\//i.test(record?.backward || "");
                const imageUrl = isAbsoluteUrl
                    ? record?.backward || ""
                    : "https://res.cloudinary.com/deurdoich/image/upload/v1710429504/DATN/g5flsesusjkanoa6fg0q.jpg";
                return (
                    <img
                        src={imageUrl}
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
                        <Dropdown overlay={<Menu>
                            <Menu.Item
                                key={index}
                            //onClick={() => item && item.onClick && item.onClick(record.id)}
                            >
                                Thông tin chi tiết
                            </Menu.Item>
                        </Menu>} placement="bottomRight">
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
                <Button onClick={() => {
                    setIsOpenModal(true)
                }} style={{ backgroundColor: '#FF4D4F', color: '#fff' }}>Thêm mới</Button>
            </Flex>
            <Table columns={columns} dataSource={data} />
            <AddIdentificationModal isOpen={isOpenModal} />
        </div>
    )
}

export default VerificationForm
