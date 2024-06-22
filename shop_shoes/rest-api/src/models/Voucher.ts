import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";

// Định nghĩa các thuộc tính của Kiểu dáng
interface VoucherAttributes {
  Ma: string;
  MoTa?: string;
  LoaiMucGiam?: string;
  MucGiam?: Number;
  GiaTriDonHang?: Number;
  MucGiamToiDa?: Number;
  NgayBatDau?: Date;
  NgayKetThuc?: Date;
  SoLuong?: bigint;
  TrangThaiXoa?: boolean;
  HinhThucThanhToan?: number;
  TrangThai?: number;
  DoiTuongSuDung?: boolean;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface VoucherCreationAttributes extends Optional<VoucherAttributes, "Ma"> {}

class Voucher
  extends Model<VoucherAttributes, VoucherCreationAttributes>
  implements VoucherAttributes
{
  public Ma!: string;
  public MoTa?: string;
  public LoaiMucGiam?: string;
  public MucGiam?: Number;
  public GiaTriDonHang?: Number;
  public MucGiamToiDa?: Number;
  public NgayBatDau?: Date;
  public NgayKetThuc?: Date;
  public SoLuong?: bigint;
  public TrangThaiXoa?: boolean;
  public HinhThucThanhToan?: number;
  public TrangThai?: number;
  public DoiTuongSuDung?: boolean;
}

Voucher.init(
  {
    Ma: {
      type: DataTypes.STRING(36),
      allowNull:true, // Sử dụng UUID cho id
      primaryKey: true,
      field: "Ma",
    },
    MoTa: {
      type: DataTypes.STRING(200),
      allowNull: true, // `Ten` là không bắt buộc
      field: "mota",
    },
    LoaiMucGiam: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "loaimucgiam",
    },
    MucGiam: {
      type: DataTypes.DOUBLE,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: "MucGiam",
    },
    GiaTriDonHang: {
        type: DataTypes.DECIMAL(12,2),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "GiaTriDonHang",
      },
      MucGiamToiDa: {
        type: DataTypes.DECIMAL(12,2),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "MucGiamToiDa",
      },
      NgayBatDau: {
        type: DataTypes.DATE,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "NgayBatDau",
      },
      NgayKetThuc: {
        type: DataTypes.DATE,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "NgayKetThuc",
      },
      SoLuong: {
        type: DataTypes.BIGINT,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "SoLuong",
      },
      TrangThaiXoa: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "trangthaixoa",
      },
      HinhThucThanhToan: {
        type: DataTypes.INTEGER,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "hinhthucthanhtoan",
      },
      TrangThai: {
        type: DataTypes.INTEGER,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "trangthai",
      },
      DoiTuongSuDung: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: "doituongsudung",
      },
  },
  
  {
    sequelize,
    modelName:"Voucher",
    tableName: "voucher",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

export default Voucher;
