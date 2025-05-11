import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Booking from "../pages/Booking";
import Driver from "../pages/Driver";
import Vehicle from "../pages/Vehicle";
import FirstApproval from "../pages/FirstApproval";
import SecondApproval from "../pages/SecondApproval";

// Simulasi autentikasi
const isAuthenticated = () => !!localStorage.getItem("auth_token");

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" />,
        children: [
        { path: "", element: <Dashboard /> },
        { path: "booking", element: <Booking /> },
        { path: "first-approval", element: <FirstApproval /> },
        { path: "second-approval", element: <SecondApproval /> },
        { path: "driver", element: <Driver /> },
        { path: "vehicle", element: <Vehicle /> },
        ],
    },
]);
