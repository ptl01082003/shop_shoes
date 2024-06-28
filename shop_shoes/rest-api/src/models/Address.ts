import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import Customer from "./Customer";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface AddressAttributes {
  id: BigInt;
  KhachHang?: string;
  ThanhPhoCode?: number;
  QuanHuyenCode?: number;
  XaPhuongCode?: string;
  DiaChiChiTiet?: string;
  ThanhPhoName?: string;
  QuyenHuyenName?: string;
  XaPhuongName?: string;
  Email?: string;
  SoDienThoai?: string;
  TenNguoiNhan?: string;
  MacDinh?: Boolean;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface AddressCreationAttributes extends Optional<AddressAttributes, "id"> {}

class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  id!: BigInt;
  KhachHang?: string;
  ThanhPhoCode?: number;
  QuanHuyenCode?: number;
  XaPhuongCode?: string;
  DiaChiChiTiet?: string;
  ThanhPhoName?: string;
  QuyenHuyenName?: string;
  XaPhuongName?: string;
  Email?: string;
  SoDienThoai?: string;
  TenNguoiNhan?: string;
  MacDinh?: Boolean;
}

Address.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true, // Đặt id là tự động tăng
      primaryKey: true,
      field: "id",
    },
    KhachHang: {
        type: DataTypes.STRING(20),
        allowNull:true,
        field: "KhachHang",
      },
      ThanhPhoCode: {
        type: DataTypes.INTEGER,
        allowNull:true,
        field: "ThanhPhoCode",
      },
      QuanHuyenCode: {
        type: DataTypes.INTEGER,
        allowNull:true,
        field: "QuanHuyenCode",
      },
      XaPhuongCode: {
        type: DataTypes.STRING(255),
        allowNull:true,
        field: "xaphuongCode",
      },
      DiaChiChiTiet: {
        type: DataTypes.STRING(255),
        allowNull:true,
        field: "diachichitiet",
      },
      ThanhPhoName: {
        type: DataTypes.STRING(255),
        allowNull:true,
        field: "thanhphoname",
      },
      QuyenHuyenName: {
        type: DataTypes.STRING(255),
        allowNull:true,
        field: "quanhuyenname",
      },
      XaPhuongName: {
        type: DataTypes.STRING(255),
        allowNull:true,
        field: "xaphuongName",
      },
      Email: {
        type: DataTypes.STRING(255),
        allowNull:true,
        field: "email",
      },
      SoDienThoai: {
        type: DataTypes.STRING(255),
        allowNull:true,
        field: "sodienthoai",
      },
      TenNguoiNhan: {
        type: DataTypes.STRING(255),
        allowNull:true,
        field: "tennguoinhan",
      },
      MacDinh: {
        type: DataTypes.BOOLEAN,
        allowNull:true,
        field: "macDinh",
      },
     
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "diachi",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    

  }
);


Address.belongsTo(Customer, { foreignKey: "KhachHang", as: "KhachHangEXEC" });


export default Address;
