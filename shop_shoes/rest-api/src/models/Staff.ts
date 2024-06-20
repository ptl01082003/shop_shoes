import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import Role from "./Size";

interface StaffAttributes {
  VaiTro: string;
  UserName: string;
  Password: string;
  HoVaTen: string;
  NgaySinh: Date;
  GioiTinh: boolean;
  SoDienThoai: string;
  Email: string;
  AnhDaiDien: string;
}

interface StaffCreationAttributes extends Optional<StaffAttributes, "UserName"> {}

class Staff extends Model<StaffAttributes, StaffCreationAttributes> implements StaffAttributes {
  VaiTro!: string;
  UserName!: string;
  Password!: string;
  HoVaTen!: string;
  NgaySinh!: Date;
  GioiTinh!: boolean;
  SoDienThoai!: string;
  Email!: string;
  AnhDaiDien!: string;
}

Staff.init({
  VaiTro: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: "VaiTro",
  },
  UserName: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false,
    field: "UserName",
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "Password",
  },
  HoVaTen: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "HoVaTen",
  },
  NgaySinh: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "NgaySinh",
  },
  GioiTinh: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: "GioiTinh",
  },
  SoDienThoai: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "SoDienThoai",
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "Email",
  },
  AnhDaiDien: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "AnhDaiDien",
  },
}, {
  sequelize,
  modelName: "Staff",
  tableName: "nhanvien",
  timestamps: false,
});
Staff.belongsTo(Role, { foreignKey: 'VaiTro', as: 'VaiTroEXEC' });

export default Staff;
