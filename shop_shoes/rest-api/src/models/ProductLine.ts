import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import Trademark from "../models/Trademark"; // Đảm bảo import đúng đường dẫn đến model Trademark

// Định nghĩa các thuộc tính của Dòng Sản Phẩm
interface ProductLineAttributes {
  id: string;
  Ten?: string;
  NgayTao?: Date;
  NgayCapNhat?: Date;
  ThuongHieuId?: string; // khóa phụ
}

// Một số thuộc tính không bắt buộc khi tạo Dòng Sản Phẩm
interface ProductLineCreationAttributes extends Optional<ProductLineAttributes, "id"> {}

class ProductLine extends Model<ProductLineAttributes, ProductLineCreationAttributes> implements ProductLineAttributes {
  public id!: string;
  public Ten?: string;
  public NgayTao?: Date;
  public NgayCapNhat?: Date;
  public ThuongHieuId?: string;
}

ProductLine.init(
  {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: "id",
    },
    Ten: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "ten",
    },
    NgayTao: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "ngaytao",
    },
    NgayCapNhat: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "ngaycapnhat",
    },
    ThuongHieuId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      field: "ThuongHieuId",
    },
  },
  {
    sequelize,
    modelName: "ProductLine",
    tableName: "dongsanpham",
    timestamps: false,
    // validate: {
    //   bothCoordsOrNone() {
    //     if ((this.latitude === null) !== (this.longitude === null)) {
    //       throw new Error('Either both latitude and longitude, or neither!');
    //     }
    //   },
    // },
  }
  
);

ProductLine.belongsTo(Trademark, { foreignKey: 'ThuongHieu', as: 'ThuongHieuEXEC' });

export default ProductLine;










// import { DataTypes, Model, Optional } from "sequelize";
// import sequelize from "../config/ConnectDB copy";

// import Trademark from "./Trademark";

// // Định nghĩa các thuộc tính của Thuong Hiệu
// interface ProductLineAttributes {
//   id: string;
//   Ten?: string;
//   NgayTao?: Date;
//   NgayCapNhat?: Date;
//   ThuongHieuId?: string; //// khóa phụ
// }

// // Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
// interface ProductLineCreationAttributes
//   extends Optional<ProductLineAttributes, "id"> {}

// class ProductLine
//   extends Model<ProductLineAttributes, ProductLineCreationAttributes>
//   implements ProductLineAttributes
// {
//   public id!: string;
//   public Ten?: string;
//   public NgayTao?: Date;
//   public NgayCapNhat?: Date;
//   public ThuongHieuId?: string;
// }

// ProductLine.init(
//   {
//     id: {
//       type: DataTypes.STRING(36),
//       defaultValue: DataTypes.UUIDV4, // Sử dụng UUID cho id
//       primaryKey: true,
//       field: "id",
//     },
//     Ten: {
//       type: DataTypes.STRING(200),
//       allowNull: true, // `Ten` là không bắt buộc
//       field: "ten",
//     },
//     NgayTao: {
//       type: DataTypes.DATE,
//       allowNull: false, // Có thể để null nếu không bắt buộc
//       field: "ngaytao",
//     },
//     NgayCapNhat: {
//       type: DataTypes.DATE,
//       allowNull: false, // Có thể để null nếu không bắt buộc
//       field: "ngaycapnhat",
//     },
//     ThuongHieuId: {
//       type: DataTypes.STRING(36),
//       allowNull: true, // `Ten` là không bắt buộc
//       field: "ThuongHieu",
//     },
//   },
//   {
//     sequelize,
//     modelName: "ProductLine",
//     tableName: "dongsanpham",
//     timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
//     // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
//     // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
//   }
// );
// Trademark.hasMany(ProductLine, { foreignKey: 'DongSP', as: 'DongSPEXEC' });

// export default ProductLine;
