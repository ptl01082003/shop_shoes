import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import ProductDetails from "./ProductDetails";
import Customer from "./Customer";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface CartAttributes {
  id: string;
  ChiTietSanPham?: string;
  KhachHang?: string;
  SoLuong?: number;

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
    SoLuong?: number;
  
}

Cart.init(
  {
    id: {
      type: DataTypes.STRING(36),
      defaultValue : DataTypes.UUIDV4,
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
    SoLuong: {
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

Cart.belongsTo(ProductDetails, { foreignKey: "ChiTietSanPham", as: "ChiTietSanPhamEXEC" });
Cart.belongsTo(Customer, { foreignKey: "KhachHang", as: "KhachHangEXEC" });


export default Cart;
