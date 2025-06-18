import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleType: '',
    licensePlate: '',
  });

  // Fetch danh sách tài xế
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/driver');
      setDrivers(res.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách tài xế', error);
    }
  };

  // Bắt đầu chỉnh sửa
  const handleEdit = (driver: any) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      phone: driver.phone,
      vehicleType: driver.vehicleType,
      licensePlate: driver.licensePlate,
    });
  };

  // Gửi request cập nhật
  const handleUpdate = async () => {
    try {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('vehicleType', formData.vehicleType);
    data.append('licensePlate', formData.licensePlate);
    if (newImage) {
      data.append('image', newImage);
    }

    await axios.put(`http://localhost:3000/api/driver/${editingDriver._id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Cập nhật tài xế thành công');
    setEditingDriver(null);
    setNewImage(null);
    fetchDrivers();
  } catch (error) {
    console.error('Lỗi khi cập nhật tài xế', error);
  }
  };

  // Xóa tài xế
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/driver/${id}`);
      alert('Xóa tài xế thành công');
      fetchDrivers();
    } catch (error) {
      console.error('Lỗi khi xóa tài xế', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách tài xế</h2>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Tên</th>
            <th className="border p-2">SĐT</th>
            <th className="border p-2">Loại xe</th>
            <th className="border p-2">Biển số</th>
            <th className="border p-2 text-center">Ảnh</th>
            <th className="border p-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver: any, index) => (
            <tr key={index}>
              <td className="border p-2">{driver.name}</td>
              <td className="border p-2">{driver.phone}</td>
              <td className="border p-2">{driver.vehicleType}</td>
              <td className="border p-2">{driver.licensePlate}</td>
              <td className="border p-2 text-center">
                <img src={driver.imageUrl} alt="Ảnh tài xế" className="w-32 h-32 object-cover mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(driver)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(driver._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form sửa */}
      {editingDriver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Sửa thông tin tài xế</h3>
            <input
              type="text"
              placeholder="Tên"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="SĐT"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Loại xe"
              value={formData.vehicleType}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Biển số"
              value={formData.licensePlate}
              onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
              className="w-full border p-2 mb-4"
            />
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
              className="w-full border p-2 mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditingDriver(null)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Hủy
              </button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded">
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
