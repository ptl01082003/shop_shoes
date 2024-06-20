import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";

// Định nghĩa các thuộc tính của Dòng Sản Phẩm
interface PromotionAttributes {
  Ma: string;
  Ten?: string;
  Loai?: string;
  MucGiam?: Number; // khóa phụ
  NgayBatDau?: Date;
  NgayKetThuc?: Date;
  TrangThai?: boolean;
  NgayTao?: Date;
  NgayCapNhat?: Date;
}

// Một số thuộc tính không bắt buộc khi tạo Dòng Sản Phẩm
interface PromotionCreationAttributes
  extends Optional<PromotionAttributes, "Ma"> {}

class Promotion
  extends Model<PromotionAttributes, PromotionCreationAttributes>
  implements PromotionAttributes
{
  Ma!: string;
  Ten?: string;
  Loai?: string;
  MucGiam?: Number; // khóa phụ
  NgayBatDau?: Date;
  NgayKetThuc?: Date;
  TrangThai?: boolean;
  NgayTao?: Date;
  NgayCapNhat?: Date;
}

Promotion.init(
  {
    Ma: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      field: "Ma",
    },
    Ten: {
      type: DataTypes.STRING(200),
      allowNull: true,

      field: "Ten",
    },
    Loai: {
      type: DataTypes.STRING(30),
      allowNull: true,

      field: "Loai",
    },
    MucGiam: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: "Loai",
    },
    NgayBatDau: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "NgayBatDau",
      },
      NgayKetThuc: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "NgayKetThuc",
      },
      NgayTao: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "NgayTao",
      },
      NgayCapNhat: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "NgayCapNhat",
      },
      TrangThai: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "TrangThai",
      },
  },
  {
    sequelize,
    modelName: "Promotion",
    tableName: "khuyenmai",
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

// Promotion.belongsTo(Trademark, {
//   foreignKey: "ThuongHieu",
//   as: "ThuongHieuEXEC",
// });

export default Promotion;
