import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface CartAttributes {
  id: string;
  ChiTietSanPham?: string;
  KhachHang?: string;
  soluong?: number;

}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}

class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
    id!: string;
    ChiTietSanPham?: string;
    KhachHang?: string;
    soluong?: number;
  
}

Cart.init(
  {
    id: {
      type: DataTypes.STRING(36),
     
      primaryKey: true,
      field: "id",
    },
    ChiTietSanPham: {
      type: DataTypes.STRING(36),
      allowNull: true,
      field: "ChiTietSanPham",
    },
    KhachHang: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "KhachHang",
    },
    soluong: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "soluong",
    },
  },
  {
    sequelize,
    modelName: "Cart",
    tableName: "giohang",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

export default Cart;
