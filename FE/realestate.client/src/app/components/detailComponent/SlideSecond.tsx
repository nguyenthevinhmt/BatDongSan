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
import { recommendPost } from '@/services/post/post.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/public/post';

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

const SlideSecond = () => {
    const router = useRouter();
    const [listPost, setListPost] = useState<IPost[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await recommendPost({ pageSize: 20, pageNumber: 1 });
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
            <Flex justify="space-between">
                <h1 style={{
                    fontSize: "18px",
                    color: "#2C2C2C"
                }}>Bất động sản dựa theo nhu cầu của bạn:</h1>
                <Flex>
                    <Button style={{ marginRight: "10px" }} onClick={onClickPrev} disabled={indexPost === 0} icon={<ArrowLeftOutlined />} />
                    <Button onClick={onClickNext} disabled={indexPost >= listPost.length - 3} icon={<ArrowRightOutlined />} />
                </Flex>
            </Flex>
            <Flex
                justify='space-between'
                style={{
                    overflow: 'auto',
                    width: "730px",
                    paddingTop: 20,
                    paddingBottom: 20,
                }}
            >
                {listPost && listPost.length >= indexPost + 3 && listPost.slice(indexPost, indexPost + 3).map((item, index) => {
                    return (
                        <Link href={`/home/post/detail/${item?.id}`}>
                            <PostCard
                                data={item}
                                option={item.options}
                                loading={false}
                            />
                        </Link>
                    )
                })}
            </Flex>
            <Divider style={{ margin: "35px 0" }} />
        </>
    )
}
export default SlideSecond

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