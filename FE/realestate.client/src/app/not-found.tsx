import { Button, Result } from 'antd';
import HeaderComponent from "@/components/shareLayout/header";
import Link from 'next/link'

const NotFoundPage =()=>{
    return(
        <>
            <HeaderComponent />
            <Result
                status="404"
                title="404"
                subTitle="Trang bạn truy cập không tồn tại."
                extra={<Link href="/"><Button type="primary">Trang chủ</Button></Link>}
            />
        </>
    )
}
export default NotFoundPage