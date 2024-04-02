import React, { useState } from "react";
import { useEffect } from "react";
import "../../page.css";
import { getUser } from "../../_services/chat.service";
const Conversation = ({ data, currentUser, online }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const defaultAvatar = "https://res.cloudinary.com/deurdoich/image/upload/v1711596102/DATN/xwtalq8bbiwdxefobfwn.png"

  useEffect(() => {
    const userId = data.members.find((id: any) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        console.log("object", data)
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div style={{ display: "flex" }}>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.avatar !== "null" ? userData?.avatar : defaultAvatar}
            alt="Profile"
            className="followerImage"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div
            className="name"
            style={{ fontSize: "0.8rem", marginLeft: "10px" }}
          >
            <span>{userData?.username}</span>
            <br />
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
