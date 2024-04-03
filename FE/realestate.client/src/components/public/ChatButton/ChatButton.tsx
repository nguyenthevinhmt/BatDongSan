'use client'
import CommentOutlined from '@ant-design/icons/lib/icons/CommentOutlined'
import FloatButton from 'antd/lib/float-button/FloatButton'
import Tooltip from 'antd/lib/tooltip'
import React from 'react'

const ChatButton = () => {
    const handleChat = async () => {

    }
    return (
        <Tooltip title="Chat với admin!">
            <FloatButton onClick={handleChat} icon={<CommentOutlined />} />
        </Tooltip>
    )
}

export default ChatButton
