import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DriverManagementPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-10 bg-cover bg-white text-black"
    style={{ backgroundImage: "url('/images/backgroundPic.jpg')" }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">Quản lý tài xế</h1>
      <div className="flex gap-6">
        <button
          className="bg-primary hover:bg-cyan-600 px-6 py-3 rounded text-white"
          onClick={() => navigate('/driver-register')}
        >
          Đăng ký tài xế
        </button>
        <button
          className="bg-primary hover:bg-cyan-600 px-6 py-3 rounded text-white"
          onClick={() => navigate('/driver-list')}
        >
          Danh sách tài xế
        </button>
      </div>
    </div>
  );
}
