import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { addMessage, getMessages } from "../../_services/chat.service";
import { getUser } from "../../_services/chat.service";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import SendOutlined from "@ant-design/icons/lib/icons/SendOutlined";

const ChatBox = ({
    chat,
    currentUser,
    setSendMessage,
    receivedMessage,
}: any) => {
    const [userData, setUserData] = useState<any>(null);
    const [messages, setMessages] = useState<any>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const defaultAvatar = "https://res.cloudinary.com/deurdoich/image/upload/v1711596102/DATN/xwtalq8bbiwdxefobfwn.png"

    const handleChange = (newMessage: any) => {
        setNewMessage(newMessage);
    };

    // fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id: any) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    // fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);

    // // Always scroll to last Message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send Message
    const handleSend = async (e: any) => {
        if (newMessage !== "") {
            e.preventDefault();
            const message = {
                senderId: currentUser,
                text: newMessage,
                chatId: chat._id,
            };
            const receiverId = chat.members.find((id: any) => id !== currentUser);
            // send message to socket server
            setSendMessage({ ...message, receiverId });
            // send message to database
            try {
                const { data } = await addMessage(message);
                setMessages([...messages, data]);
                setNewMessage("");
            } catch {
                console.log("error");
            }
        } else {
            console.log("empty message");
        }
    };

    // Receive Message from parent component
    useEffect(() => {
        console.log("re render")
        console.log("Message Arrived: ", receivedMessage);
        if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    const scroll = useRef<any>();
    const imageRef = useRef<any>();
    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header">
                            <div className="follower">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        src={userData?.avatar !== "null" ? userData?.avatar : defaultAvatar}
                                        alt="Profile"
                                        className="followerImage"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <div
                                        className="name"
                                        style={{ fontSize: "1.2rem", marginLeft: "20px" }}
                                    >
                                        <span>{userData?.username}</span>
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body">
                            {messages.map((message: any) => (
                                <div
                                    ref={scroll}
                                    className={
                                        message?.senderId === currentUser ? "message own" : "message"
                                    }
                                    key={uuidv4()}
                                >
                                    <span>{message?.text}</span>
                                    <span>{format(message?.createdAt)}</span>
                                </div>
                            ))}
                        </div>
                        {/* chat-sender */}
                        <div className="chat-sender">
                            <InputEmoji 
                                value={newMessage} onChange={handleChange} 
                                onKeyDown={(event) => {
                                    // Check if the key pressed was the Enter key
                                    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
                                        // Prevent the default action
                                        event.preventDefault();
                                        // Call the handleSend function
                                        handleSend(event);
                                    }
                                }}    
                            />
                            <div 
                                className="send-button button" 
                                onClick={handleSend}
                            >
                                <SendOutlined />
                            </div>
                            <input
                                type="file"
                                name=""
                                id=""
                                style={{ display: "none" }}
                                ref={imageRef}
                            />
                        </div>
                    </>
                ) : (
                    <span className="chatbox-empty-message">
                        Tap on a chat to start conversation...
                    </span>
                )}
            </div>
        </>
    );
};

export default ChatBox;
