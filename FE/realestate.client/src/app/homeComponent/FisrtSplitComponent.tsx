import { Flex, List, Card, Image,Tag } from "antd";
import bieudo from "../../assets/image/bieudo.webp";
import home from "../../assets/image/home.webp";
import book from "../../assets/image/book.webp";
import pro from "../../assets/image/pro.webp";
import man from "../../assets/image/man.webp";
import phone from "../../assets/image/phone.webp";
import { SketchOutlined } from "@ant-design/icons";

const FisrtSplitComponent = () => {
    return (
        <>
            <Flex justify="space-between">
                <div style={{ background: "#fff", padding: "7px 15px 25px 15px", margin: "20px 0", borderRadius: "2px" }}>
                    <h2 style={{ marginBottom: "12px", fontSize: "18px" }}>Công cụ tiện ích</h2>
                    <Flex gap="middle" style={{position:"relative"}}>                        
                        <Image style={{borderRadius:"5px"}} src={bieudo.src} width={140} height={80} alt="Your Image" preview={false} />
                        <p style={{position:"absolute",margin:"15px 0 0 7px", fontSize:"15px", fontWeight:"600"}}>Biểu đồ giá</p>
                        <p style={{position:"absolute",margin:"-5px 0 0 110px",textAlign:"center",fontSize:"12px",borderRadius:"4px",border:"1px solid #fff", background:"#D0021B",height:"20px",width:"30px", color:"#fff"}} >Mới</p>
                        <Image style={{ borderRadius: "5px" }} src={home.src} width={140} height={80} alt="Your Image" preview={false} />
                        <p style={{position:"absolute",margin:"15px 0 0 165px", fontSize:"15px", fontWeight:"600"}}>Vay mua nhà</p>
                    </Flex>
                </div>
                <div style={{ background: "#fff", padding: "12px 15px 10px 15px", margin: "20px 0", borderRadius: "2px" }}>
                    <h2 style={{ marginBottom: "12px", fontSize: "18px" }}>Dịch vụ cho nhà  phát triển</h2>
                    <Flex gap="middle">
                        <Image style={{borderRadius:"5px"}} src={book.src} width={140} height={80} alt="Your Image" preview={false} />
                        <p style={{position:"absolute",margin:"15px 0 0 7px", fontSize:"15px", fontWeight:"600"}}>Kinh nghiệm</p>
                        <Image style={{borderRadius:"5px"}} src={pro.src} width={140} height={80} alt="Your Image" preview={false} />
                        <p style={{position:"absolute",margin:"15px 0 0 165px",color:"#fff", fontSize:"15px", fontWeight:"600"}}>Gói Pro</p>
                    </Flex>
                </div>
                <div style={{ background: "#fff", padding: "12px 15px 10px 15px", margin: "20px 0", borderRadius: "2px" }}>
                    <h2 style={{ marginBottom: "12px", fontSize: "18px" }}>Bla bla</h2>
                    <Flex gap="middle">
                        <Image style={{ borderRadius: "5px" }} src={man.src} width={140} height={80} alt="Your Image" preview={false} />
                        <p style={{position:"absolute",margin:"15px 0 0 7px",width:"100px", fontSize:"15px", fontWeight:"600"}}>Tài khoản doanh nghiệp</p>
                        <Image style={{ borderRadius: "5px" }} src={phone.src} width={140} height={80} alt="Your Image" preview={false} />
                        <p style={{position:"absolute",margin:"15px 0 0 165px",width:"100px", fontSize:"15px", fontWeight:"600"}}>Chuyên gia môi giới</p>
                    </Flex>
                </div>
            </Flex>
        </>

    )
}
export default FisrtSplitComponent