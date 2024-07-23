import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { Sizes } from "./Sizes";
import { ProductDetails } from "./ProductDetails";

@Table({
  tableName: "size_product_details",
  modelName: "SizeProductDetails",
  timestamps: true,
})
export class SizeProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @ForeignKey(() => Sizes)
  @Column
  public sizeID!: number;

  @ForeignKey(() => ProductDetails)
  @Column
  public productDetailId!: number;

  @Column
  public quantity!: number;

  @BelongsTo(() => Sizes)
  public size!: Sizes;

  @BelongsTo(() => ProductDetails)
  public productDetail!: ProductDetails;
}
