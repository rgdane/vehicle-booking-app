import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Popconfirm, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '../lib/axios';
import AddDriverModal from '../modals/AddDriverModal';
import EditDriverModal from '../modals/EditDriverModal';
//import getCSRF from '../lib/csrf';

export default function Driver() {
    const [data, setData] = useState([]); // state untuk data driver
    const [loading, setLoading] = useState(false); // loading table
    const [isModalOpen, setIsModalOpen] = useState(false); // modal tambah driver
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [searchText, setSearchText] = useState('');
    
    const filteredData = data.filter((item) =>
        (item.driver_name || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.driver_phone || '').toLowerCase().includes(searchText.toLowerCase())
    );

    const fetchDriver = async () => {
        setLoading(true);
        try {
        const response = await api.get('/api/drivers', {
            //withCredentials: true
        });
        setData(response.data); // Sesuaikan response sesuai API kamu
        } catch (error) {
        console.error('Gagal fetch driver:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const init = async () => {
            fetchDriver();
        };
        init();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/drivers/${id}`);
            message.success('Driver berhasil dihapus');
          fetchDriver(); // refresh tabel
        } catch (error) {
            console.error('Gagal hapus driver:', error);
            message.error('Gagal hapus driver');
        }
    };

    const openEditModal = (record) => {
        setEditingData(record);
        setIsEditModalOpen(true);
    };

    // ...fungsi handle update
    const handleUpdateDriver = async (values) => {
        try {
        const formData = new FormData();
        formData.append('driver_name', values.driver_name);
        formData.append('driver_phone', values.driver_phone);
    
        await api.post(`/api/drivers/${editingData.driver_id}?_method=PUT`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
    
        message.success('Berhasil memperbarui driver!');
        setIsEditModalOpen(false);
        fetchDriver(); // refresh tabel
        } catch (error) {
        console.error('Gagal update driver:', error);
        message.error('Gagal update driver!');
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
            title: 'Nama',
            dataIndex: 'driver_name',
            key: 'driver_name',
        },
        {
            title: 'Telepon',
            dataIndex: 'driver_phone',
            key: 'driver_phone',
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => openEditModal(record)}>Ubah</Button>
                    <Popconfirm
                        title="Yakin ingin hapus driver ini?"
                        description="Data yang dihapus tidak bisa dikembalikan."
                        okText="Ya, hapus"
                        cancelText="Batal"
                        onConfirm={() => handleDelete(record.driver_id)}
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
            <h1>Daftar Pengemudi</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Tambah Pengemudi
            </Button>
        </div>
        <Input.Search
            placeholder="Cari..."
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
        />
        <Table columns={columns} dataSource={filteredData} loading={loading} rowKey="driver_id" pagination={{ pageSize: 5 }} />

        <AddDriverModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            fetchDriver={fetchDriver}
        />

        <EditDriverModal
            isModalOpen={isEditModalOpen}
            handleCancel={() => setIsEditModalOpen(false)}
            editingData={editingData}
            handleUpdate={handleUpdateDriver}
        />

        </div>
    );
}
