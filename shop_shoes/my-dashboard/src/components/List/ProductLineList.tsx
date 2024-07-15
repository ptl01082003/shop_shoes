import React, { useEffect, useState } from "react";
import ProductLineService from "../../services/ProductLineApi";

interface ProductLine {
  productLineID: number;
  productLineName: string;
}

const ProductLineList: React.FC = () => {
  const [productLines, setProductLines] = useState<ProductLine[]>([]);

  useEffect(() => {
    const fetchProductLines = async () => {
      try {
        const response = await ProductLineService.getProductLines();
        setProductLines(response.data); // Cập nhật danh sách dòng sản phẩm từ API vào state
      } catch (error) {
        console.error("Error fetching product lines:", error);
      }
    };

    fetchProductLines();
  }, []);

  const handleDeleteProductLine = async (productLineId: number) => {
    try {
      await ProductLineService.deleteProductLine(productLineId);
      // Sau khi xóa thành công, cập nhật lại danh sách dòng sản phẩm
      setProductLines((prevProductLines) =>
        prevProductLines.filter((pl) => pl.productLineID !== productLineId)
      );
    } catch (error) {
      console.error(`Error deleting product line ${productLineId}:`, error);
    }
  };

  return (
    <div>
      <h2>Danh sách dòng sản phẩm</h2>
      {productLines.length === 0 ? (
        <p>Không có dòng sản phẩm.</p>
      ) : (
        <ul>
          {productLines.map((pl) => (
            <li key={pl.productLineID}>
              {pl.productLineName}
              <button onClick={() => handleDeleteProductLine(pl.productLineID)}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductLineList;
