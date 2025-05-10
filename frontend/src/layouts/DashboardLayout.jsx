import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="flex">
        <nav className="w-1/5 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-lg font-bold mb-4">Vehicle Dashboard</h2>
            <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/approvals">Approvals</Link></li>
            <li><button onClick={() => {
                localStorage.removeItem("auth");
                window.location.href = "/login";
            }}>Logout</button></li>
            </ul>
        </nav>
        <main className="flex-1 p-6 bg-gray-100">
            <Outlet />
        </main>
        </div>
    );
}
