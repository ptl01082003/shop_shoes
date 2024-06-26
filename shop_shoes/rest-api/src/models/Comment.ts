
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/ConnectDB copy";
import { Product } from "./Product";
import OrderDetails from "./OrderDetails";

// Định nghĩa các thuộc tính của Thuong Hiệu
interface CommentAttributes {
  id: string;
  Rating?: number;
  TieuDe?: string;
  NoiDung?: string;
  ThoiGian?: Date;
  ChiTietDonHang?: string;
  PheDuyet?: boolean;
  DaChinhSua?: boolean;
}

// Một số thuộc tính không bắt buộc khi tạo Thuong Hiệu
interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
   public id!: string;
   public Rating?: number;
   public TieuDe?: string;
   public noidung?: string;
   public thoigian?: Date;
   public chiTietDonHang?: string;
   public pheDuyet?: boolean;
   public daChinhSua?: boolean;
}

Comment.init({
    id: {
      type: DataTypes.STRING(255),
     defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      field: 'id',
    },
    Rating: {
      type: DataTypes.FLOAT,
      allowNull: true, // `Ten` là không bắt buộc
      field: 'rating',
    },
    TieuDe: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'tieude',
    },
    NoiDung: {
      type: DataTypes.STRING(255),
      allowNull: true, // Có thể để null nếu không bắt buộc
      field: 'noidung',
    },
    ThoiGian: {
        type: DataTypes.DATE,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: 'thoigian',
      },
      ChiTietDonHang: {
        type: DataTypes.STRING(50),
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: 'chiTietDonHang',
      },
      PheDuyet: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: 'pheDuyet',
      },
      DaChinhSua: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Có thể để null nếu không bắt buộc
        field: 'daChinhSua',
      },
  
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: "nhanxet",
    timestamps: false, // Không  Cho phép Sequelize sử dụng các cột createdAt và updatedAt
    // createdAt: 'createdAt', // Tên cột createdAt trong cơ sở dữ liệu
    // updatedAt: 'updatedAt', // Tên cột updatedAt trong cơ sở dữ liệu
  }
);

Comment.belongsTo(OrderDetails, { foreignKey: "ChiTietDonHang", as: "ChiTietDonHangEXEC" });


export default Comment;
 