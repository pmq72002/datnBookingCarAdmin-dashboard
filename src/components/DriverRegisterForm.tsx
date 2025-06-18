import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const defaultIpv4 = require('../ipv4/ipv4Address')

export default function DriverRegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    vehicleType: '',
    licensePlate: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, password, vehicleType, licensePlate } = form;

    if (!name || !phone || !password || !vehicleType || !licensePlate || !image) {
      return alert('Vui lòng nhập đầy đủ thông tin');
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('vehicleType', vehicleType);
    formData.append('licensePlate', licensePlate);
    formData.append('image', image);

    try {
      const res = await axios.post(`http://localhost:3000/api/driver/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Đăng ký thành công');
      navigate('/drivers');
    } catch (err: any) {
  const message = err.response?.data?.error || 'Đăng ký thất bại';
  alert(message);
}
  };

  return (
    <div className="p-6 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-black text-center">Đăng ký tài xế</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Form bên trái */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-1">
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            className="border p-2 rounded"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            className="border p-2 rounded"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="border p-2 rounded"
            value={form.password}
            onChange={handleChange}
          />
          <select
            name="vehicleType"
            className="border p-2 rounded"
            value={form.vehicleType}
            onChange={handleChange}
          >
            <option value="">Chọn loại xe</option>
            <option value="Xe máy">Xe máy</option>
            <option value="Ô tô">Ô tô</option>
          </select>
          <input
            type="text"
            name="licensePlate"
            placeholder="Biển số xe"
            className="border p-2 rounded"
            value={form.licensePlate}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-primary hover:bg-cyan-600 text-white px-4 py-2 rounded"
          >
            Gửi thông tin
          </button>
        </form>

        {/* Ảnh bên phải */}
        <div className="flex-1 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Ảnh xem trước"
              className="w-[300px] h-[300px] object-cover border rounded shadow"
            />
          ) : (
            <div className="w-[300px] h-[300px] flex items-center justify-center border rounded text-gray-400">
              Xem trước ảnh
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
