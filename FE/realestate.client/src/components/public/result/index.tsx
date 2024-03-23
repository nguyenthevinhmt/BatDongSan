import ListPost from '@/app/components/ListPost'
import React from 'react'
import ListPostResult from './ListPostResult'

const ResultSearch = ({ post }: any) => {
    return (
        <>
            {post ? <div style={{ width: '1300px' }}>
                <ListPostResult data={post} />
            </div> :
                <ListPost />}
        </>
    )
}

export default ResultSearch
