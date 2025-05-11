import { useEffect } from 'react';
import { Modal, Form, Input, Select} from 'antd';

export default function EditVehicleModal({ isModalOpen, handleCancel, editingData, handleUpdate }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingData) {
            form.setFieldsValue({
                vehicle_plate: editingData.vehicle_plate,
                vehicle_type: editingData.vehicle_type,
                vehicle_ownership: editingData.vehicle_ownership,
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
            <Form.Item name="vehicle_plate" label="Plat Nomor" rules={[{ required: true, message: 'Masukkan nama!' }]}>
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
