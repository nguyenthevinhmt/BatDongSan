import { Flex } from 'antd'
import React from 'react'
import Image from 'next/image'
import "@/components/public/realEstateByLocation/style.css"
import Link from 'next/link'

const RealEstateByLocation = () => {
    return (
        <div>
            <h2 style={{
                fontSize: '24px', fontWeight: '500'
            }}>Bất động sản theo địa điểm</h2>
            <Flex gap={30} style={{ marginTop: '30px' }}>
                <div style={{ position: "relative", width: "554px", height: '410px' }}>
                    <Link href="#" className='absolute_label' style={{ color: 'white', fontWeight: "700" }}>TP. Hồ Chí Minh</Link>
                    <Image style={{ borderRadius: '4px', objectFit: 'cover' }} alt='#' width={554} height={410} src="https://res.cloudinary.com/deurdoich/image/upload/v1710818796/DATN/iahj3j1oz5ksi0iop0ka.avif" />
                </div>
                <Flex gap={30}>
                    <div>
                        <div style={{ position: 'relative' }}>
                            <Link href="#" className='absolute_label' style={{ color: 'white', fontWeight: "700" }}>Hà Nội</Link>
                            <Image style={{ marginBottom: "25px", borderRadius: '4px' }} alt='#' width={262} height={190} src="https://res.cloudinary.com/deurdoich/image/upload/v1710819132/DATN/bgv9k4plmmcpn13szbsz.avif" />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Link href="#" className='absolute_label white_text' style={{ color: 'white', fontWeight: "700" }}>Bình Dương</Link>
                            <Image style={{ marginBottom: "25px", borderRadius: '4px' }} alt='#' width={262} height={190} src="https://res.cloudinary.com/deurdoich/image/upload/v1710819735/DATN/oqowoo8ntakaym6gypgv.jpg" />
                        </div>

                    </div>
                    <div>
                        <div style={{ position: 'relative' }}>
                            <Link href="#" className='absolute_label white_text' style={{ color: 'white', fontWeight: "700" }}>Đà Nẵng</Link>
                            <Image style={{ marginBottom: "25px", borderRadius: '4px', color: 'white' }} alt='#' width={262} height={190} src="https://res.cloudinary.com/deurdoich/image/upload/v1710819862/DATN/ju9ihjxjdciloekwizee.jpg" />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Link href="#" className='absolute_label' style={{ color: 'white', fontWeight: "700" }}>Đồng Nai</Link>
                            <Image style={{ marginBottom: "25px", borderRadius: '4px', color: 'white' }} alt='#' width={262} height={190} src="https://res.cloudinary.com/deurdoich/image/upload/v1710819790/DATN/tahbezwh58mwjeh7ojns.jpg" />
                        </div>
                    </div>
                </Flex>
            </Flex>
        </div >
    )
}

export default RealEstateByLocation
