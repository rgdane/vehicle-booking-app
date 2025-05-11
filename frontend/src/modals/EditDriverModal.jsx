import { useEffect } from 'react';
import { Modal, Form, Input, Select} from 'antd';

export default function EditDriverModal({ isModalOpen, handleCancel, editingData, handleUpdate }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingData) {
            form.setFieldsValue({
                driver_name: editingData.driver_name,
                driver_phone: editingData.driver_phone,
            });
        }
    }, [editingData, form]);

    const handleSubmit = async () => {
        try {
        const values = await form.validateFields();
        handleUpdate(values); // kirim ke parent
        } catch (error) {
        console.error('Gagal submit:', error);
        }
    };

    return (
    <Modal
        title="Ubah Data Pengemudi"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
    >
        <Form form={form} layout="vertical">
            <Form.Item label="Nama" name="driver_name" rules={[{ required: true, message: 'Masukkan nama!' }]}>
            <Input />
            </Form.Item>
            <Form.Item label="Telepon" name="driver_phone" rules={[{ required: true, message: 'Masukkan telepon!' }]}>
            <Input />
            </Form.Item>
        </Form>
        </Modal>
    );
}
