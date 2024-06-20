import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";


// Định nghĩa các thuộc tính của Thuong Hiệu
interface ProductDetailsAttributes {
  id: string;
  SanPham?: string;
  Size?: string;
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
    Size?: string;
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
      field: "Ma",
    },
    SanPham: {
      type: DataTypes.STRING(36),
        allowNull: true, // Sử dụng UUID cho id,
      field: "SanPham",
      
    },
    Size: {
      type: DataTypes.FLOAT,
        allowNull: true, // Sử dụng UUID cho id
      field: "DongSP",
     
    },
    TrangThai: {
      type: DataTypes.BOOLEAN,
        allowNull: true, // Sử dụng UUID cho id
      field: "KieuDang",
    
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

// Thiết lập mối quan hệ: ProductDetails thuộc về MauSac, DongSP, KieuDang, ChatLieu, XuatXu
// ProductDetails.belongsTo(Colour, { foreignKey: "MauSac", as: "MauSacEXEC" });
// ProductDetails.belongsTo(ProductDetailsLine, { foreignKey: "DongSP", as: "DongSPEXEC" });
// ProductDetails.belongsTo(Style, { foreignKey: "KieuDang", as: "KieuDangEXEC" });
// ProductDetails.belongsTo(Material, { foreignKey: "ChatLieu", as: "ChatLieuEXEC" });
// ProductDetails.belongsTo(Origin, { foreignKey: "XuatXu", as: "XuatXuEXEC" });

// MauSac.hasMany(ProductDetails, { foreignKey: "MauSacMa", as: "MauSacEXEC" });
// DongSP.hasMany(ProductDetails, { foreignKey: "DongSPId", as: "DongSPEXEC" });
// KieuDang.hasMany(ProductDetails, { foreignKey: "KieuDangId", as: "KieuDangEXEC" });
// ChatLieu.hasMany(ProductDetails, { foreignKey: "ChatLieuId", as: "ChatLieuEXEC" });
// XuatXu.hasMany(ProductDetails, { foreignKey: "XuatXuId", as: "XuatXuEXEC" });

export default ProductDetails ;
