import React, { useState } from 'react';
import { Button, Divider, Form, Input, InputNumber, message, notification, Select } from 'antd';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { callLogin } from '../../services/api';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const dispatch = useDispatch()
    const onFinish = async (values) => {
        const { username, password} = values;
        setIsSubmit(true);
        const user = await callLogin(username, password);
        setIsSubmit(false);
        if (user?.data?.user?._id) {
           
            localStorage.setItem('access_token', user.data.access_token);
            dispatch(doLoginAction(user.data.user));
            message.success('Login successfully!');
            navigate('/')
        } else {
            notification.error({
                message: "Error!!!",
                description: "Login information is incorrect!!!"
                    
            })
        }
       

    };
    return (
        <div className='register-page' style={{ padding: '50px' }}>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <Divider />
            <Form
                layout="vertical"
                name="basic"
                labelCol={{
                    span: 12,
                }}

                style={{
                    maxWidth: 400,
                    margin: '0 auto'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}

                autoComplete="off"
            >

                <Form.Item
                    label="Email"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                            type: 'email'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                            min: 6

                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    
                    wrapperCol={{
                        offset: 0,
                        span: 16,
                        

                    }}
                    

                >
                    <Button type="primary" htmlType="submit" loading={isSubmit} style={{width: '150px'}}>
                        LOGIN
                    </Button>
                </Form.Item>
                <Divider>Or</Divider>
                <p style={{fontSize: "16px" }}>Don't have an account yet?<a onClick={() => navigate('/register')}> Register now!</a> </p>
            </Form>
        </div>
    )
}

export default LoginPage;