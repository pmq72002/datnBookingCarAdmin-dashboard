import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [rideHistory, setRideHistory] = useState<any[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách người dùng:', err);
    }
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      alert('Xóa người dùng thành công');
      fetchUsers();
    } catch (err) {
      console.error('Lỗi khi xóa người dùng:', err);
    }
  };
const [editingUser, setEditingUser] = useState<any>(null);
const [form, setForm] = useState({ name: '', phone: '', birthday: '' });
  const editUser = (user: any) => {
  setEditingUser(user);
  setForm({ name: user.name, phone: user.phone, birthday: user.birthday || '' });
};

const viewAllRideHistory = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/users/history');
    setRideHistory(res.data);
    setShowHistoryModal(true);
  } catch (err) {
    console.error('Lỗi khi lấy lịch sử:', err);
    alert('Không thể lấy lịch sử');
  }
};

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  let hh = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  const ampm = hh >= 12 ? 'PM' : 'AM';
  hh = hh % 12 || 12; // chuyển sang định dạng 12h và xử lý khi giờ là 0

  return `${dd}-${mm}-${yyyy}, ${String(hh).padStart(2, '0')}:${min} ${ampm}`;
};





  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
      <table className="w-full border border-collapse table-fixed">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2 w-1/4">Tên</th>
            <th className="border p-2 w-1/4">SĐT</th>
            <th className="border p-2 w-1/4">Ngày sinh</th>
            <th className="border p-2 w-1/4">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.birthday || '-'}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  onClick={() => editUser(user)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Sửa
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
                <button
                  onClick={() => viewAllRideHistory()}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Lịch sử
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h3 className="text-xl font-bold mb-4">Sửa người dùng</h3>
      <input
        type="text"
        placeholder="Tên"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full mb-2 border p-2 rounded"
      />
      <input
        type="text"
        placeholder="SĐT"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full mb-2 border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Ngày sinh"
        value={form.birthday}
        onChange={(e) => setForm({ ...form, birthday: e.target.value })}
        className="w-full mb-4 border p-2 rounded"
      />
      <div className="flex justify-between">
        <button
          onClick={async () => {
            try {
              await axios.put(`http://localhost:3000/api/users/${editingUser._id}`, form);
              alert('Cập nhật thành công');
              setEditingUser(null);
              fetchUsers();
            } catch (err: any) {
              alert('Lỗi khi cập nhật');
              console.error('Lỗi khi cập nhật:', err.response?.data || err.message);

            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Lưu
        </button>
        <button
          onClick={() => setEditingUser(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
)}
{showHistoryModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg max-h-[80vh] overflow-y-auto w-[600px]">
      <h3 className="text-xl font-bold mb-4">Lịch sử chuyến đi</h3>
      <ul className="space-y-2">
        <button
        onClick={() => setShowHistoryModal(false)}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Đóng
      </button>
        {rideHistory.map((ride: any, index) => (
          <li key={index} className="border p-3 rounded bg-gray-100">
            <div><strong>Phân loại:</strong> <strong>{ride.type}</strong></div>
            <div><strong>Điểm đi:</strong> {ride.originName}</div>
            <div><strong>Điểm đến:</strong> {ride.destinationName}</div>
            <div><strong>Giá:</strong> {ride.price}</div>
            <div><strong>Thời gian:</strong> {formatDateTime(ride.completedAt)}</div>
          </li>
        ))}
      </ul>
      
    </div>
  </div>
)}



    </div>
  );
}
