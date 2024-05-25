import React, {useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Form, Input, message, notification} from 'antd';
import "../css/loginform.css"


const LoginForm = ({onClose}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [form] = Form.useForm();
    const disabled = localStorage.getItem("userinfo")!==null && JSON.parse(localStorage.getItem("userinfo")).isLogin === 1
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = async (e) =>{
        const response = await fetch(`http://202.120.40.86:14642/rmp-resource-service/project/663f50f98562cc0015aaf2cf/resource/user/?user.username=`+username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).catch(
            function (ex){
                message.error("登录失败")
        }
        );
        if(response !== undefined)
        {
            const data = await response.json();
            console.log(data);
            if(response.ok){
                 const user_info = data.data[0]
                 if(user_info.authorization === "1") {
                     message.success("管理员登录");
                     user_info.isLogin = 1;
                     localStorage.setItem("userinfo",JSON.stringify(user_info));
                     setTimeout(function(){
                     window.location.href="/Manager"

                },500)
            }
            else if(user_info.isBan === 0 && user_info.username === username && user_info.password === password)
            {
                message.success(username+"登录成功")
                window.localStorage.setItem("username",username);
                window.localStorage.setItem("password",password);
                user_info.isLogin = 1;
                localStorage.setItem("userinfo",JSON.stringify(user_info));
                setTimeout(function(){
                    onClose();
                },500)
            }else {
                if(user_info.isBan === 1) message.error("登录失败:"+user_info.username+"被禁用");
                else {
                    message.error("登录失败:用户名或者密码不正确");
                }
            }
        }else{
            message.error("登录失败");
        }}


    }

    const handleLogOut = (e) => {
        let user_info = JSON.parse(localStorage.getItem("userinfo"));
        user_info.isLogin = 0;
        localStorage.setItem("userinfo",user_info);
        localStorage.removeItem("userinfo");
        message.success(user_info.username+" log out");
        form.resetFields();
        onClose();
        window.location.href="/"
    }
    return (
        <Form
            name="normal_login"
            form={form}
            className="login-form"
            initialValues={{
                remember: true
            }}
            disabled={disabled}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                        whitespace: true
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"
                                          />}
                    onChange={handleUsernameChange}
                    placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
                hasFeedback
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                {
                    disabled && <Button type="primary" htmlType="submit" className="login-form-button" disabled={!disabled} onClick={handleLogOut}>
                        Log Out
                    </Button>
                }
                {
                    !disabled &&
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
                    Log in
                </Button>
                }
            </Form.Item>
        </Form>
    );
};
export default LoginForm;