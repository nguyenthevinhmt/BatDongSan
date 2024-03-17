import { getProvinces } from "@/services/post/address.service";
import { getRealEstateType } from "@/services/post/post.service";
import {
  Button,
  Cascader,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Tabs,
} from "antd";
import React, { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  disableCheckbox?: boolean;
}

const SearchComponent = () => {
  const [provinces, setProvinces] = useState<any>([]);
  const [realEstateType, setRealEstateType] = useState([]);
  const { Search } = Input;
  const { TabPane } = Tabs;

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await getProvinces();
      setProvinces(await response?.data);
    };
    const fetchRealEstateType = async () => {
      const response = await getRealEstateType();
      setRealEstateType(await response?.data);
    };
    fetchProvinces();
    fetchRealEstateType();
  }, []);
  const handleSubmit = () => {
    console.log("submit");
  };

  const tabs = [
    {
      key: "1",
      label: "Mua bán",
    },
    {
      key: "2",
      label: "Cho thuê",
    },
  ];
  return (
    <Form onFinish={handleSubmit}>
      <Flex
        vertical
        style={{
          margin: "20px auto",
          padding: "16px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#eee",
        }}
      >
        <Tabs
          tabBarGutter={20}
          style={{ marginBottom: "-20px", marginLeft: "20px" }}
          onChange={() => {}}
          tabBarStyle={{ border: "none" }}
          items={tabs.map((item) => {
            return {
              label: item.label,
              key: item.key,
            };
          })}
          indicator={{ size: (origin) => origin - 20, align: "center" }}
        />
        <div
          style={{
            marginTop: "5px",
            height: "auto",
            borderRadius: "0 10px 10px 10px",
            padding: "16",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              style={{
                cursor: "pointer",
                margin: "13px auto",
                height: "100%",
                border: "none",
                outline: "none",
                width: "100%",
                marginLeft: "20px",
                backgroundColor: "#fafafa",
                fontSize: "16",
              }}
              placeholder="Nhập địa chỉ hoặc dự án ...."
              suffix={
                <Button
                  size="large"
                  style={{ backgroundColor: "#FF4D4F", color: "#fff" }}
                  htmlType="submit"
                >
                  Tìm kiếm
                </Button>
              }
            />
          </div>
          <Flex
            justify="start"
            gap={10}
            style={{
              margin: "0 21px",
            }}
          >
            <Cascader
              size="middle"
              style={{ flex: "1" }}
              placeholder={"Loại nhà đất"}
              // options={options}
            />
            <Cascader
              size="middle"
              style={{ flex: "1" }}
              placeholder={"Khu vực"}
              onClick={() => {}}
            />
            <Cascader
              size="middle"
              style={{ flex: "1" }}
              placeholder={"Mức giá"}
              // options={options}
            />
            <Cascader
              size="middle"
              style={{ flex: "1" }}
              placeholder={"Diện tích"}
              // options={options}
            />
          </Flex>
        </div>
      </Flex>
    </Form>
  );
};

export default SearchComponent;
