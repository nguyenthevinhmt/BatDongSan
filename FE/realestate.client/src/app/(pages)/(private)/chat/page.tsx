"use client";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatBox from "./_components/ChatBox/ChatBox";
import Conversation from "./_components/Conversation/Conversation";
import "./page.css";
import { useEffect } from "react";
import { getUserByAcountUserId, userChats } from "./_services/chat.service";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { RootState } from "@/redux/store";
import isAuth from "@/app/isAuth";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef<any>();
  const user = useSelector((state: RootState) => state.auth.user.data);
  const [chats, setChats] = useState<any>([]);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [receivedMessage, setReceivedMessage] = useState<any>(null);
  const [userId, setUserId] = useState<any>();
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const res: any = await getUserByAcountUserId(user?.id);
        await setUserId(res?.data?._id);
        const data = await userChats(res?.data?._id);
        setChats(data?.data);
        return res?.data?._id;
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user?.id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", userId);
    socket.current.on("get-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== "") {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data: any) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members.find((member: any) => member !== userId);
    const online = onlineUsers.find((user: any) => user.id === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Tất cả tin nhắn</h2>
          <div className="Chat-list">
            {chats.map((chat: any) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
                key={uuidv4()}
              >
                <Conversation
                  data={chat}
                  currentUser={userId}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={userId}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default isAuth(Chat);
