import { useState } from "react"
import { Layout, Button } from 'antd'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'
import { SHeader, SSider, STitle, SContent, SMenu } from "../utils/styles"


const Page = ({ component, filterComponent, title }: { 
    component: JSX.Element, 
    filterComponent: JSX.Element, 
    title: string, 
}): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout>
            <SSider trigger={null} collapsible collapsed={collapsed}>
                <SMenu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </SSider>
            <Layout>
                <SHeader>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    <STitle>{title}</STitle>
                    <>{filterComponent}</>
                </SHeader>
                <SContent>
                    {component}
                </SContent>
            </Layout>
        </Layout>
    )
}

export default Page
