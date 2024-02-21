'use client';
import theme from '@/theme/themeConfig'
import { ConfigProvider, Layout, Menu, MenuProps } from 'antd'
import React from 'react'
import HeaderComponent from '../shareLayout/header';

const CommontLayout = ({ children }: {children: React.ReactElement}) => {
    const headerItems: MenuProps["items"] = [
        "Nhà đất bán",
        "Nhà đất cho thuê",
        "Dự án",
        "Tin tức",
        "Liên hệ",
      ].map((key) => ({
        key,
        label: `${key}`,
        title: `${key}`,
        style: {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
        },
      }));
    
  return (
    <ConfigProvider theme={theme}>
      <div style={{ height: "100%", width: "100%" }}>
        <Layout style={{ backgroundColor: "#fff", height: "100%" }}>
          <HeaderComponent prop={headerItems} />
          {children}
        </Layout>
      </div>
    </ConfigProvider>
  )
}

export default CommontLayout
