import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import Colour from "./Colour";
import ProductLine from "./ProductLine";
import Style from "./Style";
import Material from "./Material";
import Origin from "./Origin";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface ProductAttributes {
  id: string;
  MauSac?: string;
  DongSP?: string;
  KieuDang?: string;
  ChatLieu?: string;
  XuatXu?: string;
  Ten?: string;
  GiaNhap?: number;
  GiaBan?: number;
  MoTa?: string;
  NgayTao?: Date;
  NgayCapNhat?: Date;
  HienThi: boolean;
  TrangThai: boolean;
}

//   public readonly MauSac?: Colour;
  // public readonly DongSP?: ProductLine;
  // public readonly KieuDang?: Style;
  // public readonly ChatLieu?: Material;
  // public readonly XuatXu?: Origin;

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public MauSac?: string;
  public DongSP?: string;
  public KieuDang?: string;
  public ChatLieu?: string;
  public XuatXu?: string;
  public Ten?: string;
  public GiaNhap?: number;
  public GiaBan?: number;
  public MoTa?: string;
  public NgayTao?: Date;
  public NgayCapNhat?: Date;
  public HienThi!: boolean;
  public TrangThai!: boolean;
}

Product.init(
  {
    id: {
      type: DataTypes.STRING(50),
      defaultValue: DataTypes.UUIDV4, // Sử dụng UUID cho id
      primaryKey: true,
      field: "Ma",
    },
    MauSac: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id,
      field: "MauSac",
      
    },
    DongSP: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "DongSP",
     
    },
    KieuDang: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "KieuDang",
    
    },
    ChatLieu: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "ChatLieu",
     
    },
    XuatXu: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "XuatXu",
      
    },
    Ten: {
      type: DataTypes.STRING(255),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "Ten",
    },
    GiaNhap: {
      type: DataTypes.DECIMAL(38, 2),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "GiaNhap",
    },
    GiaBan: {
      type: DataTypes.DECIMAL(38, 2),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "GiaBan",
    },
    MoTa: {
      type: DataTypes.STRING(255),
      allowNull: true, // Sử dụng UUID cho id
      field: "MoTa",
    },
    NgayTao: {
      type: DataTypes.DATE,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "NgayTao",
    },
    NgayCapNhat: {
      type: DataTypes.DATE,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "NgayCapNhat",
    },
    HienThi: {
      type: DataTypes.BOOLEAN,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "HienThi",
    },
    TrangThai: {
      type: DataTypes.BOOLEAN,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "TrangThai",
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "SanPham",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

// Thiết lập mối quan hệ: Product thuộc về MauSac, DongSP, KieuDang, ChatLieu, XuatXu
Product.belongsTo(Colour, { foreignKey: "MauSac", as: "MauSacEXEC" });
Product.belongsTo(ProductLine, { foreignKey: "DongSP", as: "DongSPEXEC" });
Product.belongsTo(Style, { foreignKey: "KieuDang", as: "KieuDangEXEC" });
Product.belongsTo(Material, { foreignKey: "ChatLieu", as: "ChatLieuEXEC" });
Product.belongsTo(Origin, { foreignKey: "XuatXu", as: "XuatXuEXEC" });

// MauSac.hasMany(Product, { foreignKey: "MauSacMa", as: "MauSacEXEC" });
// DongSP.hasMany(Product, { foreignKey: "DongSPId", as: "DongSPEXEC" });
// KieuDang.hasMany(Product, { foreignKey: "KieuDangId", as: "KieuDangEXEC" });
// ChatLieu.hasMany(Product, { foreignKey: "ChatLieuId", as: "ChatLieuEXEC" });
// XuatXu.hasMany(Product, { foreignKey: "XuatXuId", as: "XuatXuEXEC" });

export { Product, Colour, ProductLine, Style, Material, Origin };
