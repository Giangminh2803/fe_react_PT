import React, { useState } from 'react';
import { Button, Divider, Form, Input, InputNumber, message, notification, Select } from 'antd';
import './register.scss';
import { useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';


const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { email, password, name, age, gender, address, confirmPass } = values;
        if(confirmPass !== password){
            message.error('Confirm Password is not the same Password!!!');
            return;
        }
        setIsSubmit(true);
        const user = await callRegister(email, password, name, age, gender, address);
        setIsSubmit(false);
        if (user?.data?._id) {
            message.success('Register successfully!');
            navigate('/login')
        } else {
            notification.error({
                message: "Error!!!",
                description:
                    user.message && user.message.length > 0 ? user.message[0] : user.message[20],
                duration: 5
            })
        }
        console.log(values)

    };
    return (
        <div className='register-page' style={{ padding: '50px' }}>
            <h2 style={{ textAlign: "center" }}>Register New User</h2>
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
                    label="Username"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
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
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        {

                            required: true,
                            message: 'Please input your confirm password!',
                            min: 6
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            max: 99,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your gender!',
                        },
                    ]}>
                    <Select >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                    </Select>

                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 16,

                    }}
                >
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Register
                    </Button>
                </Form.Item>
                <Divider>Or</Divider>
                <p style={{fontSize: "16px" }}>Already have an account?<a onClick={() => navigate('/login')}> Login now!</a> </p>
            </Form>
        </div>
    )
}

export default RegisterPage;