// src/components/UserList.tsx

import React, { useEffect, useState } from "react";
import UserService from "../../services/userApi";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getUsers();
        setUsers(response.data); // Sử dụng response.data để cập nhật danh sách người dùng từ API vào state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      await UserService.deleteUser(userId);
      // Sau khi xóa thành công, cập nhật lại danh sách người dùng bằng cách lọc ra những người dùng không có userId
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
    }
  };

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
