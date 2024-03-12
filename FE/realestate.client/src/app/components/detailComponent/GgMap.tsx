import {  List,Card,Flex,Divider} from 'antd';
import { CgSize } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { TbCurrencyDong } from "react-icons/tb";
import { TfiDirectionAlt } from "react-icons/tfi";
import GoogleMap from '@/components/GoogleAPI/mapComponents';

const GgMap = ()=>{
    const data = [
        {
            title: 'Diện tích',
        },
        {
            title: 'Mặt tiền',
        },
         {
            title: 'Mức giá',
        },
        {
            title: 'Hướng nhà',
        },
    ];
    const leftData = data.slice(0,2)
    const rightData = data.slice(2,4)
    const styleIcon = {
        fontSize:"15px",
        margin:"7px 0 0 15px",
        fontWeight:"500",

    }

    return(
        <>
            <h1 style={{
                fontSize: "18px",
                margin: "40px 0 10px 0",
                color: "#2C2C2C"
            }}>Đặc điểm bất động sản</h1>
            <Flex justify="space-between">
                <div style={{width:"45%"}}>
                    <Divider style={{margin:"0 0 10px 0"}}/>
                    <Flex>
                        <CgSize style={{ fontSize: "34px", fontWeight:"300" }} />
                        <p style={styleIcon}>
                            Diện tích<span style={{marginLeft:"100px", fontWeight:"400"}}>8.200 m²</span>
                        </p>
                    </Flex>
                    <Divider style={{margin:"10px 0"}}/>
                    <Flex>
                        <IoHomeOutline style={{fontSize:"34px"}}/>
                        <p style={styleIcon}>
                            Mặt tiền<span style={{marginLeft:"103px", fontWeight:"400"}}>885 m</span> 
                        </p>
                    </Flex>
                    <Divider style={{ margin: "10px 0" }} />
                </div>
                <div style={{width:"45%"}}>
                    <Divider style={{ margin:"0 0 10px 0" }} />
                    <Flex>
                        <TbCurrencyDong style={{fontSize:"34px"}}/>
                        <p style={styleIcon}>
                            Mức giá<span style={{marginLeft:"122px", fontWeight:"400"}}>2,3 tỷ</span>
                        </p>
                    </Flex>
                    <Divider style={{margin:"10px 0"}}/>
                    <Flex>
                        <TfiDirectionAlt style={{fontSize:"34px"}}/>
                        <p style={styleIcon}>
                            Hướng nhà<span style={{marginLeft:"100px", fontWeight:"400"}}>Đông</span>
                        </p>
                    </Flex>
                    <Divider style={{ margin: "10px 0" }} />
                </div>
            </Flex>

            <h1 style={{
                fontSize: "18px",
                margin: "40px 0 10px 0",
                color: "#2C2C2C"
            }}>Xem ví trị trên bản đồ</h1>
            <GoogleMap />
        </>
    )
}
export default GgMap