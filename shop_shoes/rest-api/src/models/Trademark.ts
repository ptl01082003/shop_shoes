import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import ProductLine from "../models/ProductLine"; // Đảm bảo import đúng đường dẫn đến model ProductLine

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

Trademark.init(
  {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      field: "id",
    },
    Ten: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "Ten",
    },
    NgayTao: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "NgayTao",
    },
    NgayCapNhat: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "NgayCapNhat",
    },
  },
  {
    sequelize,
    modelName: "Trademark",
    tableName: "ThuongHieu",
    timestamps: false,
  }
);


export default Trademark;


