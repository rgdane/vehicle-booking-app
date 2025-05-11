import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, DatePicker} from 'antd';
import api from '../lib/axios';
import dayjs from 'dayjs';

export default function EditBookingModal({ isModalOpen, handleCancel, editingData, handleUpdate }) {
    const [form] = Form.useForm();
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const driverResponse = await api.get('/api/drivers');
                setDrivers(driverResponse.data);
            } catch (error) {
                console.error('Gagal fetch data:', error);
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const vehicleResponse = await api.get('/api/vehicles');
                setVehicles(vehicleResponse.data);
            } catch (error) {
                console.error('Gagal fetch data:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        if (editingData) {
            form.setFieldsValue({
                vehicle_id: editingData.vehicle_id,
                driver_id: editingData.driver_id,
                booking_purpose: editingData.booking_purpose,
                booking_start_date: editingData.booking_start_date ? dayjs(editingData.booking_start_date) : '',
                booking_end_date: editingData.booking_end_date ? dayjs(editingData.booking_end_date) : '',
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
        title="Ubah Data Pemesanan"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
    >
        <Form form={form} layout="vertical">
            <Form.Item name="vehicle_id" label="Kendaraan" rules={[{ required: true }]}>
                <Select placeholder="Pilih Kendaraan">
                {vehicles.map((vehicle) => (
                    <Select.Option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                    {vehicle.vehicle_plate}
                    </Select.Option>
                ))}
                </Select>
            </Form.Item>
            <Form.Item name="driver_id" label="Pengemudi" rules={[{ required: true }]}>
                <Select placeholder="Pilih Pengemudi">
                {drivers.map((driver) => (
                    <Select.Option key={driver.driver_id} value={driver.driver_id}>
                    {driver.driver_name}
                    </Select.Option>
                ))}
                </Select>
            </Form.Item>
            <Form.Item name="booking_purpose" label="Keperluan" rules={[{ required: true, message: 'Masukkan keperluan!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="booking_start_date" label="Tanggal Mulai" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item name="booking_end_date" label="Tanggal Selesai" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
        </Form>
    </Modal>
    );
}
