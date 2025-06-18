import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">NBD - Quản lý</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/drivers"
            className={`py-2 px-4 rounded hover:bg-gray-200 ${
              location.pathname === '/drivers' ? 'bg-gray-300 font-semibold' : ''
            }`}
          >
            Quản lý tài xế
          </Link>
          <Link
            to="/users"
            className={`py-2 px-4 rounded hover:bg-gray-200 ${
              location.pathname === '/users' ? 'bg-gray-300 font-semibold' : ''
            }`}
          >
            Quản lý người dùng
          </Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
