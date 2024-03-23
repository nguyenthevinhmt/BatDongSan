import React, { useEffect, useState } from 'react'
import PostHorizon from './post'
import { GetListPostNewest } from '@/services/post/post.service';
import { HTTP_STATUS_CODE } from '@/shared/consts/http';

const ListPostHorizon = ({ isShowHeader }: any) => {

    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await GetListPostNewest()
            if (response?.code === HTTP_STATUS_CODE.OK) {
                await setData(response?.data?.items);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div style={{ margin: '50px 0px' }}>
            {isShowHeader && <h2 style={{ fontSize: '24px', marginBottom: '30px', fontWeight: '500' }}>Tin tức nổi bật</h2>}
            {
                data?.map((item: any) => {
                    return <PostHorizon option={item?.options} data={item} key={item?.id} />
                })
            }
        </div>
    )
}

export default ListPostHorizon
