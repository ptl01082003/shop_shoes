import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";

// Định nghĩa các thuộc tính của Vai Trò
interface RoleAttributes {
  Ma: string;
  Ten: string;

}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface RoleCreationAttributes extends Optional<RoleAttributes, "Ma"> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public Ma!: string;
  public Ten!: string;

}

Role.init({
    Ma: {
      type: DataTypes.STRING(20),
      // Sử dụng UUID cho id
      primaryKey: true,
      allowNull: false,
      field: 'Ma',
    },
    Ten: {
      type: DataTypes.STRING(50),
      allowNull: false, // `Ten` là không bắt buộc
      field: 'Ten',
    },
  
  },
  {
    sequelize,
    modelName :"Role",
    tableName: "vaitro",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

export default Role;
