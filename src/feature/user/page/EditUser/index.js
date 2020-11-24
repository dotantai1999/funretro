import React, {useState, useEffect} from 'react';
import { Card, Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const {Title } = Typography;
const EditUser = () => {

    const [fields, setFields] = useState([
        { name: 'username', value: ''},
        { name: 'email', value: ''},
        { name: 'fullname', value: ''},
        { name: 'phone', value: ''},
    ]);

    const history = useHistory();
    useEffect(() => {
        const fetchUser = async () => {
            const userId = JSON.parse(localStorage.getItem('userInfo')).userId;
            const res = await axios.get(`https://dotantai-api-funretro.herokuapp.com/users/${userId}`);
            if (res.data.status === 'success') {
                setFields([
                    { name: 'username', value: res.data.data.userInfo.username },
                    { name: 'email', value: res.data.data.userInfo.email },
                    { name: 'fullname', value: res.data.data.userInfo.fullname },
                    { name: 'phone', value: res.data.data.userInfo.phone },
                ]);
            }
        };

        fetchUser();
    }, []);

    const onFinish = async (values) => {
        const userId = JSON.parse(localStorage.getItem('userInfo')).userId;
        const res = await axios.patch(`https://dotantai-api-funretro.herokuapp.com/users/${userId}`, values);
        if (res.data.status === 'success') {
            setFields([
                { name: 'username', value: res.data.data.userInfo.username },
                { name: 'email', value: res.data.data.userInfo.email },
                { name: 'fullname', value: res.data.data.userInfo.fullname },
                { name: 'phone', value: res.data.data.userInfo.phone },
            ]);
            history.push('/board');
           
        }
    };

    return (
            
                <div style={{ height: '90vh', display: 'flex' }}>
                    <Card hoverable style={{ width: 600, margin: 'auto' }}>
                        <Title style={{ textAlign: 'center' }}>User Information</Title>
                        <Form
                            name='basic'
                            onFinish={onFinish}
                            fields={fields}
                            style={{
                                marginTop: 10,
                            }}
                        >
                            <Form.Item
                                label='Username'
                                name='username'
                                rules={[{ message: 'Please input your username!' }]}
                            >
                                <Input disabled={true} />
                            </Form.Item>

                            <Form.Item
                                label='Full Name'
                                name='fullname'
                                rules={[{ message: 'Please input your fullname!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name='email'
                                label='E-mail'
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='Phone'
                                name='phone'
                                rules={[{ message: 'Please input your phone!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>   
    )
}

export default EditUser;