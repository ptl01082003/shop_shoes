
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import { Product } from "./Product";
import Staff from "./Staff";
import Customer from "./Customer";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface FavoriteListAttributes {
  id: string;
  SanPham?: string;
  KhachHang?: string;

}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface FavoriteListCreationAttributes extends Optional<FavoriteListAttributes, "id"> {}

class FavoriteList extends Model<FavoriteListAttributes, FavoriteListCreationAttributes> implements FavoriteListAttributes {
  id!: string;
  SanPham?: string | undefined;
  KhachHang?: string | undefined;
 
}

FavoriteList.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4, // Sử dụng UUID cho id
      primaryKey: true,
      field: 'id',
    },
    SanPham: {
      type: DataTypes.STRING(50),
      allowNull: true, // `Ten` là không bắt buộc
      field: 'SanPham',
    },
    KhachHang: {
      type: DataTypes.STRING(20),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'KhachHang',
    },
  
  },
  {
    sequelize,
    modelName: 'FavoriteList',
    tableName: "danhsachyeuthich",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

FavoriteList.belongsTo(Product, { foreignKey: "SanPham", as: "SanPhamEXEC" });
FavoriteList.belongsTo(Customer, { foreignKey: "KhachHang", as: "KhachHangEXEC" });



export default FavoriteList;
 