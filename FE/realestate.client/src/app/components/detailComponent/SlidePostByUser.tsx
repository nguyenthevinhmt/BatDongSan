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
import { findAllPersonal, getRentPostByAuthor, getSalePostByAuthor, recommendPost } from '@/services/post/post.service';
import { useRouter } from 'next/navigation';
import Empty from 'antd/es/empty';
import nodata from "@/assets/image/nodata.jpg";
import Link from 'next/link';
import PostCard from '@/components/public/post';
import React from 'react';

interface IPost {
    id: number;
    title: string;
    province: string;
    district: string;
    area: number;
    price: number;
    postStartDate: Date;
    firstImageUrl: string;
    options: number;
};

interface SlidePostByUserProps {
    userId: number;
    postType: number;
}

const SlidePostByUser: React.FC<SlidePostByUserProps> = ({ userId, postType }) => {
    console.log("userId: ", userId);
    const router = useRouter();

    const [listPost, setListPost] = useState<IPost[]>([])
    useEffect(() => {
        const fetchData = async () => {
            if (postType === 1) {
                const response = await getSalePostByAuthor({ pageSize: -1, postType: postType }, userId);
                const posts: IPost[] = response?.data?.items?.map((post: any) => ({
                    id: post.id,
                    title: post.title,
                    province: post.province,
                    district: post.district,
                    area: post.area,
                    price: post.price,
                    postStartDate: new Date(post.postStartDate),
                    firstImageUrl: post.firstImageUrl,
                    options: post.options,
                }));
                setListPost(posts);
                console.log("posts: ", posts);
            } else {
                const response = await getRentPostByAuthor({ pageSize: -1, postType: postType }, userId);
                const posts: IPost[] = response?.data?.items?.map((post: any) => ({
                    id: post.id,
                    title: post.title,
                    province: post.province,
                    district: post.district,
                    area: post.area,
                    price: post.price,
                    postStartDate: new Date(post.postStartDate),
                    firstImageUrl: post.firstImageUrl,
                    options: post.options,
                }));
                setListPost(posts);
                console.log("posts: ", posts);
            }

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
                    <Flex justify="space-between" style={{ paddingLeft: 5 }}>
                        <Flex align='flex-end' style={{ width: '100%' }}>
                            <Button style={{ marginRight: "10px" }} onClick={onClickPrev} disabled={indexPost === 0} icon={<ArrowLeftOutlined />} />
                            <Button onClick={onClickNext} disabled={indexPost >= listPost?.length - 5} icon={<ArrowRightOutlined />} />
                        </Flex>
                    </Flex>
                    <Flex justify='flex-start' style={{ width: "100%", paddingLeft: 5, paddingTop: 5 }}>
                        {listPost && listPost?.length >= indexPost + 5 ?
                            listPost?.slice(indexPost, indexPost + 5)?.map((item, index) => {
                                return (
                                    <>
                                        <Link 
                                            href={`/home/post/detail/${item?.id}`}
                                            style={{marginRight: 5}}
                                        >
                                            <PostCard
                                                data={item}
                                                option={item.options}
                                                loading={false}
                                            />
                                        </Link>
                                    </>
                                )
                            }) :
                            listPost?.map((item, index) => {
                                return (
                                    <>
                                        <Link href={`/home/post/detail/${item?.id}`} style={{marginRight: 5}}>
                                            <PostCard
                                                data={item}
                                                option={item.options}
                                                loading={false}
                                            />
                                        </Link>
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