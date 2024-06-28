import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import { Product } from "./Product";
import Size from "./Size";


// Định nghĩa các thuộc tính của Thuong Hiệu
interface ProductDetailsAttributes {
  id: string;
  SanPham?: string;
  Size?: number;
  SoLuong?: string;
  TrangThai?: boolean;
  NgayTao?: Date;
  NgayCapNhap?: Date;
  
}

//   public readonly MauSac?: Colour;
  // public readonly DongSP?: ProductDetailsLine;
  // public readonly KieuDang?: Style;
  // public readonly ChatLieu?: Material;
  // public readonly XuatXu?: Origin;

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface ProductDetailsCreationAttributes extends Optional<ProductDetailsAttributes, "id"> {}

class ProductDetails
  extends Model<ProductDetailsAttributes, ProductDetailsCreationAttributes>
  implements ProductDetailsAttributes
{
    id!: string;
    SanPham?: string;
    Size?: number;
    SoLuong?: string;
    TrangThai?: boolean;
    NgayTao?: Date;
    NgayCapNhap?: Date;
}

ProductDetails.init(
  {
    id: {
      type: DataTypes.STRING(50),
      defaultValue: DataTypes.UUIDV4, // Sử dụng UUID cho id
      primaryKey: true,
      field: "id",
    },
    SanPham: {
      type: DataTypes.STRING(36),
        allowNull: true, // Sử dụng UUID cho id,
      field: "SanPham",
      
    },
    Size: {
      type: DataTypes.FLOAT,
        allowNull: true, // Sử dụng UUID cho id
      field: "Size",
     
    },
    SoLuong: {
      type: DataTypes.BIGINT,
        allowNull: true, // Sử dụng UUID cho id
      field: "SoLuong",
     
    },
    TrangThai: {
      type: DataTypes.BOOLEAN,
        allowNull: true, // Sử dụng UUID cho id
      field: "TrangThai",
    
    },
    NgayTao: {
      type: DataTypes.DATE,
        allowNull: true, // Sử dụng UUID cho id
      field: "ngaytao",
     
    },
    NgayCapNhap: {
      type: DataTypes.DATE,
        allowNull: true, // Sử dụng UUID cho id
      field: "ngaycapnhap",
      
    },
  },
  {
    sequelize,
    modelName: "ProductDetails",
    tableName: "chitietsanpham",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

ProductDetails.belongsTo(Product, { foreignKey: "SanPham", as: "SanPhamEXEC" });
ProductDetails.belongsTo(Size, { foreignKey: "Size", as: "SizeEXEC" });

export default ProductDetails ;
