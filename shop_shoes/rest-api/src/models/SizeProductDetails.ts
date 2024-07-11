// models/SizeProductDetails.ts
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
import { Sizes } from "./Sizes";

@Table({
  tableName: "size_product_details",
  modelName: "SizeProductDetails",
  timestamps: true,
})
export class SizeProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  sizeProductDetailID!: number;

  @ForeignKey(() => Sizes)
  @Column
  sizeID!: number;

  @ForeignKey(() => ProductDetails)
  @Column
  productDetailID!: number;

  @Column
  quantity!: number;

  @BelongsTo(() => Sizes)
  size!: Sizes;

  @BelongsTo(() => ProductDetails)
  productDetail!: ProductDetails;
}
