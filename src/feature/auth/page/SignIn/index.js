import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    const history = useHistory();

    const onFinish = async (values) => {
        const result = await axios.post('http://localhost:7000/users/login', values);
        if (result.data.data.token) {
            localStorage.setItem('token', result.data.data.token);
            history.push('/board');
        }
    };

    return (
        // <Form.Item
        //     name='normal_login'
        //     className='login-form'
        //     initialValues={{
        //         remember: true,
        //     }}
        //     onFinish={onFinish}
        // >
        //     <Form.Item
        //         name='username'
        //         rules={[
        //             {
        //                 required: true,
        //                 message: 'Please input your Username!',
        //             },
        //         ]}
        //     >
        //         <Input
        //             prefix={<UserOutlined className='site-form-item-icon' />}
        //             placeholder='Your username'
        //         />
        //     </Form.Item>
        //     <Form.Item
        //         name='password'
        //         rules={[
        //             {
        //                 required: true,
        //                 message: 'Please input your Password!',
        //             },
        //         ]}
        //     >
        //         <Input
        //             prefix={<LockOutlined className='site-form-item-icon' />}
        //             type='password'
        //             placeholder='Password'
        //         />
        //     </Form.Item>

        //     <Form.Item>
        //         <Button type='primary' htmlType='submit' className='login-form-button'>
        //             Log in
        //         </Button>

        //         <Button
        //             type='primary'
        //             htmlType='submit'
        //             className='login-form-button facebook-login'
        //         >
        //             Facebook Login
        //         </Button>

        //         <Button type='primary' htmlType='submit' className='login-form-button google-login'>
        //             Google Login
        //         </Button>
        //         <a href=''>Or register!</a>
        //     </Form.Item>
        // </Form.Item>
        <Form name='normal_login' className='login-form' onFinish={onFinish}>
            <Form.Item
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    placeholder='Username'
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
                    Log in
                </Button>
                Or <a href=''>register now!</a>
            </Form.Item>
        </Form>
    );
};

export default SignIn;
