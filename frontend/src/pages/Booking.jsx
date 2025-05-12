import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Popconfirm, Input, Select } from 'antd';
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../lib/axios';
import AddBookingModal from '../modals/AddBookingModal';
import EditBookingModal from '../modals/EditBookingModal';
import DetailBookingModal from '../modals/DetailBookingModal';

export default function Booking() {
    const [data, setData] = useState([]); // state untuk data booking
    const [loading, setLoading] = useState(false); // loading table
    const [isModalOpen, setIsModalOpen] = useState(false); // modal tambah booking
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // modal tambah booking
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [detailData, setDetailData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [yearsData, setYearsData] = useState([]);
    const [monthsData, setMonthsData] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState([]);
    
    const filteredData = data.filter((item) =>
        (item.user?.user_fullname || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.vehicle?.vehicle_plate || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.driver?.driver_name || '').toLowerCase().includes(searchText.toLowerCase())
    );

    const fetchYears = async () => {
        try {
            const response = await api.get('/api/booking-years');
            
            const yearsData = response.data;
                console.log(yearsData);
                
            setYearsData(yearsData);
    
        } catch (error) {
            console.error('Gagal ambil data tahun:', error);
            setYearsData([]);
        }
    }

    const fetchBooking = async (year = selectedYear, month = selectedMonth) => {
        setLoading(true);
        try {
            const response = await api.get('/api/bookings', {
                params: {
                    year: year,
                    month: month,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error('Gagal fetch booking:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBooking(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        const init = async () => {
            fetchYears();
        };
        init();
    }, []);

    useEffect(() => {
        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        setMonthsData(months);
    }, []);
    

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/bookings/${id}`);
            message.success('Booking berhasil dihapus');
          fetchBooking(); // refresh tabel
        } catch (error) {
            console.error('Gagal hapus booking:', error);
            message.error('Gagal hapus booking');
        }
    };

    const openDetailModal = (id) => {
        setDetailData(id);
        setIsDetailModalOpen(true);
    };

    const openEditModal = (record) => {
        setEditingData(record);
        setIsEditModalOpen(true);
    };

    // ...fungsi handle update
    const handleUpdateBooking = async (values) => {
        try {
        const formData = new FormData();
        formData.append('user_id', 1);
        formData.append('vehicle_id', values.vehicle_id);
        formData.append('driver_id', values.driver_id);
        formData.append('booking_purpose', values.booking_purpose);
        formData.append('booking_start_date', values.booking_start_date.format('YYYY-MM-DD'));
        formData.append('booking_end_date', values.booking_end_date.format('YYYY-MM-DD'));
    
        await api.post(`/api/bookings/${editingData.booking_id}?_method=PUT`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
    
        message.success('Berhasil memperbarui booking!');
        setIsEditModalOpen(false);
        fetchBooking(); // refresh tabel
        } catch (error) {
        console.error('Gagal update booking:', error);
        message.error('Gagal update booking!');
        }
    };

    const handleExport = async (year, month) => {
        try {
            const response = await api.get('/api/export', {
                params: {
                    year: year ?? undefined,
                    month: month ?? undefined,
                },
                responseType: 'blob',
            });
        
            const today = new Date();
            const pad = (n) => n.toString().padStart(2, '0');
            const formattedDate = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

            // Bisa tambahkan nomor unik (misal waktu detik) biar beda tiap klik
            const unique = Date.now().toString().slice(-4); // ambil 4 digit terakhir waktu sekarang

            const filename = `booking_${formattedDate}_${unique}.xlsx`;

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            } catch (error) {
            console.error('Gagal export:', error);
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
            title: 'Nama Pemohon',
            dataIndex: ['user','user_fullname'],
            key: 'user_fullname',
        },
        {
            title: 'Plat Nomor',
            dataIndex: ['vehicle','vehicle_plate'],
            key: 'vehicle_plate',
        },
        {
            title: 'Nama Pengemudi',
            dataIndex: ['driver','driver_name'],
            key: 'driver_name',
        },
        {
            title: 'Keperluan',
            dataIndex: 'booking_purpose',
            key: 'booking_purpose',
        },
        {
            title: 'Tanggal Mulai',
            dataIndex: 'booking_start_date',
            key: 'booking_start_date',
        },
        {
            title: 'Tanggal Selesai',
            dataIndex: 'booking_end_date',
            key: 'booking_end_date',
        },
        {
            title: 'Status',
            dataIndex: 'booking_status',
            key: 'booking_status',
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <Button color='cyan' variant='outlined' onClick={() => openDetailModal(record.booking_id)}>Detail</Button>
                    <Button type="primary" onClick={() => openEditModal(record)}>Ubah</Button>
                    <Popconfirm
                        title="Yakin ingin hapus booking ini?"
                        description="Data yang dihapus tidak bisa dikembalikan."
                        okText="Ya, hapus"
                        cancelText="Batal"
                        onConfirm={() => handleDelete(record.booking_id)}
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
            <h1>Daftar Pemesanan Kendaraan</h1>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 500 }}>Tahun:</span>
                <Select
                    allowClear
                    placeholder="Pilih Tahun"
                    value={selectedYear}
                    onChange={(value) => setSelectedYear(value)}
                    style={{ width: 120 }}
                >
                    {yearsData.map((year) => (
                        <Select.Option key={year} value={year}>
                            {year}
                        </Select.Option>
                    ))}
                </Select>
                <span style={{ fontWeight: 500 }}>Bulan:</span>
                <Select
                    allowClear
                    placeholder="Pilih Bulan"
                    value={selectedMonth}
                    onChange={(value) => setSelectedMonth(value)}
                    style={{ width: 120 }}
                >
                    {monthsData.map((month) => (
                        <Select.Option key={month} value={month}>
                            {month}
                        </Select.Option>
                    ))}
                </Select>
                <Button color="cyan" variant="solid" icon={<FileExcelOutlined />} onClick={() => handleExport(selectedYear, selectedMonth)}>
                    Export ke Excel
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                Tambah Pemesanan
                </Button>
            </div>
        </div>
        <Input.Search
            placeholder="Cari..."
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
        />
        <Table columns={columns} dataSource={filteredData} loading={loading} rowKey="booking_id" pagination={{ pageSize: 5 }} />

        <DetailBookingModal
            isModalOpen={isDetailModalOpen}
            handleCancel={() => setIsDetailModalOpen(false)}
            detailData={detailData}
        />

        <AddBookingModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            fetchBooking={fetchBooking}
        />

        <EditBookingModal
            isModalOpen={isEditModalOpen}
            handleCancel={() => setIsEditModalOpen(false)}
            editingData={editingData}
            handleUpdate={handleUpdateBooking}
        />

        </div>
    );
}
