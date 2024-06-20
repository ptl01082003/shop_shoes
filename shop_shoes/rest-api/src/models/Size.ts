import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";

// Định nghĩa các thuộc tính của Vai Trò
interface SizeAttributes {
  Ma: number;
  ChieuDai?: number;
  NgayTao?: Date;
  NgayCapNhat?: Date;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface SizeCreationAttributes extends Optional<SizeAttributes, "Ma"> {}

class Size
  extends Model<SizeAttributes, SizeCreationAttributes>
  implements SizeAttributes
{
  Ma!: number;
  ChieuDai?: number;
  NgayTao?: Date;
  NgayCapNhat?: Date;
}

Size.init(
  {
    Ma: {
      type: DataTypes.FLOAT,
      primaryKey: true,
      allowNull: false,
      field: "Ma",
    },
    ChieuDai: {
      type: DataTypes.FLOAT,
      allowNull: true, // `Ten` là không bắt buộc
      field: "ChieuDai",
    },
    NgayTao: {
      type: DataTypes.DATE,
      allowNull: true, // `Ten` là không bắt buộc
      field: "NgayTao",
    },
    NgayCapNhat: {
      type: DataTypes.DATE,
      allowNull: true, // `Ten` là không bắt buộc
      field: "NgayCapNhat",
    },
  },
  {
    sequelize,
    modelName: "Size",
    tableName: "size",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

export default Size;
