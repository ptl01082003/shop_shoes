import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import MauSac from "../models/MauSac";
import DongSP from "../models/DongSanPham";
import KieuDang from "../models/KieuDang";
import ChatLieu from "../models/ChatLieu";
import XuatXu from "../models/XuatXu";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface SanPhamAttributes {
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

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface SanPhamCreationAttributes extends Optional<SanPhamAttributes, "id"> {}

class SanPham
  extends Model<SanPhamAttributes, SanPhamCreationAttributes>
  implements SanPhamAttributes
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

SanPham.init(
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
      references: {
        model: "MauSac", // tên của bảng user
        key: "ma",
      },
    },
    DongSP: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "DongSP",
      references: {
        model: "DongSP", // tên của bảng user
        key: "id",
      },
    },
    KieuDang: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "KieuDang",
      references: {
        model: "KieuDang", // tên của bảng user
        key: "id",
      },
    },
    ChatLieu: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "ChatLieu",
      references: {
        model: "ChatLieu", // tên của bảng user
        key: "id",
      },
    },
    XuatXu: {
      type: DataTypes.STRING(36),
      //   allowNull: true, // Sử dụng UUID cho id
      field: "XuatXu",
      references: {
        model: "XuatXu", // tên của bảng user
        key: "id",
      },
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
    modelName: "SanPham",
    tableName: "sanpham",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

// Thiết lập mối quan hệ: SanPham thuộc về MauSac, DongSP, KieuDang, ChatLieu, XuatXu
SanPham.belongsTo(MauSac, { foreignKey: "MauSac", as: "MauSacEXEC" });
SanPham.belongsTo(DongSP, { foreignKey: "DongSP", as: "DongSPEXEC" });
SanPham.belongsTo(KieuDang, { foreignKey: "KieuDang", as: "KieuDangEXEC" });
SanPham.belongsTo(ChatLieu, { foreignKey: "ChatLieu", as: "ChatLieuEXEC" });
SanPham.belongsTo(XuatXu, { foreignKey: "XuatXu", as: "XuatXuEXEC" });

// MauSac.hasMany(SanPham, { foreignKey: "MauSacMa", as: "MauSacEXEC" });
// DongSP.hasMany(SanPham, { foreignKey: "DongSPId", as: "DongSPEXEC" });
// KieuDang.hasMany(SanPham, { foreignKey: "KieuDangId", as: "KieuDangEXEC" });
// ChatLieu.hasMany(SanPham, { foreignKey: "ChatLieuId", as: "ChatLieuEXEC" });
// XuatXu.hasMany(SanPham, { foreignKey: "XuatXuId", as: "XuatXuEXEC" });

export { SanPham, MauSac, DongSP, KieuDang, ChatLieu, XuatXu };
