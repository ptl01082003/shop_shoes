import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import Trademark from "../models/Trademark"; // Đảm bảo import đúng đường dẫn đến model Trademark

// Định nghĩa các thuộc tính của Dòng Sản Phẩm
interface PromotionProductAttributes {
  KhuyenMai: string;
  SanPham: string; // khóa phụ
}

// Một số thuộc tính không bắt buộc khi tạo Dòng Sản Phẩm
interface PromotionProductCreationAttributes
  extends Optional<PromotionProductAttributes, "SanPham" | "KhuyenMai"> {}

class PromotionProduct
  extends Model<PromotionProductAttributes, PromotionProductCreationAttributes>
  implements PromotionProductAttributes
{
  public KhuyenMai!: string;
  public SanPham!: string;
}

PromotionProduct.init(
  {
    KhuyenMai: {
      type: DataTypes.STRING(36),
      allowNull:false,
      primaryKey: true,
      field: "KhuyenMai",
    },
    SanPham: {
        type: DataTypes.STRING(50),
        allowNull:false,
        primaryKey: true,
        field: "SanPham",
      },

    
  },
  {
    sequelize,
    modelName: "PromotionProduct",
    tableName: "khuyenmai_sanpham",
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

// PromotionProduct.belongsTo(Trademark, {
//   foreignKey: "ThuongHieu",
//   as: "ThuongHieuEXEC",
// });

export default PromotionProduct;
