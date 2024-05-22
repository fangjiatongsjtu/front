import React, { useState } from "react";
import "../css/navbar.css"
import SearchBar from "./SearchBar";
import {Avatar, Image} from "antd";
import { UserOutlined } from '@ant-design/icons';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Drawer} from "antd";
import { Menu } from 'antd';
import LoginForm from "./LoginForm";
import { Tabs } from 'antd';
import RegisterForm from "./RegisterForm";
const onChange = (key) => {
    console.log(key);
};

const items = [
    {
        label: (

            <a href="/home" target="_self" rel="noopener noreferrer">
                游记首页
            </a>
        ),
        key: "home",
        icon: <MailOutlined />,
    },
    {
        label: (
            <a href="/journal" target="_blank" rel="noopener noreferrer">
                游记库
            </a>
        ),
        key: "journal",
        icon: <AppstoreOutlined />,
    },
    {
        label: (
            <a href="/journal/create" target="_blank" rel="noopener noreferrer">
                发表游记
            </a>
        ),
        key: 3,
        icon: <SettingOutlined />,
    },
    {
        key: 4,
        label: (
            <a href="/journal/create" target="_blank" rel="noopener noreferrer">
                创作者平台
            </a>
        ),
    },
];
const NavBar = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?localStorage.getItem("userinfo"):"";
    const user_avatar = isLogin?JSON.parse(userinfo).avatar:"";
    console.log(user_avatar)


    const tabs = [
        {
            key: '1',
            label: 'login',
            children: <LoginForm onClose={onClose} />,
        },
        {
            key: '2',
            label: 'register',
            children: <RegisterForm onClose={onClose}/>,
        },
    ];

    const pathname = window.location.pathname;
    const [current, setCurrent] = useState(pathname);
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        showDrawer();
    };
    return(
        <div className="q_header_sub">
        <div className="q_header_sub_inner">
            <div className="q_header_sub_menu_r">
                {
                   !isLogin && (<Avatar icon={<UserOutlined/>} style={{marginLeft: 0}} onClick={onClick}/>)}
                {
                   isLogin &&  (<Avatar src={user_avatar} style={{marginLeft: 0}} onClick={onClick}/>)
                }

                <Drawer title="登录/注册" onClose={onClose} open={open}>
                    <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />;
                </Drawer>
            </div>
            <div className="general_search">
                <SearchBar/>
            </div>
            <nav>
            <ul className="q_header_sub_menu_l">
                <li data-headerclk="hd_main_navigation_home" className="home" style={current === '/home'?{backgroundColor: '#0d9199', color:'#fff'}:{}}>
                    <a hidefocus="on" href="/home" target="_self">游记首页</a>
                </li>
                <li data-headerclk="hd_main_navigation_travelbook" className="travelbook" style={current === '/journal'|| current === '/journal_detail'?{backgroundColor: '#0d9199', color:'#fff'}:{}}>
                    <a hidefocus="on" href="/journal" rel="nofollow" target="_blank">游记库</a>
                </li>
                <li data-headerclk="hd_main_navigation_top_right_notescreate" className="notes">
                    <a hidefocus="on" className="link" target="_blank" href="/journal/create" rel="nofollow" style={current === '/journal/create'?{backgroundColor: '#0d9199', color:'#fff'}:{}}>
                        <b className="icon_create"></b>发表游记
                    </a>
                </li>
                <li data-headerclk="hd_main_navigation_creator" className="creator">
                    <a hidefocus="on" target="_blank" href="/yourjournal" style={current === '/yourjournal'?{backgroundColor: '#0d9199', color:'#fff'}:{}}>创作者平台</a>
                </li>
            </ul>
            </nav>
        </div>
    </div>
    );
}

export default NavBar;