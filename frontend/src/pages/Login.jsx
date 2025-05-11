import React from 'react';
import { Button, Checkbox, Form, Input, message, Card, Typography } from 'antd';
import api from '../lib/axios';
import getCSRF from '../lib/csrf';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        try {
            await getCSRF();
            await api.post('/login', {
                user_email: values.user_email,
                user_password: values.user_password,
            }, {
                withCredentials: true
            });
            messageApi.success('Login berhasil');
            localStorage.setItem('auth', true);
            navigate('/');
        } catch (err) {
            messageApi.error(err?.response?.data?.message || 'Login gagal');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Form Error:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: '#f5f5f5',
                }}
            >
                <Card
                    style={{ width: 400, padding: '1rem' }}
                    bordered={false}
                    hoverable
                >
                    <Title level={3} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Aplikasi Pemesanan Kendaraan
                    </Title>
                    <Form
                        name="loginForm"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="user_email"
                            rules={[
                                { required: true, message: 'Masukkan email Anda' },
                                { type: 'email', message: 'Email tidak valid' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="user_password"
                            rules={[
                                { required: true, message: 'Masukkan password Anda' },
                                { min: 6, message: 'Password minimal 6 karakter' }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Ingat saya</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default Login;
