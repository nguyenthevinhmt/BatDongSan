'use client';
import ListPostPaginationComponent from '@/app/components/ListPostPaginationComponent';
import { getAllPostByIds } from '@/services/post/post.service';
import { getFavorites } from '@/shared/utils/SavePosts-localStorage';
import Flex from 'antd/es/flex';
import React, { useEffect, useState } from 'react';

const FavoritesPage = () => {
    const [listSavePost, setListSavePost] = useState<any>([]);

    const getData = async () => {
        const saveIds = getFavorites();
        const response = await getAllPostByIds(saveIds);
        console.log(response);
        setListSavePost(response.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Flex
            style={{
                minHeight: '600',
                width: '100%',
                marginBottom: 10,
            }}
            vertical
            align='center'
        >
            {/* Nội dung */}
            <div
                style={{
                    width: '70%',
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
            >
                {/* dannh sách tin */}
                <div style={{
                    width: '70%',
                    height: '100%',
                }}>
                    <ListPostPaginationComponent header={'Danh sách bài đăng yêu thích'} data={listSavePost} totalItem={listSavePost?.length} />
                </div>

                {/* Quảng cáo */}
                <div style={{
                    width: '30%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <img
                        width="250px"
                        height="600px"
                        style={{ margin: "20px 0", objectFit: "contain" }}
                        src="https://tpc.googlesyndication.com/simgad/13978607217291355544"
                        alt='#'
                    />
                </div>
            </div>
        </Flex>
    );
};

export default FavoritesPage;