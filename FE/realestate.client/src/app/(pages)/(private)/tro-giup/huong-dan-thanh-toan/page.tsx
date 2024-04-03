'use client';
import { Divider, Flex, Table } from 'antd';
import Tag from 'antd/lib/tag';
import React from 'react';
import Image from 'next/image';
import PX1 from '@/assets/image/PX1.png';
import PX2 from '@/assets/image/PX2.png';
import PX3 from '@/assets/image/PX3.png';
import PX4 from '@/assets/image/PX4.png';
import PX5 from '@/assets/image/PX5.png';
import PX6 from '@/assets/image/PX6.png';


const PageExplainPay = () => {


    return (
        <Flex vertical style={{paddingLeft: 20}}>
            <div style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                fontFamily: "Nunito, sans-serif",
            }}>
                Hướng dẫn thanh toán
            </div>
            <Divider/>
            <p style={{marginBottom: 20}}>
                Để quá trình thanh toán, nạp tiền được thuận lợi và nhanh chóng, Batdongsan áp dụng đa dạng hình thức thanh toán, 
                nạp tiền đáp ứng nhiều nhu cầu khác nhau của khách hàng. Bạn vui lòng chọn hình thức thanh toán phù hợp với mình nhé!
            </p>

            <div style={{marginBottom: 20}}>
                <p style={{fontWeight: 500}}>B1. Nhập số tiền bạn muốn nạp vào ví:</p>
                <Image src={PX2} alt='' width={500} height={250} style={{ objectFit: "cover", marginTop: 10 }} />
                <p>Hoặc bạn có thể chọn nhanh 1 mệnh giá ở bên dưới.</p>
            </div>

            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2. Chọn hình thức thanh toán phù hợp với bạn:</p>
                <Image src={PX1} alt='' width={600} height={250} style={{ objectFit: "cover", marginTop: 10 }} />
            </div>
            
            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2.1. Thanh toán qua QR_CODE<span style={{fontWeight: 300, color: 'red'}}> (Đang trong quá trình phát triển)</span></p>
            </div>

            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2.2. Thanh toán qua Thẻ nội địa</p>
                <Image src={PX1} alt='' width={600} height={250} style={{ objectFit: "cover", marginTop: 10 }} />
            </div>

            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2.2.1. Chọn ngân hàng thanh toán</p>
                <Image src={PX3} alt='' width={800} height={1650} style={{ objectFit: "cover", marginTop: 10 }} />
            </div>

            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2.2.2. Nhập thông tin thẻ</p>
                <Image src={PX4} alt='' width={600} height={450} style={{ objectFit: "cover", marginTop: 10 }} />
            </div>

            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2.2.3. Nhập mật khẩu</p>
                <Image src={PX5} alt='' width={600} height={450} style={{ objectFit: "cover", marginTop: 10 }} />
            </div>

            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2.2.4. Thanh toán thành công</p>
                <Image src={PX6} alt='' width={600} height={250} style={{ objectFit: "cover", marginTop: 10 }} />
            </div>

            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2.3. Thanh toán qua thẻ Visa</p>
            </div>

            <div style={{marginBottom: 20}}>
                <p  style={{fontWeight: 500}}>B2.3.1. Chọn hình thức thanh toán qua Thẻ nội địa</p>
                <Image src={PX1} alt='' width={600} height={250} style={{ objectFit: "cover", marginTop: 10 }} />
            </div>
        </Flex>
    );
};

export default PageExplainPay;