import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios'; // pastikan path ini sesuai
const { Header: AntHeader } = Layout;

export default function Header({ collapsed, setCollapsed, title }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/logout', {}, { withCredentials: true });
        } catch (err) {
            console.error('Logout error:', err);
        }
        localStorage.removeItem('auth');
        navigate('/login'); // ini yang benar
    };

    return (
        <AntHeader
            style={{
                padding: 0,
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 24,
                paddingLeft: 16
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</div>
                <Button type="primary" danger onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </AntHeader>
    );
}
