import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";// Đảm bảo import đúng đường dẫn đến model Trademark
import Staff from "./Staff";
import Announcement from "./Announcement";


// Định nghĩa các thuộc tính của Dòng Sản Phẩm
interface ReceiptNotificationAttributes {
  id: bigint;
  ThongBao?: string;
  TrangThai?: boolean;
  NhanVien?: string; // khóa phụ
}

// Một số thuộc tính không bắt buộc khi tạo Dòng Sản Phẩm
interface ReceiptNotificationCreationAttributes
  extends Optional<ReceiptNotificationAttributes, "id"> {}

class ReceiptNotification
  extends Model<
    ReceiptNotificationAttributes,
    ReceiptNotificationCreationAttributes
  >
  implements ReceiptNotificationAttributes
{
  id!: bigint;
  ThongBao?: string;
  TrangThai?: boolean;
  NhanVien?: string;
}

ReceiptNotification.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    ThongBao: {
      type: DataTypes.STRING(36),
      allowNull: true,
      field: "ThongBao",
    },
    TrangThai: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "TrangThai",
    },
    NhanVien: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "NhanVien",
    },
  },
  {
    sequelize,
    modelName: "ReceiptNotification",
    tableName: "thongbaonhan",
    timestamps: false,
    // validate: {
    //   bothCoordsOrNone() {
    //     if ((this.latitude === null) !== (this.longitude === null)) {
    //       throw new Error('Either both latitude and longitude, or neither!');
    //     }
    //   },
    // },   
  }
);

ReceiptNotification.belongsTo(Staff, { foreignKey: 'NhanVien', as: 'NhanVienEXEC' });

ReceiptNotification.belongsTo(Announcement, { foreignKey: 'ThongBao', as: 'ThongBaoEXEC' });

export default ReceiptNotification;
