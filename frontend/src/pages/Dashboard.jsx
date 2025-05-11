import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Select } from 'antd';
import { getMonthName } from '../lib/getMonthName';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [yearsData, setYearsData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const fetchYears = async () => {
        try {
            const response = await api.get('/api/years');
            
            const yearsData = response.data;
                
            setYearsData(yearsData);
    
        } catch (error) {
            console.error('Gagal ambil data tahun:', error);
            setYearsData([]);
        }
    }
    
    const fetchVehicleUsage = async (year) => {
        try {
            const response = await api.get(`/api/vehicle-usage/${year}`) // Ganti sesuai endpoint kamu
            const formattedData = formatDataForChart(response.data);
            setData(formattedData);
        } catch (error) {
            console.error('Gagal ambil data grafik:', error);
        }
    }

    useEffect(() => {
        fetchYears(); // hanya sekali saat komponen pertama kali mount
    }, []);
    
    useEffect(() => {
        fetchVehicleUsage(selectedYear); // hanya dipanggil saat selectedYear berubah
    }, [selectedYear]);
    
    // Format data untuk menyesuaikan dengan format yang diperlukan oleh grafik
    const formatDataForChart = (usageData) => {
        const allMonths = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]
    
        return allMonths.map(monthNum => {
            const found = usageData.find(item => Number(item.month) === monthNum);
            return {
                month: getMonthName(monthNum),
                usage_count: found ? found.usage_count : 0
            };
        });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h1>Grafik Penggunaan Kendaraan</h1>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 500 }}>Tahun:</span>
                    <Select
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
                </div>
            </div>
            <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usage_count" fill="#1890ff" name="Total Penggunaan" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
}
