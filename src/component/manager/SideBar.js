import React from 'react';
import {
    BookTwoTone,
    ShoppingTwoTone,
    TabletTwoTone,
    SettingTwoTone,
    UserOutlined,
    BookOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { SubMenu } = Menu;

const items = [
    {
        key: '/Manager/User',
        icon: <UserOutlined />,
        label: '管理用户',
    },
    {
        key: '/Manager/Journal',
        icon: <BookOutlined/> ,
        label: '管理游记'
    }
];

const SideBar = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(e.key);
    };

    return (
        <Menu onClick={handleClick} mode="vertical">
            {items.map((item) =>
                item.children ? (
                    <SubMenu key={item.key} icon={item.icon} title={item.label}>
                        {item.children.map((child) => (
                            <Menu.Item key={child.key} icon={child.icon}>
                                {child.label}
                            </Menu.Item>
                        ))}
                    </SubMenu>
                ) : (
                    <Menu.Item key={item.key} icon={item.icon}>
                        {item.label}
                    </Menu.Item>
                )
            )}
        </Menu>
    );
};

export default SideBar;