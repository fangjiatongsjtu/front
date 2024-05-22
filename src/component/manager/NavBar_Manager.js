import React, {useState} from "react";
import {Avatar, Drawer, Tabs, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
const { Title, Paragraph, Text, Link } = Typography;

const onChange = (key) => {
    console.log(key);
};
const NavBar_Manager = () => {
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    const pathname = window.location.pathname;
    const [current, setCurrent] = useState(pathname);

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
    const showDrawer = () => {
        setOpen(true);
    };
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        showDrawer();
    };

    const isLogin = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const userinfo = isLogin ?localStorage.getItem("userinfo"):"";
    const user_avatar = isLogin?JSON.parse(userinfo).avatar:"";
    console.log(user_avatar)
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
                <Text strong={true} style={{color:"white",fontSize:16, fontWeight:"bolder"}}>
                    欢迎管理员
                </Text>
            </div>
        </div>
    </div>);
}

export default NavBar_Manager;