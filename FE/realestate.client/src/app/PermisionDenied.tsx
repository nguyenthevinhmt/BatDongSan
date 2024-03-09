import { Button, Result } from 'antd';
import HeaderComponent from "@/components/shareLayout/header";
import Link from "next/link";

const PermissionDenied = () => {
    return (
        <>
            <HeaderComponent />
            <Result
                status="403"
                title="403"
                subTitle="Bạn không có quyền truy cập."
               extra={<Link href="/"><Button type="primary">Trang chủ</Button></Link>}
            />
        </>
    )

};

export default PermissionDenied;