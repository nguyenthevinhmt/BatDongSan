"use client";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/shareLayout/header";
import Avatar from "antd/es/avatar";
import Flex from "antd/es/flex";
import Dropdown from "antd/es/dropdown";
import Tooltip from "antd/es/tooltip";
import Button from "antd/es/button";
import Typography from "antd/es/typography";
import Col from "antd/es/col";
import Card from "antd/es/card";
import Divider from "antd/es/divider";
import Row from "antd/es/row";
import Link from "next/link";
import LineOutlined from "@ant-design/icons/LineOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { SiZalo } from "react-icons/si";
import { CiLink } from "react-icons/ci";
import type { MenuProps } from "antd";
import { LuDot } from "react-icons/lu";
import LeasePost from "@/app/(pages)/(public)/u/list-post/LeasePost/";
import PhoneOutlined from "@ant-design/icons/lib/icons/PhoneOutlined";
import ShareAltOutlined from "@ant-design/icons/lib/icons/ShareAltOutlined";
import { getUserInfo } from "@/services/user/user.service";
import SlidePostByUser from "@/app/components/detailComponent/SlidePostByUser";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import QC4 from "@/assets/image/QC4.gif";
import {
  createChat,
  findChat,
  getUserByAcountUserId,
} from "@/app/(pages)/(private)/chat/_services/chat.service";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import WechatOutlined from "@ant-design/icons/lib/icons/WechatOutlined";
import { AiOutlineMessage } from "react-icons/ai";

interface IUser {
  id: number;
  fullname?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

interface IPost {
  id: number;
  title: string;
  province: string;
  district: string;
  area: number;
  price: number;
  postStartDate: Date;
  firstImageUrl: string;
}

const ListPostsAuthor = () => {
  const user = useSelector((state: RootState) => state.auth.user.data);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { Paragraph } = Typography;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString());
  };
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState<string>("0965552762");

  const [userInfo, setUserInfo] = useState<IUser>();
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    setUserInfo({
      id: parseInt(searchParams?.get("id") || ""),
      fullname: searchParams?.get("fullName") || "",
      phoneNumber: searchParams?.get("phone") || "",
      avatarUrl: searchParams?.get("avatarUrl") || "",
    });
  }, []);

  const handleButtonClick = () => {
    setIsHidden(!isHidden);
  };

  const items: MenuProps["items"] = [
    {
      label: <Link href="https://www.facebook.com/">Facebook</Link>,
      key: "1",
      icon: (
        <TiSocialFacebookCircular
          style={{ fontSize: "28px", color: "#444444" }}
        />
      ),
    },
    {
      label: <Link href="https://zalo.me/0972808703">Zalo</Link>,
      key: "2",
      icon: <SiZalo style={{ fontSize: "28px", color: "#444444" }} />,
    },
    {
      label: <p onClick={copyToClipboard}>Sao chép liên kết</p>,
      key: "3",
      icon: (
        <CiLink
          onClick={copyToClipboard}
          style={{ fontSize: "28px", color: "#444444" }}
        />
      ),
    },
  ];

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const handleChat = async () => {
    const firstUser = await getUserByAcountUserId(user?.id);
    const secondUser = await getUserByAcountUserId(userInfo?.id);
    const firstId = firstUser?.data?._id;
    const secondId = secondUser?.data?._id;

    var currChat;
    const find = await findChat(firstId, secondId);

    if (find?.data === null && firstId !== secondId) {
      const params = {
        senderId: firstId,
        receiverId: secondId,
      };
      const create = await createChat(params);
      console.log("create", create);
      const getCurrChat = await findChat(firstId, secondId);
      currChat = getCurrChat?.data?._id;
    } else {
      console.log("đoạn chat đã tồn tại!");
      currChat = find?.data?._id;
    }

    router.push(`/chat?chatId=${currChat}`);
  };

  return (
    <>
      <div
        style={{ height: "270px", marginBottom: "-65px" }}
        className="background-list-posts"
      ></div>
      <div
        style={{
          background: "#fff",
          borderRadius: "7px",
          width: "100%",
          margin: "0 auto",
          maxWidth: "1224px",
        }}
      >
        <Flex justify="space-between">
          <Flex style={{ margin: "20px 20px" }}>
            <Avatar
              size={90}
              src={
                userInfo
                  ? userInfo.avatarUrl
                  : "https://images.unsplash.com/photo-1627376652834-9d2afec4ff2c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <h3
              style={{
                fontSize: "25px",
                marginLeft: "20px",
                fontFamily: "Nunito, sans-serif",
                color: "#000000",
                fontWeight: "600",
              }}
            >
              {searchParams.get("fullName")}
            </h3>
          </Flex>
          <Flex style={{ marginTop: "30px" }}>
            <Button
              style={{
                height: "44px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                fontWeight: "600",
                marginRight: "10px",
              }}
              onClick={handleChat}
            >
              <AiOutlineMessage
                style={{ fontSize: "20px", marginRight: "10px" }}
              />
              Liên hệ chat
            </Button>

            <Dropdown menu={{ items }} trigger={["click"]}>
              <Tooltip placement="top" title={"Chia sẻ"}>
                <Button
                  style={{
                    height: "44px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  <ShareAltOutlined style={{ fontSize: "20px" }} />
                  Chia sẻ
                </Button>
              </Tooltip>
            </Dropdown>
            <Button
              style={{
                background: "#009BA1",
                height: "44px",
                margin: "0 20px 0 10px",
              }}
              onClick={handleButtonClick}
            >
              <Paragraph style={styleButton} copyable={{ text: `${label}` }}>
                <PhoneOutlined style={{ fontSize: "25px" }} />{" "}
                {isHidden
                  ? searchParams
                      .get("phone")
                      ?.toString()
                      .replace(/\d(?=\d{4})/g, "*")
                  : searchParams.get("phone")}
                <LuDot />
                Hiện số
              </Paragraph>
            </Button>
          </Flex>
        </Flex>
        <Divider />
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            fontFamily: "Nunito, sans-serif",
            color: "#000000",
            margin: "25px 0",
          }}
        >
          Danh sách tin đăng bán
        </h1>
        <SlidePostByUser
          userId={parseInt(searchParams?.get("id") || "")}
          postType={1}
        />

        <Image
          src={QC4}
          alt=""
          width={1120}
          height={200}
          style={{ objectFit: "cover", marginBottom: 20 }}
        />
        <Divider />

        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            fontFamily: "Nunito, sans-serif",
            color: "#000000",
            margin: "25px 0",
          }}
        >
          Danh sách tin đăng cho thuê
        </h1>
        <SlidePostByUser
          userId={parseInt(searchParams?.get("id") || "")}
          postType={2}
        />
      </div>
    </>
  );
};
export default ListPostsAuthor;

var styleButton: any = {
  fontFamily: "Lexend Medium, Roboto, Arial",
  background: "#009BA1",
  color: "#fff",
  marginTop: "1px",
};
