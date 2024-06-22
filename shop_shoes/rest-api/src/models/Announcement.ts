import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import Staff from "./Staff";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface AnnouncementAttributes {
  id: string;
  NhanVien?: string;
  LoaiThongBao?: number;
  NoiDung?: number;
  ThoiGian?: Date;
  url?: string;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface AnnouncementCreationAttributes extends Optional<AnnouncementAttributes, "id"> {}

class Announcement
  extends Model<AnnouncementAttributes, AnnouncementCreationAttributes>
  implements AnnouncementAttributes
{
  id!: string;
  NhanVien?: string;
  LoaiThongBao?: number;
  NoiDung?: number;
  ThoiGian?: Date;
  url?: string;
}

Announcement.init(
  {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4, // Đặt id là tự động tăng
      primaryKey: true,
      field: "id",
    },
    NhanVien: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "NhanVien",
    },
    LoaiThongBao: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "loaithongbao",
    },
    NoiDung: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "noidung",
    },
    ThoiGian: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "thoigian",
    },
  },
  {
    sequelize,
    modelName: "Announcement",
    tableName: "thongbao",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

Announcement.belongsTo(Staff, { foreignKey: "NhanVien", as: "NhanVienEXEC" });
export default Announcement;
