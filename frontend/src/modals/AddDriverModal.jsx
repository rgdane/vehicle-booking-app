import { Modal, Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../lib/axios';

export default function AddDriverModal({ isModalOpen, setIsModalOpen, fetchDriver }) {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        console.log('Form Values:', values);
    
        const formData = new FormData();
        formData.append('driver_name', values.driver_name);
        formData.append('driver_phone', values.driver_phone);
    
        try {
            await api.post('/api/drivers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchDriver();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Gagal tambah pengemudi:', error.response.data);
        }
    };

    return (
        <Modal
            title="Tambah Pengemudi"
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            okText="Simpan"
            cancelText="Batal"
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="driver_name" label="Nama" rules={[{ required: true, message: 'Masukkan nama!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="driver_phone" label="Telepon" rules={[{ required: true, message: 'Masukkan telepon!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
