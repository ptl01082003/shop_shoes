import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import { Product } from "./Product";
import Voucher from "./Voucher";
import Customer from "./Customer";
import Staff from "./Staff";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface OrderAttributes {
  Ma: string;
  KhachHang?: string;
  Voucher?: string;
  TenNguoiNhan?: string;
  SoDienThoai?: string;
  Email?: string;
  ThanhPho_Name?: string;
  ThanhPho_Code?: number;
  QuanHuyen_Name?: string;
  QuanHuyen_Code?: number;
  XaPhuong_Name?: string;
  XaPhuong_Code?: number;
  DiaChiChiTiet?: string;
  NgayDatHang?: Date;
  TrangThai?: number;
  GhiChu?: string;
  TienGiam?: number;
  PhiGiaoHang?: number;
  PhuongThucThanhToan?: boolean;
  LyDoHuy?: string;
  maGiaoDich?: string;
  NgayXacNhan?: Date;
  NgayGiaoHang?: Date;
  NgayHoanThanh?: Date;
  NgayHuy?: Date;
  Loai?: number;
  NhanVien?: string;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface OrderCreationAttributes extends Optional<OrderAttributes, "Ma"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public Ma!: string;
  public KhachHang?: string;
  public Voucher?: string;
  public TenNguoiNhan?: string;
  public SoDienThoai?: string;
  public Email?: string;
  public ThanhPho_Name?: string;
  public ThanhPho_Code?: number;
  public QuanHuyen_Name?: string;
  public QuanHuyen_Code?: number;
  public XaPhuong_Name?: string;
  public XaPhuong_Code?: number;
  public DiaChiChiTiet?: string;
  public NgayDatHang?: Date;
  public TrangThai?: number;
  public GhiChu?: string;
  public TienGiam?: number;
  public PhiGiaoHang?: number;
  public PhuongThucThanhToan?: boolean;
  public LyDoHuy?: string;
  public maGiaoDich?: string;
  public NgayXacNhan?: Date;
  public NgayGiaoHang?: Date;
  public NgayHoanThanh?: Date;
  public NgayHuy?: Date;
  public Loai?: number;
  public NhanVien?: string;
}

Order.init(
  {
    Ma: {
      type: DataTypes.STRING(50),
 // Sử dụng UUID cho id
      primaryKey: true,
      field: "Ma",
    },
    KhachHang: {
      type: DataTypes.STRING(20),
      allowNull: true, // `Ten` là không bắt buộc
      field: "KhachHang",
    },
    Voucher: {
      type: DataTypes.STRING(36),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "Voucher",
    },
    TenNguoiNhan: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "tennguoinhan",
    },
    SoDienThoai: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "sodienthoai",
      },
      Email: {
        type: DataTypes.STRING(255),
        allowNull: true, // `Ten` là không bắt buộc
        field: "email",
      },
      ThanhPho_Name: {
        type: DataTypes.STRING(255),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "thanhpho_name",
      },
      ThanhPho_Code: {
        type: DataTypes.INTEGER,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "ThanhPho_Code",
      },
      QuanHuyen_Name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "quanhuyen_name",
      },
      QuanHuyen_Code: {
        type: DataTypes.INTEGER,
        allowNull: true, // `Ten` là không bắt buộc
        field: "quanhuyen_code",
      },
      XaPhuong_Name: {
        type: DataTypes.STRING(255),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "XaPhuong_Name",
      },
      XaPhuong_Code: {
        type: DataTypes.STRING(255),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "XaPhuong_Code",
      },
      DiaChiChiTiet: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "diachichitiet",
      },
      NgayDatHang: {
        type: DataTypes.DATE,
        allowNull: true, // `Ten` là không bắt buộc
        field: "ngaydathang",
      },
      TrangThai: {
        type: DataTypes.INTEGER,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "trangthai",
      },
      GhiChu: {
        type: DataTypes.STRING(255),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "ghichu",
      },
      TienGiam: {
        type: DataTypes.DECIMAL(38,2),
        allowNull: true,
        field: "tiengiam",
      },
      PhiGiaoHang: {
        type: DataTypes.DECIMAL(38,2),
        allowNull: true, // `Ten` là không bắt buộc
        field: "phigiaohang",
      },
      PhuongThucThanhToan: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "phuongThucThanhToan",
      },
      LyDoHuy: {
        type: DataTypes.STRING(255),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "lyDoHuy",
      },
      maGiaoDich: {
        type: DataTypes.STRING(45),
        // Sử dụng UUID cho id
        allowNull: true,
    
        field: "maGiaoDich",
      },
      NgayXacNhan: {
        type: DataTypes.DATE,
        allowNull: true,// `Ten` là không bắt buộc
        field: "ngayxacnhan",
      },
      NgayGiaoHang: {
        type: DataTypes.DATE,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "ngaygiaohang",
      },
      NgayHoanThanh: {
        type: DataTypes.DATE,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "ngayhoanthanh",
      },
      NgayHuy: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "ngayhuy",
      },
      Loai: {
        type: DataTypes.INTEGER,
        allowNull: true, // `Ten` là không bắt buộc
        field: "Loai",
      },
      NhanVien: {
        type: DataTypes.STRING(45),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "nhanvien",
      },
      
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "donhang",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);


Order.belongsTo(Voucher, { foreignKey: "Voucher", as: "VoucherEXEC" });
Order.belongsTo(Customer, { foreignKey: "KhachHang", as: "KhachHangEXEC" });
Order.belongsTo(Staff, { foreignKey: "NhanVien", as: "NhanVienEXEC" });

export default Order;
