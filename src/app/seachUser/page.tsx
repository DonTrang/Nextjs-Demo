'use client';

import React, { useState } from 'react';

const SearchUser = () => {
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/searchUser?name=${userName}`);
      const data = await response.json();

      if (data && data.user) {
        setUserData(data.user);
        setError('');
      } else {
        setError('Không thấy người dùng.');
        setUserData(null);
      }
    } catch (err) {
      setError('Có lỗi xảy ra.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Tìm kiếm người dùng</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nhập tên người dùng"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Tìm kiếm
          </button>
        </div>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {userData && (
          <div className="mt-6 p-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700">
            <h2 className="text-xl font-semibold">Thông tin người dùng</h2>
            <p><strong>Tên:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {/* Hiển thị thêm thông tin người dùng nếu cần */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
