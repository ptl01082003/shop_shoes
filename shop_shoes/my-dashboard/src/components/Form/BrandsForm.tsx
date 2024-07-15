// src/components/BrandForm.tsx

import React, { useState } from "react";
import BrandService from "../../services/BrandApi";

const BrandForm: React.FC = () => {
  const [brandName, setBrandName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const brandData = { brandName };
      await BrandService.createBrand(brandData);
      // Sau khi tạo thành công, làm sạch form
      setBrandName("");
      alert("Tạo mới thương hiệu thành công!");
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  return (
    <div>
      <h2>Form tạo mới thương hiệu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tên thương hiệu:
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Tạo mới</button>
      </form>
    </div>
  );
};

export default BrandForm;
