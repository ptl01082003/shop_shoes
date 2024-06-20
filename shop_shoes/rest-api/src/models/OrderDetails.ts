import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import { Product } from "./Product";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface OrderDetailsAttributes {
  id: string;
  DonHang?: string;
  ChiTietSanPham?: string;
  SoLuong?: number;
  DonGia?: number;
  DonGiaSauGiam?: number;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface OrderDetailsCreationAttributes
  extends Optional<OrderDetailsAttributes, "id"> {}

class OrderDetails
  extends Model<OrderDetailsAttributes, OrderDetailsCreationAttributes>
  implements OrderDetailsAttributes
{
  public id!: string;
  public DonHang?: string;
  public ChiTietSanPham?: string;
  public SoLuong?: number;
  public DonGia?: number;
  public DonGiaSauGiam?: number;
}

OrderDetails.init(
  {
    id: {
      type: DataTypes.STRING(255),
      // Sử dụng UUID cho id
      primaryKey: true,
      field: "id",
    },
    DonHang: {
      type: DataTypes.STRING(50),
      allowNull: true, // `Ten` là không bắt buộc
      field: "DonHang",
    },
    ChiTietSanPham: {
      type: DataTypes.STRING(36),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "ChiTietSanPham",
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "SoLuong",
    },
    DonGia: {
      type: DataTypes.DECIMAL(38,2),
      allowNull: true,
      field: "dongia",
    },
    DonGiaSauGiam: {
      type: DataTypes.DECIMAL(38,2),
      allowNull: true, // `Ten` là không bắt buộc
      field: "dongiasaugiam",
    },
  },
  {
    sequelize,
    modelName: "OrderDetails",
    tableName: "chitietdonhang",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

export default OrderDetails;
