import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Booking from "../pages/Booking";
import Driver from "../pages/Driver";
import Vehicle from "../pages/Vehicle";
import FirstApproval from "../pages/FirstApproval";

// Simulasi autentikasi
// const isAuthenticated = () => !!localStorage.getItem("auth");

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        //element: isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" />,
        element: <DashboardLayout />,
        children: [
        { path: "", element: <Dashboard /> },
        { path: "booking", element: <Booking /> },
        { path: "first-approval", element: <FirstApproval /> },
        { path: "driver", element: <Driver /> },
        { path: "vehicle", element: <Vehicle /> },
        ],
    },
]);
