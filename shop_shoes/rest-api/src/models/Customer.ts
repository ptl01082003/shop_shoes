
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";


// Định nghĩa các thuộc tính của Thuong Hiệu
interface CustomerAttributes {
   UserName: string;
   Password?: string;
   HovaTen?: string;
   NgaySinh?: Date;
   GioiTinh?: boolean;
   SoDienThoai?: string;
   Email?: string;
   AnhDaiDien?: string;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface CustomerCreationAttributes extends Optional<CustomerAttributes, "UserName"> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  UserName!: string;
  Password?: string;
  HovaTen?: string;
  NgaySinh?: Date;
  GioiTinh?: boolean;
  SoDienThoai?: string;
  Email?: string;
  AnhDaiDien?: string;
}

Customer.init({
  UserName: {
      type: DataTypes.STRING(20),
       // Sử dụng UUID cho id
      primaryKey: true,
      field: 'Ma',
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: true, // `Ten` là không bắt buộc
      field: 'password',
    },
    HovaTen: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'hovaten',
    },
    NgaySinh: {
      type: DataTypes.DATE,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'NgaySinh',
    },
    GioiTinh: {
      type: DataTypes.BOOLEAN,
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'GioiTinh',
    },
    SoDienThoai: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'sodienthoai',
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'email',
    },
    AnhDaiDien: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'anhdaidien',
    },
  
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName: "khachhang",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);



export default Customer;
 








