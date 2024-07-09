import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Sizes } from "./Sizes";

import { ProductLines } from "./ProductLines";
import { Styles } from "./Styles";
import { Origins } from "./Origins";
import { Materials } from "./Materials";
import { SizeColor } from "./SizeColor";
import { Product } from "./Product";

@Table({
  tableName: "product_details",
  modelName: "ProductDetails",
  timestamps: true,
})
export class ProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public pDetailID!: number;

  @Column
  public pDetailQuantity?: number;

  @Column
  public pDetailStatus?: boolean;

  @ForeignKey(() => SizeColor)
  @Column
  public sizeColorID!: number;

  @ForeignKey(() => Product)
  @Column
  public productID!: number;
}
