import React, { useState } from 'react';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Flex from 'antd/es/flex';
import Tooltip from 'antd/lib/tooltip';
import { Carousel } from '../carousel/carousel'
import LabelCardHorizon from '../HOC/LabelCardHorizon'
import { OptionConst } from '@/shared/consts/PostOption.const'
import { IoMdHeart } from 'react-icons/io'
import { PiHeartFill } from 'react-icons/pi'

const PostHorizon = ({ data, option, loading }: { data?: any, option?: number, loading?: boolean }) => {
    const [isSave, setIsSave] = useState(false);
    let labelText = '';
    let color = ''
    if (option === OptionConst.NORMAL) {
        return <div style={{ width: "720px", height: '162px', marginBottom: '60px' }}>
            <Flex>
                <div style={{ flex: 3 }}>
                    <Carousel width={200} height={150} data={[
                        {
                            "src": "https://res.cloudinary.com/deurdoich/image/upload/v1710727581/DATN/nzukg083fzs7pfqrstad.jpg",
                            "alt": "Image 1 for carousel"
                        },
                        {
                            "src": "https://res.cloudinary.com/deurdoich/image/upload/v1710727580/DATN/hcgpjapq5vz4lre9ofbk.jpg",
                            "alt": "Image 2 for carousel"
                        },
                        {
                            "src": "https://res.cloudinary.com/deurdoich/image/upload/v1710727579/DATN/nalwal7007piskzhbopr.jpg",
                            "alt": "Image 3 for carousel"
                        }
                    ]} />
                </div>
                <div style={{ flex: 7 }}>
                    <h3 style={{ color: '#444', fontWeight: '500' }}>BÁN NHÀ SÀI ĐỒNG, LONG BIÊN 112M2, 5 TẦNG, MẶT TIỀN 5M, GARA, THANG MÁY, Ô TÔ TRÁNH, 2 THOÁNG</h3>
                    <p style={{ margin: "10px 0px", color: 'rgba(0, 0,0, 0.6)' }}>Long Biên, Hà Nội</p>
                    <Flex align='center' style={{ width: '140px' }}>
                        <div>30 m²</div>
                        <Flex align='center'><div style={{ backgroundColor: 'rgba(0, 0,0, 0.6)', width: "4px", height: '4px', borderRadius: "100%", margin: '0 0.3rem' }}></div>3 PN</Flex>
                        <Flex align='center'><div style={{ backgroundColor: 'rgba(0, 0,0, 0.6)', width: "4px", height: '4px', borderRadius: "100%", margin: '0 0.3rem' }}></div>2 WC</Flex>
                    </Flex>
                    <Flex justify='space-between' style={{ marginTop: "40px" }}>
                        <div style={{ color: 'rgba(0, 0,0, 0.6)' }}>3 tiếng trước</div>
                        <Flex>
                            <Flex style={{ fontSize: '18px', fontWeight: '600', color: "#444", marginRight: '10px' }}>

                                <div style={{ marginRight: '10px' }}>1,38 Tỷ</div>
                                <div>30 m²</div>
                            </Flex>
                            <Tooltip title={isSave ? "Bỏ lưu" : "Lưu bài viết"}>
                                <Button
                                    shape="circle"
                                    // onClick={onChange}
                                    style={{ color: '#ccc', borderColor: `${isSave ? 'red' : '#ccc'}`, backgroundColor: "#fafafa" }}
                                    icon={
                                        isSave ?
                                            <PiHeartFill style={{ color: "red", borderColor: 'red' }} /> :
                                            <IoMdHeart />
                                    }
                                    onClick={() => {
                                        setIsSave(!isSave);
                                    }}
                                />
                            </Tooltip>
                        </Flex>
                    </Flex>
                </div>
            </Flex >
            <Divider />
        </div>
    }
    if (option === OptionConst.SILVER) {
        labelText = 'VIP Bạc';
        color = "#009BA1";
    }
    else if (option === OptionConst.GOLD) {
        labelText = 'VIP Vàng';
        color = "#E3AA49";
    }
    else if (option === OptionConst.DIAMOND) {
        labelText = 'VIP Kim Cương';
        color = "#E03C6D";
    }
    return (
        <LabelCardHorizon text={labelText} color={color}>
            <div style={{ width: "720px", height: '162px', marginBottom: "60px" }}>
                <Flex>
                    <div style={{ flex: 3 }}>
                        <Carousel width={200} height={150} data={[
                            {
                                "src": "https://res.cloudinary.com/deurdoich/image/upload/v1710727581/DATN/nzukg083fzs7pfqrstad.jpg",
                                "alt": "Image 1 for carousel"
                            },
                            {
                                "src": "https://res.cloudinary.com/deurdoich/image/upload/v1710727580/DATN/hcgpjapq5vz4lre9ofbk.jpg",
                                "alt": "Image 2 for carousel"
                            },
                            {
                                "src": "https://res.cloudinary.com/deurdoich/image/upload/v1710727579/DATN/nalwal7007piskzhbopr.jpg",
                                "alt": "Image 3 for carousel"
                            }
                        ]} />
                    </div>
                    <div style={{ flex: 7 }}>
                        <h3 style={{ color: '#444', fontWeight: '500' }}>BÁN NHÀ SÀI ĐỒNG, LONG BIÊN 112M2, 5 TẦNG, MẶT TIỀN 5M, GARA, THANG MÁY, Ô TÔ TRÁNH, 2 THOÁNG</h3>
                        <p>Long Biên, Hà Nội</p>
                        <Flex align='center' justify='space-between' style={{ width: '200px' }}>
                            <div>30 m²</div>
                            <li>3 PN</li>
                            <li>2 WC</li>
                        </Flex>
                        <Flex justify='space-between' style={{ marginTop: "40px" }}>
                            <div>3 tiếng trước</div>
                            <Flex style={{ fontSize: '16px', fontWeight: '500' }}>
                                <div style={{ marginRight: '10px' }}>1,38 Tỷ</div>
                                <div>30 m²</div>
                            </Flex>
                        </Flex>
                    </div>
                </Flex >
                <Divider />
            </div>
        </LabelCardHorizon>
    )
}

export default PostHorizon
