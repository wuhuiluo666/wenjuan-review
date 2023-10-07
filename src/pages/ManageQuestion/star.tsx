import React from 'react'
import styles from './common.module.scss'
import { Spin, Typography } from 'antd'
import { InputSearch } from '../../components/inputSearch'
import { ListPagination } from '../../components/listPagination'
import { useFilterList } from '../../hooks/useFilterList'
import QuestionCard from '../../components/questionCard'

const { Title } = Typography


const Star = () => {
    const { total, list, loading } = useFilterList(true)
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>星标问卷</Title>
            </div>
            <div className={styles.right}>
                <InputSearch />
            </div>
        </div>
        <div>
            {
                loading && <Spin size={'large'} style={{ position: 'absolute', top: '50%', left: '50%' }} />
            }
            {
                (!loading && list.length > 0) && list.map((q: any) => (
                    <QuestionCard key={q._id} {...q} />
                ))
            }
        </div>
        {
            !loading && <div>
                <ListPagination total={total} />
            </div>
        }
    </>
}

export default Star