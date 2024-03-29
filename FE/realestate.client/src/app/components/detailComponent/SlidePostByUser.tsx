import Card from 'antd/lib/card';
import Flex from 'antd/es/flex';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';
import { useEffect, useState } from 'react'
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import { IoLocationOutline } from 'react-icons/io5';
import { findAllPersonal, recommendPost } from '@/services/post/post.service';
import { useRouter } from 'next/navigation';
import Empty from 'antd/es/empty';
import nodata from "@/assets/image/nodata.jpg";

interface IPost {
    id: number;
    title: string;
    province: string;
    district: string;
    area: number;
    price: number;
    postStartDate: Date;
    firstImageUrl: string;
};

interface SlidePostByUserProps {
    postType: number;
}

const SlidePostByUser: React.FC<SlidePostByUserProps> = ({ postType }) => {
    const router = useRouter();

    const [listPost, setListPost] = useState<IPost[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await findAllPersonal({ pageSize: -1, postType: postType });
            const posts: IPost[] = response?.data?.items?.map((post: any) => ({
                id: post.id,
                title: post.title,
                province: post.province,
                district: post.district,
                area: post.area,
                price: post.price,
                postStartDate: new Date(post.postStartDate),
                firstImageUrl: post.firstImageUrl
            }));
            setListPost(posts);
            console.log("posts: ", posts);
        };

        fetchData();
    }, [])

    const [indexPost, setIndexPost] = useState(0)
    const onClickNext = () => { //nút tiến
        setIndexPost(indexPost === listPost.length - 1 ? 0 : indexPost + 1)
        console.log("tiến");

    }
    const onClickPrev = () => {//nút lùi
        setIndexPost(indexPost === 0 ? listPost.length - 1 : indexPost - 1)
    }
    const handleChose = (index: number) => {
        router.push(`/home/post/detail/${index}`);
    }
    return (
        <>
            {listPost ?
                <>
                    <Flex justify="space-between">
                        <Flex align='flex-end' style={{width: '100%'}}>
                            <Button style={{ marginRight: "10px" }} onClick={onClickPrev} disabled={indexPost === 0} icon={<ArrowLeftOutlined />} />
                            <Button onClick={onClickNext} disabled={indexPost >= listPost?.length - 5} icon={<ArrowRightOutlined />} />
                        </Flex>
                    </Flex>
                    <Flex justify='space-between' style={{ overflow: 'auto', width: "100%" }}>
                        {listPost && listPost?.length >= indexPost + 5 && listPost?.slice(indexPost, indexPost + 5)?.map((item, index) => {
                            return (
                                <>
                                    <a onClick={() => handleChose(item.id)}>
                                        <Card
                                            hoverable
                                            style={{ height: 330, width: 236, marginTop: 10, marginBottom: 5, paddingRight: 10 }}
                                            bodyStyle={{ padding: 14, marginBottom: 0, height: 175 }}
                                            cover={
                                                <img height={150} style={{ objectFit: "cover", width: "100%" }} alt="example" src={item.firstImageUrl} />
                                            }
                                        >
                                            <h2 className="ellipsis-multiline"
                                                style={{
                                                    fontFamily: "Roboto,Arial",
                                                    height: "40px",
                                                    fontSize: "15px",
                                                    lineHeight: "20px",
                                                    fontWeight: "500",
                                                    color: "#2C2C2C",
                                                    marginBottom: "4px",
                                                    letterSpacing: "1px"
                                                }}>{item.title}</h2>
                                            <Flex style={{
                                                color: '#ff4d4f',
                                                fontWeight: 500,
                                            }}>
                                                <p style={{ marginRight: 20 }}>{item.area} m2</p>
                                                <p>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</p>
                                            </Flex>
                                            <p style={{ marginTop: "4px", fontSize: "16px", fontWeight: 400, lineHeight: "20px", height: "40px", }}> <IoLocationOutline /> {item.district}, {item.province}</p>
                                            <Flex justify="space-between" align="flex-end" style={{ marginBottom: 0 }} >
                                                <Tooltip placement="bottom" title={"27/02/2024"} color={'#423e3e'}>
                                                    <span style={{ color: "#999", fontSize: "13px", marginBottom: "4px" }}>{item.postStartDate.getDate()}/{item.postStartDate.getMonth() + 1}</span>
                                                </Tooltip>
                                                <Tooltip placement="bottom" color={'#423e3e'} title={"Bấm để lưu tin"}>
                                                    <Button danger icon={<HeartFilled />} />
                                                </Tooltip>
                                            </Flex>
                                        </Card>
                                    </a>
                                </>
                            )
                        })}
                    </Flex>
                    <Divider style={{ margin: "35px 0" }} />
                </>
                :
                <>
                    <Empty
                        image={<img src={nodata.src} alt="Mô tả ảnh" />}
                        imageStyle={{ height: 200 }}
                        description={
                            <span style={{ fontSize: "17px", fontWeight: "500", color: "#9F9B9F" }}>
                                Chưa có tin đăng nào ở thời điểm hiện tại
                            </span>
                        }
                    >
                    </Empty>
                </>
            }
        </>

    )
}
export default SlidePostByUser

const styleIcon = {
    fontSize: "15px",
    margin: "7px 0 0 15px",
    fontWeight: "500",
}
const styleButton = {
    borderRadius: "20px",
    backgroundColor: "#F2F2F2",
    marginRight: "20px",
    marginTop: "10px",
    border: "none"
}