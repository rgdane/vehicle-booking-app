import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '../lib/axios';
import dayjs from 'dayjs';
//import getCSRF from '../lib/csrf';

export default function SecondApproval() {
    const [data, setData] = useState([]); // state untuk data booking
    const [loading, setLoading] = useState(false); // loading table
    const [searchText, setSearchText] = useState('');
    const { TextArea } = Input;
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [approvalNotes, setApprovalNotes] = useState('');
    const [selectedApproval, setSelectedApproval] = useState(null);
    
    const filteredData = data.filter((item) =>
        (item.user?.user_fullname || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.vehicle?.vehicle_plate || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.driver?.driver_name || '').toLowerCase().includes(searchText.toLowerCase())
    );

    const fetchApproval = async (level) => {
        setLoading(true);
        try {
        const response = await api.get(`/api/approvals/level/${level}`, {
            //withCredentials: true
        });
        setData(response.data); // Sesuaikan response sesuai API kamu
        } catch (error) {
        console.error('Gagal fetch approval:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const init = async () => {
          //await getCSRF(); // pastikan cookie auth diset dulu
            console.log(document.cookie)
            fetchApproval(2);
        };
        init();
    }, []);

    // Fungsi saat klik tombol "Tolak"
    const openRejectModal = (record) => {
        setSelectedApproval(record);
        setApprovalNotes('');
        setIsRejectModalOpen(true);
    };

    // Fungsi untuk menyetujui
    const handleApprove = async (record) => {
        const approvedAt = dayjs().format('YYYY-MM-DD');
        await api.put(`/api/approvals/${record.approval_id}`, {
            approval_status: 2,
            approved_at: approvedAt,
            user_id: 6
        });

        await api.put(`/api/bookings/${record.booking_id}`, {
            booking_status: 'Disetujui',
        });
        
        fetchApproval(); // Refresh data
    };

    // Fungsi untuk menolak
    const handleReject = async () => {
        const approvedAt = dayjs().format('YYYY-MM-DD');
        if (!approvalNotes) return;
        await api.put(`/api/approvals/${selectedApproval.approval_id}`, {
            approval_status: 1,
            approval_notes: approvalNotes,
            approved_at: approvedAt,
            user_id: 6
        });

        await api.put(`/api/bookings/${selectedApproval.booking_id}`, {
            booking_status: 'Ditolak',
        });
        setIsRejectModalOpen(false);
        fetchApproval(); // Refresh data
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Nama Pemohon',
            dataIndex: ['booking', 'user', 'user_fullname'],
            key: 'user_fullname',
        },
        {
            title: 'Plat Nomor',
            dataIndex: ['booking', 'vehicle', 'vehicle_plate'],
            key: 'vehicle_plate',
        },
        {
            title: 'Nama Pengemudi',
            dataIndex: ['booking', 'driver', 'driver_name'],
            key: 'driver_name',
        },
        {
            title: 'Keperluan',
            dataIndex: ['booking', 'booking_purpose'],
            key: 'booking_purpose',
        },
        {
            title: 'Tanggal Mulai',
            dataIndex: ['booking', 'booking_start_date'],
            key: 'booking_start_date',
        },
        {
            title: 'Tanggal Selesai',
            dataIndex: ['booking', 'booking_end_date'],
            key: 'booking_end_date',
        },
        {
            title: 'Status',
            dataIndex: 'approval_status',
            key: 'approval_status',
            render: (status) => ({
                0: 'Pending',
                1: 'Ditolak',
                2: 'Disetujui',
            }[status] || 'Tidak Diketahui'),
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <Button color="primary" variant="outlined" onClick={() => handleApprove(record)}>Setujui</Button>
                    <Button danger onClick={() => openRejectModal(record)}>Tolak</Button>
                </Space>
            ),
        },
    ];
    
    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h1>Daftar Permohonan Pemesanan Kendaraan</h1>
        </div>
        <Input.Search
            placeholder="Cari..."
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
        />
        <Table columns={columns} dataSource={filteredData} loading={loading} rowKey="approval_id" pagination={{ pageSize: 5 }} />

        <Modal
            title="Alasan Penolakan"
            open={isRejectModalOpen}
            onCancel={() => setIsRejectModalOpen(false)}
            onOk={handleReject}
            okText="Tolak"
            cancelText="Batal"
        >
            <TextArea
                rows={4}
                placeholder="Masukkan catatan penolakan"
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
            />
        </Modal>
        </div>
    );
}
