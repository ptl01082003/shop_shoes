import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import DongSP from "./ProductLine";
// Định nghĩa các thuộc tính của Thuong Hiệu
interface TrademarkAttributes {
  id: string;
  Ten?: string;
  NgayTao?: Date;
  NgayCapNhat?: Date;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface TrademarkCreationAttributes extends Optional<TrademarkAttributes, "id"> {}

class Trademark extends Model<TrademarkAttributes, TrademarkCreationAttributes> implements TrademarkAttributes {
  public id!: string;
  public Ten?: string;
  public NgayTao?: Date;
  public NgayCapNhat?: Date;
}

Trademark.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4, // Sử dụng UUID cho id
      primaryKey: true,
      field: 'id',
    },
    Ten: {
      type: DataTypes.STRING(200),
      allowNull: true, // `Ten` là không bắt buộc
      field: 'Ten',
    },
    NgayTao: {
      type: DataTypes.DATE,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'NgayTao',
    },
    NgayCapNhat: {
      type: DataTypes.DATE,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'NgayCapNhat',
    },
  },
  {
    sequelize,
    tableName: "ThuongHieu",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

export default Trademark;
