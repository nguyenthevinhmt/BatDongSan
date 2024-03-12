"use client";
import HeaderComponent from "@/components/shareLayout/header";
import withTheme from "@/theme";
import React, { useState } from "react";
import { Flex, Tabs, Input, Cascader, Layout, Card, Affix } from "antd";
import { options, listTabs, listText } from "./utils";
import Image from "next/image";
import danang from "../assets/image/danang.jpg";
import hue from "../assets/image/hue.jpg";
import hanoi from "../assets/image/hanoi.png";
import HCM from "../assets/image/HCM.jpg";
import FisrtSplitComponent from "./components/FisrtSplitComponent";
import ListGoods from "./components/ListGoods";
const App = () => {
  const { Search } = Input;
  const { Meta } = Card;
  const [location, setLocation] = useState("Trên toàn quốc"); // search

  const [selectText, setSelectText] = useState(listText[1]);

  const hoverStyles = {
    transform: "scale(1,2)",
  };
  const j = {
    transition: "0.3s",
    ...hoverStyles,
  };
  const onChange = (key: any) => {
    setSelectText(listText[key]);
  };
  const onSearch = (key: string) => {
    console.log(key);
  };
  const onChangeCateHome = (value: string[]): void => {
    console.log(value);
  };
  const onChangePrice = (value: string[]): void => {
    console.log(value);
  };
  const onChangeAcreage = (value: string[]): void => {
    console.log(value);
  };

  return (
    <>
      <div
        style={{ width: "100%", height: "100%", backgroundColor: "#F4F4F4" }}
      >
        <HeaderComponent />
        <Layout
          style={{
            margin: "0 auto",
            maxWidth: "1340px",
            minWidth: "1340px",
            backgroundColor: "#F4F4F4",
            padding: "0 167px",
          }}
        >
          <Flex
            vertical
            style={{
              margin: "20px auto",
              padding: "4px",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <Tabs
              tabBarGutter={20}
              style={{ marginBottom: "-20px" }}
              onChange={onChange}
              type="card"
              tabBarStyle={{ border: "none" }}
              items={listTabs.map((item, i) => {
                const id = String(i + 1);
                return {
                  label: `${item}`,
                  key: id,
                };
              })}
            />
            <div
              style={{
                background: "#FEBB02",
                marginTop: "5px",
                height: "112px",
                borderRadius: "0 10px 10px 10px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Search
                  style={{
                    cursor: "pointer",
                    margin: "13px auto",
                    width: "956px",
                  }}
                  placeholder={location}
                  allowClear
                  enterButton="Tìm kiếm"
                  size="large"
                  onSearch={onSearch}
                />
              </div>
              <Flex justify="space-between" style={{ margin: "0 21px" }}>
                <Cascader
                  className="custom-cascader"
                  placeholder={selectText?.text1}
                  options={options}
                />
                <Cascader placeholder={selectText?.text2} options={options} />
                <Cascader placeholder={selectText?.text3} options={options} />
              </Flex>
            </div>
          </Flex>
          <div>
            <p
              style={{
                fontFamily: "Arial,Helvetica,sans-serif",
                fontSize: "24px",
                fontWeight: "600",
                textAlign: "center",
                color: "#333",
              }}
            >
              Tìm kiếm nơi đầu tư hợp lý
            </p>
            <Flex justify="space-between" style={{ margin: "20px 0" }}>
              <Card
                hoverable
                style={{ width: 240, height: "auto", overflow: "hidden" }}
                cover={
                  <Image alt="example" width={350} height={200} src={hanoi} />
                }
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "#1266DD",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  Thủ đô Hà Nội
                </p>
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <Image alt="example" width={350} height={200} src={hue} />
                }
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "#1266DD",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  Thành phố Huế
                </p>
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <Image alt="example" width={350} height={200} src={danang} />
                }
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "#1266DD",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  Thành phố Đà Nẵng
                </p>
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <Image alt="example" width={350} height={200} src={HCM} />
                }
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "#1266DD",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  Thành phố Hồ Chí Minh
                </p>
              </Card>
            </Flex>
          </div>
          <FisrtSplitComponent />
          <ListGoods />
        </Layout>
      </div>
    </>
  );
};
const AppPage = () => {
  return withTheme(<App />);
};

export default AppPage;
