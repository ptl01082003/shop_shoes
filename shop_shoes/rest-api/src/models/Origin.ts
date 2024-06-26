import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";

// Định nghĩa các thuộc tính của Xuất xứ
interface OriginAttributes {
  id: string;
  Ten?: string;
  NgayTao?: Date;
  NgayCapNhat?: Date;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface OriginCreationAttributes extends Optional<OriginAttributes, "id"> {}

class Origin extends Model<OriginAttributes, OriginCreationAttributes> implements OriginAttributes {
  public id!: string;
  public Ten?: string;
  public NgayTao?: Date;
  public NgayCapNhat?: Date;
}

Origin.init({
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
  
  },
  {
    sequelize,
    tableName: "XuatXu",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

export default Origin;
