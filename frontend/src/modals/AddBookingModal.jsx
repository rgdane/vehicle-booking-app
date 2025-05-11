import { Modal, Form, Input, Select, Upload, Button, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../lib/axios';
import { useEffect, useState } from 'react';

export default function AddBookingModal({ isModalOpen, setIsModalOpen, fetchBooking }) {
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

    const handleSubmit = async (values) => {
        console.log('Form Values:', values);
    
        const formData = new FormData();
        formData.append('user_id', 1);
        formData.append('vehicle_id', values.vehicle_id);
        formData.append('driver_id', values.driver_id);
        formData.append('booking_purpose', values.booking_purpose);
        formData.append('booking_start_date', values.booking_start_date.format('YYYY-MM-DD'));
        formData.append('booking_end_date', values.booking_end_date.format('YYYY-MM-DD'));
        formData.append('booking_status', 'Menunggu persetujuan');
    
        try {
            await api.post('/api/bookings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchBooking();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Gagal tambah pemesanan:', error.response.data);
        }
    };

    return (
        <Modal
            title="Tambah Pemesanan"
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            okText="Simpan"
            cancelText="Batal"
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
