import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Layout, theme } from "antd"; // jangan lupa import Layout & Footer
import React, { useState } from "react";

const { Content, Footer } = Layout;

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);

    function AppContent() {
        const location = useLocation();
        const {
            token: { colorBgContainer },
        } = theme.useToken();

        const titles = {
            '/': 'Dashboard',
            '/booking': 'Daftar Pemesanan',
            '/approval': 'Daftar Persetujuan',
        };

        const currentTitle = titles[location.pathname] || 'Dashboard';

        return (
            <Layout>
                <Sidebar collapsed={collapsed} />
                <Layout>
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} title={currentTitle} />
                    <Content style={{ margin: '24px 16px', padding: 24, background: colorBgContainer }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Aplikasi Pemesanan Kendaraan ©{new Date().getFullYear()} Created by Dane
                    </Footer>
                </Layout>
            </Layout>
        );
    }

    return <AppContent />;
}
