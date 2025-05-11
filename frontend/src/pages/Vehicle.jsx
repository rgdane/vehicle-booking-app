import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Popconfirm, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '../lib/axios';
import AddVehicleModal from '../modals/AddVehicleModal';
import EditVehicleModal from '../modals/EditVehicleModal';
//import getCSRF from '../lib/csrf';

export default function Vehicle() {
    const [data, setData] = useState([]); // state untuk data vehicle
    const [loading, setLoading] = useState(false); // loading table
    const [isModalOpen, setIsModalOpen] = useState(false); // modal tambah vehicle
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [searchText, setSearchText] = useState('');
    
    const filteredData = data.filter((item) =>
        (item.vehicle_plate || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.vehicle_type || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.vehicle_ownership || '').toLowerCase().includes(searchText.toLowerCase())
    );

    const fetchVehicle = async () => {
        setLoading(true);
        try {
        const response = await api.get('/api/vehicles', {
            //withCredentials: true
        });
        setData(response.data); // Sesuaikan response sesuai API kamu
        } catch (error) {
        console.error('Gagal fetch vehicle:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const init = async () => {
          //await getCSRF(); // pastikan cookie auth diset dulu
            console.log(document.cookie)
            fetchVehicle();
        };
        init();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/vehicles/${id}`);
            message.success('Vehicle berhasil dihapus');
          fetchVehicle(); // refresh tabel
        } catch (error) {
            console.error('Gagal hapus vehicle:', error);
            message.error('Gagal hapus vehicle');
        }
    };

    const openEditModal = (record) => {
        setEditingData(record);
        setIsEditModalOpen(true);
    };

    // ...fungsi handle update
    const handleUpdateVehicle = async (values) => {
        try {
        const formData = new FormData();
        formData.append('vehicle_plate', values.vehicle_plate);
        formData.append('vehicle_type', values.vehicle_type);
        formData.append('vehicle_ownership', values.vehicle_ownership);
    
        await api.post(`/api/vehicles/${editingData.vehicle_id}?_method=PUT`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
    
        message.success('Berhasil memperbarui vehicle!');
        setIsEditModalOpen(false);
        fetchVehicle(); // refresh tabel
        } catch (error) {
        console.error('Gagal update vehicle:', error);
        message.error('Gagal update vehicle!');
        }
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Plat Nomor',
            dataIndex: 'vehicle_plate',
            key: 'vehicle_plate',
        },
        {
            title: 'Jenis Kendaraan',
            dataIndex: 'vehicle_type',
            key: 'vehicle_type',
            render: (value) => (value === 'angkutan_orang' ? 'Angkutan Orang' : 'Angkutan Barang'),
        },
        {
            title: 'Kepemilikan',
            dataIndex: 'vehicle_ownership',
            key: 'vehicle_ownership',
            render: (value) => (value === 'perusahaan' ? 'Perusahaan' : 'Rental'),
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => openEditModal(record)}>Ubah</Button>
                    <Popconfirm
                        title="Yakin ingin hapus vehicle ini?"
                        description="Data yang dihapus tidak bisa dikembalikan."
                        okText="Ya, hapus"
                        cancelText="Batal"
                        onConfirm={() => handleDelete(record.vehicle_id)}
                    >
                    <Button danger>Hapus</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    
    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h1>Daftar Kendaraan</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Tambah Kendaraan
            </Button>
        </div>
        <Input.Search
            placeholder="Cari..."
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
        />
        <Table columns={columns} dataSource={filteredData} loading={loading} rowKey="vehicle_id" pagination={{ pageSize: 5 }} />

        <AddVehicleModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            fetchVehicle={fetchVehicle}
        />

        <EditVehicleModal
            isModalOpen={isEditModalOpen}
            handleCancel={() => setIsEditModalOpen(false)}
            editingData={editingData}
            handleUpdate={handleUpdateVehicle}
        />

        </div>
    );
}
