import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHomePage() {
  const navigate = useNavigate();

  return (
    <div
  className="min-h-screen bg-cover bg-center text-black flex items-center justify-center"
  style={{ backgroundImage: "url('/images/backgroundPic.jpg')" }}
>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Trang quản lý</h1>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => navigate('/drivers')}
            className="bg-primary hover:bg-cyan-600 py-4 px-6 rounded-xl text-lg shadow text-white min-w-[200px]"
          >
            Quản lý tài xế
          </button>

          <button
            onClick={() => navigate('/users')}
            className="bg-primary hover:bg-cyan-600 py-4 px-6 rounded-xl text-lg shadow text-white min-w-[200px]"
          >
            Quản lý người dùng
          </button>
        </div>
      </div>
    </div>
  );
}
