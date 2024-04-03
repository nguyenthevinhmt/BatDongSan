'use client';
import { Divider, Flex, Table } from 'antd';
import Tag from 'antd/lib/tag';
import React from 'react';

const PagePrice = () => {
    const dataSource = [
        {
            time: '1 ngày',
            key: '1',
            normal: '2.000',
            vip1: '50.000',
            vip2: '100.000',
            vip3: '200.000',
        },
        {
            time: '5 ngày',
            key: '2',
            normal: '10.000',
            vip1: '250.000',
            vip2: '500.000',
            vip3: '1.000.000',
        },
        {
            time: '7 ngày',
            key: '3',
            normal: '14.000',
            vip1: '350.000',
            vip2: '700.000',
            vip3: '1.400.000',
        },
        {
            time: '10 ngày',
            key: '4',
            normal: '20.000',
            vip1: '500.000',
            vip2: '1.000.000',
            vip3: '2.000.000',
        },
        {
            time: '15 ngày',
            key: '5',
            normal: '30.000',
            vip1: '750.000',
            vip2: '1.500.000',
            vip3: '3.000.000',
        },
        {
            time: '30 ngày',
            key: '6',
            normal: '60.000',
            vip1: '1.500.000',
            vip2: '3.000.000',
            vip3: '6.000.000',
        }
      ];
      
      const columns = [
        {
          title: 'Thời gian',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: 'Tin Thường',
          dataIndex: 'normal',
          key: 'normal',
        },
        {
            title: 'VIP BẠC',
          dataIndex: 'vip1',
          key: 'vip1',
        },
        {
          title: 'VIP VÀNG',
          dataIndex: 'vip2',
          key: 'vip2',
        },
        {
          title: 'VIP KIM CƯƠNG',
          dataIndex: 'vip3',
          key: 'vip3',
        },
        
      ];

    return (
        <Flex vertical style={{paddingLeft: 20}}>
            <div style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                fontFamily: "Nunito, sans-serif",
            }}>
                Bảng giá tin đăng
            </div>
            <Divider/>
            <p style={{marginBottom: 20}}>
                Tin đăng trên Batdongsan bao gồm Tin VIP và Tin thường. Tin VIP gồm VIP BẠC, VIP VÀNG, VIP KIM CƯƠNG có
                các mức giá khác nhau và quyền lợi khác nhau.
            </p>
            <p style={{marginBottom: 20}}>
                Cách tính giá tin đăng với mỗi loại:
            </p>
            <div>
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={false}
                />
            </div>
        </Flex>
    );
};

export default PagePrice;