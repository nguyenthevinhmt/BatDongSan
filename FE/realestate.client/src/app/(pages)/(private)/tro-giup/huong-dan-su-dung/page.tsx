'use client';
import { Divider, Flex, Table } from 'antd';
import Tag from 'antd/lib/tag';
import React from 'react';

const PageManual = () => {
    return (
        <Flex vertical style={{paddingLeft: 20}}>
            <div style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                fontFamily: "Nunito, sans-serif",
            }}>
                Hướng dẫn sử dụng
            </div>
            <Divider/>
            <p style={{marginBottom: 20}}>Đang trong quá trình phát triển.</p>
        </Flex>
    );
};

export default PageManual;