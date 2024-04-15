'use client'
import CommentOutlined from '@ant-design/icons/lib/icons/CommentOutlined'
import FloatButton from 'antd/lib/float-button/FloatButton'
import Tooltip from 'antd/lib/tooltip'
import React from 'react'

import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createChat, findChat, getUserByAcountUserId } from '@/app/(pages)/(private)/chat/_services/chat.service'

const ChatButton = () => {
    const user = useSelector((state: RootState) => state.auth.user.data);
    const router = useRouter();
    const currentPath = usePathname();

    const handleChat = async () => {
        const firstUser = await getUserByAcountUserId(user?.id);
        const secondUser = await getUserByAcountUserId(1);
        const firstId = firstUser?.data?._id;
        const secondId = secondUser?.data?._id;
    
        var currChat;
        const find = await findChat(firstId, secondId);
        
        if (find?.data === null && firstId !== secondId) {
          const params = {
            "senderId": firstId,
            "receiverId": secondId,
          };
          const create = await createChat(params);
          console.log('create', create);
          const getCurrChat = await findChat(firstId, secondId);
          currChat = getCurrChat?.data?._id;
        } else {
          console.log('đoạn chat đã tồn tại!');
          currChat = find?.data?._id;
        }
        
        router.push(`/chat?chatId=${currChat}`);
      };
    
    if (currentPath === '/chat') return null;
    else {
        return (
            <Tooltip title="Chat với admin!">
                <FloatButton onClick={handleChat} icon={<CommentOutlined />} />
            </Tooltip>
        )
    }
}

export default ChatButton
