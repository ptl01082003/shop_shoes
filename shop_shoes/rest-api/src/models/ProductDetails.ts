// models/ProductDetails.ts
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  HasMany,
  AutoIncrement,
} from "sequelize-typescript";
import { Products } from "./Products";

import { SizeProductDetails } from "./SizeProductDetails";

@Table({
  tableName: "product_details",
  modelName: "ProductDetails",
  timestamps: true,
})
export class ProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  productDetailID!: number;
  @Column
  productDetailstatus!: boolean;

  @ForeignKey(() => Products)
  @Column
  productID!: number;

  @HasMany(() => SizeProductDetails)
  sizeProductDetails!: SizeProductDetails[];

  @BelongsTo(() => Products)
  product!: Products;
}
