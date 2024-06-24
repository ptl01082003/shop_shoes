import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import { Product } from "./Product";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface ImageAttributes {
  id: BigInt;
  SanPham?: string;
  Ten?: string;
  ViTriAnh?: number;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface ImageCreationAttributes extends Optional<ImageAttributes, "id"> {}

class Image
  extends Model<ImageAttributes, ImageCreationAttributes>
  implements ImageAttributes
{
  id!: BigInt;
  SanPham?: string;
  Ten?: string;
  ViTriAnh?: number;
}

Image.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    SanPham: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "SanPham",
    },
    Ten: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "ten",
    },
    ViTriAnh: {
      type: DataTypes.INTEGER(),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "ViTriAnh",
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "anh",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

Image.belongsTo(Product, { foreignKey: "SanPham", as: "SanPhamEXEC" });

export default Image;
