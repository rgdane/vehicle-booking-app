import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import api from '../lib/axios';
import getCSRF from '../lib/csrf';
import { useNavigate } from 'react-router-dom';

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
            <Form
                name="loginForm"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 500, margin: '0 auto', marginTop: '5rem' }}
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

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6 }}>
                    <Checkbox>Ingat saya</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;
