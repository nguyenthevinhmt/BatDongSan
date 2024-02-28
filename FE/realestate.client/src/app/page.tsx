"use client";
import HeaderComponent from "@/components/shareLayout/header";
import withTheme from "@/theme";
import React, { useState } from 'react';
import { Flex, Tabs, Input, Cascader, Layout, Card } from 'antd';
import { options, listTabs, listText } from './utils';
import Image from 'next/image';
import danang from "../assets/image/danang.jpg";
import hanoi from "../assets/image/hanoi.png";
import hue from "../assets/image/hue.jpg";
import HCM from "../assets/image/HCM.jpg";
import FisrtSplitComponent from './homeComponent/FisrtSplitComponent';
import ListGoods from './homeComponent/ListGoods';
const App = () => {
  return (
    // <LoadingComponent />
    <></>
    // <div style={{height: '2000px'}}>
    // </div>
  );
};
const AppPage = () => {
    return withTheme(<App />);
};

export default AppPage;
