import React from 'react';
import {
  AuditOutlined,
  BarChartOutlined,
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
        <Menu.Item key="/approval" icon={<AuditOutlined />}>
          <Link to="/approval">Daftar Persetujuan</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
