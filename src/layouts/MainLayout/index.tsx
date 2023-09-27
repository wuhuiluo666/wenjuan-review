import React from 'react'
import { Layout } from 'antd'
import styles from './index.module.scss'
import { Outlet } from 'react-router-dom'


const { Header, Content, Footer } = Layout

export const MainLayout = () => {
    return <Layout>
        <Header className={styles.header}>
            <div>Logo</div>
            <div>
                <div>username</div>
            </div>
        </Header>
        <Layout className={styles.main}>
            <Content>
                <Outlet />
            </Content>
        </Layout>
        <Footer className={styles.footer}>
            Footer
        </Footer>
    </Layout>
}