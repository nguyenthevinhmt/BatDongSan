import ListPost from '@/app/components/ListPost'
import { SmileOutlined } from '@ant-design/icons'
import { Flex, Result } from 'antd'
import React from 'react'

const ResultSearch = ({ post }: any) => {
    return (
        <>
            {true ? <div style={{ width: '1300px' }}>
                <ListPost />
            </div> :
                <>
                    <Result
                        icon={<SmileOutlined />}
                        title="Không tìm thấy kết quả nào phù hợp với từ khóa bạn tìm kiếm"
                    />
                </>}
        </>
    )
}

export default ResultSearch
