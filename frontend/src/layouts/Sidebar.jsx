import React from 'react';
import {
  AuditOutlined,
  BarChartOutlined,
  CarOutlined,
  FileDoneOutlined,
  HistoryOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const role = localStorage.getItem('user_role'); // Misalnya: 'admin', 'direktur_cabang', atau 'direktur_pusat'

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <div
        style={{
          height: 32,
          margin: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          borderRadius: 8,
        }}
      >
        APK
      </div>

      <Menu theme="light" mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item key="/" icon={<BarChartOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>

        <Menu.Item key="/booking" icon={<FileDoneOutlined />}>
          <Link to="/booking">Daftar Pemesanan</Link>
        </Menu.Item>

        {role === 'direktur_cabang' && (
          <Menu.Item key="/first-approval" icon={<AuditOutlined />}>
            <Link to="/first-approval">Daftar Permohonan</Link>
          </Menu.Item>
        )}

        {role === 'direktur_pusat' && (
          <Menu.Item key="/second-approval" icon={<AuditOutlined />}>
            <Link to="/second-approval">Daftar Permohonan</Link>
          </Menu.Item>
        )}

        {(role === 'admin' || role === 'direktur_pusat' || role === 'direktur_cabang') && (
          <>
            <Menu.Item key="/driver" icon={<UserOutlined />}>
              <Link to="/driver">Daftar Pengemudi</Link>
            </Menu.Item>
            <Menu.Item key="/vehicle" icon={<CarOutlined />}>
              <Link to="/vehicle">Daftar Kendaraan</Link>
            </Menu.Item>
          </>
        )}
      </Menu>

    </Sider>
  );
}
