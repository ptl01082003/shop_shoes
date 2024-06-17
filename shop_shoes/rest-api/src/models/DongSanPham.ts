import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import { SanPham } from "../models/SanPham";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface DongSPAttributes {
  id: string;
  Ten?: string;
  NgayTao?: Date;
  NgayCapNhat?: Date;
  ThuongHieuId ?: string; //// khóa phụ
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface DongSPCreationAttributes extends Optional<DongSPAttributes, "id"> {}

class DongSP extends Model<DongSPAttributes, DongSPCreationAttributes> implements DongSPAttributes {
  public id!: string;
  public Ten?: string;
  public NgayTao?: Date;
  public NgayCapNhat?: Date;
  public ThuongHieuId?: string;
}

DongSP.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4, // Sử dụng UUID cho id
      primaryKey: true,
      field: 'id',
    },
    Ten: {
      type: DataTypes.STRING(200),
      allowNull: true, // `Ten` là không bắt buộc
      field: 'Ten',
    },
    NgayTao: {
      type: DataTypes.DATE,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'NgayTao',
    },
    NgayCapNhat: {
      type: DataTypes.DATE,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'NgayCapNhat',
    },
    ThuongHieuId: {
        type: DataTypes.STRING(36),
        allowNull: true, // `Ten` là không bắt buộc
        field: 'ThuongHieu',
      },
  },
  {
    sequelize,
    modelName:"DongSanPham",
    tableName: "dongsanpham",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

export default DongSP;
