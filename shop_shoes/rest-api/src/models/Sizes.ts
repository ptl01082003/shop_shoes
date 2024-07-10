import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProductDetails } from "./ProductDetails";

@Table({
  tableName: "sizes",
  modelName: "Sizes",
  timestamps: true,
})
export class Sizes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  sizeID!: number;

  @Column
  sizeName!: string;

  @Column
  sizeQuantity?: number;

  @ForeignKey(() => ProductDetails)
  @Column
  productDetailID!: number; // Khóa ngoại đến chi tiết sản phẩm

  @BelongsTo(() => ProductDetails)
  productDetail!: ProductDetails;
}
