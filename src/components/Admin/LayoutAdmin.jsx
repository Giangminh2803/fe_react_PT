import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, message, theme } from 'antd';
import "./style.scss"
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import { FaToolbox } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5"
import { RiUserFollowFill } from "react-icons/ri";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { callLogout } from '../../services/api';
import { doLogoutAccountAction } from '../../redux/account/accountSlice';
const { Header, Sider, Content } = Layout;

const items = [
    {
        key: '1',
        icon: <RiDashboardHorizontalLine />,
        label: <Link to={'/admin'}>Dashboard</Link>,
    },
    {
        key: '2',
        icon: <FaUsers />,
        label: <Link to={'/admin/users'}>User</Link>,
    },
    {
        key: '3',
        icon: <FaFileInvoiceDollar />,
        label: <Link to={'/admin/bills'}>Bill</Link>,
    },
    {
        key: '4',
        icon: <FaFileContract />,
        label: <Link to={'/admin/contracts'}>Contract</Link>,
    },
    {
        key: '5',
        icon: <FaToolbox />,
        label: <Link to={'/admin/equipments'}>Equipments</Link>,
    },
    {
        key: '6',
        icon: <IoShieldCheckmarkSharp />,
        label: <Link to={'/admin/permissions'}>Permissions</Link>,
    },
    {
        key: '7',
        icon: <RiUserFollowFill />,
        label: <Link to={'/admin/roles'}>Roles</Link>,
    },
    {
        key: '8',
        icon: <BsFillDoorOpenFill />,
        label: <Link to={'/admin/rooms'}>Rooms</Link>,
    },
    {
        key: '9',
        icon: <GrServices />,
        label: <Link to={'/admin/services'}>Service</Link>,
    }
];

const LayoutAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user.user)
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const logoutAccount = async () => {
        const logout = await callLogout();
        if (logout && logout.data) {
            dispatch(doLogoutAccountAction());
            navigate('/login');
            message.success('Log Out success!')
        }



    }

    const menu = (
        <Menu>
            <Menu.Item key={'/account'}>
                <a >
                    Config Account
                </a>
            </Menu.Item>

            <Menu.Item key={'/logout'}
            danger><a href="#" onClick={() => logoutAccount()}>
                Log Out
            </a></Menu.Item>
        </Menu>
    );
    return (
        <div>

            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
                    <div className="demo-logo-vertical" />
                    <div className='title-admin'>
                        ADMIN
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header className='header-admin'
                        style={{
                            padding: 0,
                            background: 'white',

                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <> <Dropdown overlay={menu} className='admin-account'>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Welcome {user.name} !
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown></>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "100vh",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Content
                    </Content>
                </Layout>

            </Layout></div>

    );
};


export default LayoutAdmin;