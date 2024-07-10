import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";
import { SizeColor } from "./SizeColor";

@Table({
  tableName: "product_details",
  modelName: "ProductDetails",
  timestamps: true,
})
export class ProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  pDetailID!: number;

  @Column
  pDetailQuantity?: number;

  @Column
  pDetailStatus?: boolean;

  @ForeignKey(() => Product)
  @Column
  productID!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @HasMany(() => SizeColor)
  sizeColors!: SizeColor[];
}
