import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const history = useHistory();
    const onFinish = async (values) => {
        const result = await axios.post('http://localhost:7000/users/signup', values);
        history.push('/login');
    };

    return (
        <Form
            name='normal_login'
            className='login-form'
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    placeholder='Your username'
                />
            </Form.Item>

            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className='site-form-item-icon' />}
                    placeholder='Your email'
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                    Register
                </Button>

                <a href=''>Or login!</a>
            </Form.Item>
        </Form>
    );
};

export default SignUp;
