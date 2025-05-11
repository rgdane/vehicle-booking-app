import { Modal, Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../lib/axios';

export default function AddVehicleModal({ isModalOpen, setIsModalOpen, fetchVehicle }) {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        console.log('Form Values:', values);
    
        const formData = new FormData();
        formData.append('vehicle_plate', values.vehicle_plate);
        formData.append('vehicle_type', values.vehicle_type);
        formData.append('vehicle_ownership', values.vehicle_ownership);
    
        try {
            await api.post('/api/vehicles', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchVehicle();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Gagal tambah kendaraan:', error.response.data);
        }
    };

    return (
        <Modal
            title="Tambah Kendaraan"
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            okText="Simpan"
            cancelText="Batal"
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="vehicle_plate" label="Plat Nomor" rules={[{ required: true, message: 'Masukkan plat nomor!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="vehicle_type" label="Jenis Kendaraan" rules={[{ required: true, message: 'pilih jenis kendaraan!' }]}>
                    <Select placeholder="Pilih Jenis Kendaraan">
                        <Select.Option value={'angkutan_orang'}>Angkutan Orang</Select.Option>
                        <Select.Option value={'angkutan_barang'}>Angkutan Barang</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="vehicle_ownership" label="Kepemilikan" rules={[{ required: true, message: 'pilih kepemilikan!' }]}>
                    <Select placeholder="Pilih Kepemilikan">
                        <Select.Option value={'perusahaan'}>Perusahaan</Select.Option>
                        <Select.Option value={'rental'}>Rental</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}
