// src/components/ProductLineForm.tsx

import React, { useState } from "react";
import ProductLineService from "../../services/ProductLineApi";

const ProductLineForm: React.FC = () => {
  const [productLineName, setProductLineName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const productLineData = { productLineName };
      await ProductLineService.createProductLine(productLineData);
      // Sau khi tạo thành công, làm sạch form
      setProductLineName("");
      alert("Tạo mới dòng sản phẩm thành công!");
    } catch (error) {
      console.error("Error creating product line:", error);
    }
  };

  return (
    <div>
      <h2>Form tạo mới dòng sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tên dòng sản phẩm:
          <input
            type="text"
            value={productLineName}
            onChange={(e) => setProductLineName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Tạo mới</button>
      </form>
    </div>
  );
};

export default ProductLineForm;
