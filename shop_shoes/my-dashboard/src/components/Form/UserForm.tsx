// src/components/UserForm.tsx

import React, { useState } from "react";
import UserService from "../../services/userApi";

const UserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userData = { name, email };
      await UserService.createUser(userData);
      // Sau khi tạo thành công, làm sạch form
      setName("");
      setEmail("");
      alert("Tạo mới người dùng thành công!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h2>Form tạo mới người dùng</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tên:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Tạo mới</button>
      </form>
    </div>
  );
};

export default UserForm;
