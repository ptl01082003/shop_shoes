import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import Trademark from "../models/Trademark"; // Đảm bảo import đúng đường dẫn đến model Trademark

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
      allowNull: false,

      field: "KhuyenMai",
    },
    ThongBao: {
      type: DataTypes.STRING(36),
      allowNull: true,
      field: "ThongBao",
    },
    TrangThai: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "ThongBao",
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

// ReceiptNotification.belongsTo(Trademark, {
//   foreignKey: "ThuongHieu",
//   as: "ThuongHieuEXEC",
// });

export default ReceiptNotification;
