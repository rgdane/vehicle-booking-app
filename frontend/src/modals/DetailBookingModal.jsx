import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Button, Modal, Table } from "antd";

export default function DetailBookingModal({ isModalOpen, handleCancel, detailData }) {
    const [approvalData, setApprovalData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async (id) => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await api.get(`/api/bookings/${id}`);
                console.log(response.data);
                setApprovalData(response.data); // sesuaikan dengan struktur datanya
            } catch (error) {
                console.error('Gagal fetch data:', error);
            }
            setLoading(false);
        };

        fetchData(detailData);
    }, [detailData]);

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Penanggung Jawab',
            dataIndex: ['user','user_fullname'],
            key: 'user_fullname',
        },
        {
            title: 'Level Persetujuan',
            dataIndex: 'approval_level',
            key: 'approval_level',
            render: (level) => ({
                1: 'Direktur Cabang',
                2: 'Direktur Pusat',
            }[level] || 'Tidak Diketahui'),
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
            title: 'Tanggal',
            dataIndex: 'approved_at',
            key: 'approved_at',
        },
        {
            title: 'Catatan',
            dataIndex: 'approval_notes',
            key: 'approval_notes',
        }
    ];

    return (
        <Modal
            title="Daftar Persetujuan"
            open={isModalOpen}
            footer={[
                <Button key="close" onClick={handleCancel}>
                    Tutup
                </Button>
            ]}
            onCancel={handleCancel}
        >
            <Table
                columns={columns}
                dataSource={approvalData}
                loading={loading}
                rowKey="approval_id"
                pagination={{ pageSize: 2 }}
            />
        </Modal>
    );
}
