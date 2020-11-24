import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Typography } from "antd";
const { Title } = Typography;

const SignUp = () => {
    const history = useHistory();
    const onFinish = async (values) => {
        delete values.confirm;
        console.log(values);
        const res = await axios.post('https://dotantai-api-funretro.herokuapp.com/auth/signup', values);
        if (res.data.status === 'success') {
            history.push('/login');
        }
    };

    return (
<div className='container'>
        <div className='div-form'>
        <Title type="secondary">SIGNUP FORM</Title>
        <Form
            style={{margin: 'auto'}}
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

            </Form.Item>
        </Form>

</div>
</div>
    );
};

export default SignUp;
