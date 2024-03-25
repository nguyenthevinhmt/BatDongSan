import { Button, Flex, Modal } from 'antd'
import React from 'react'

const AddIdentificationModal = ({ isOpen }: any) => {
    return (
        <Modal
            width={1030}
            open={isOpen}
            title="Thêm mới giấy tờ"
            footer={
                <div style={{ marginTop: '80px' }}>
                    <Flex justify='flex-end'>
                        <Button>Hủy</Button>
                        <Button style={{ marginLeft: "12px", backgroundColor: '#ff4d4f', color: "#fff" }}>Lấy thông tin</Button>
                    </Flex>
                </div>
            }>
            <Flex justify='space-around' style={{ width: '980px', height: '280px', marginTop: "90px" }}>
                <div>
                    <p style={{ fontWeight: '500' }}>Giấy tờ mặt trước</p>
                    <div><button style={{ width: '400px', height: '280px' }}>Mặt trước</button></div>
                </div>
                <div>
                    <p style={{ fontWeight: '500' }}>Giấy tờ mặt sau</p>
                    <div><button style={{ width: '400px', height: '280px' }}>Mặt trước</button></div>
                </div>
            </Flex>
        </Modal>
    )
}

export default AddIdentificationModal
