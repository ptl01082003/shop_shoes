
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";


// Định nghĩa các thuộc tính của Thuong Hiệu
interface CustomerVouchersAttributes {
   Voucher: string;
   KhachHang: string;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface CustomerVouchersCreationAttributes extends Optional<CustomerVouchersAttributes, "Voucher" |"KhachHang" > {}

class CustomerVouchers extends Model<CustomerVouchersAttributes, CustomerVouchersCreationAttributes> implements CustomerVouchersAttributes {
    Voucher!: string;
    KhachHang!: string;
}

CustomerVouchers.init({
    Voucher: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      field: 'voucher',
    },
    KhachHang: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        field: 'khachhang',
      },
   
  
  },
  {
    sequelize,
    modelName: 'CustomerVouchers',
    tableName: "voucherkhachhang",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);



export default CustomerVouchers;
 








