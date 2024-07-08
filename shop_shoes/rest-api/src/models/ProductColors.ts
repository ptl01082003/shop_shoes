// models/ProductColors.ts
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";
import { Colors } from "./Colors";

@Table({
  tableName: "product_colors",
  modelName: "ProductColors",
  timestamps: true,
})
export class ProductColors extends Model {
  @ForeignKey(() => Product)
  @Column
  public productID!: number;

  @ForeignKey(() => Colors)
  @Column
  public colorID!: number;

  @BelongsTo(() => Product)
  public product!: Product;

  @BelongsTo(() => Colors)
  public color!: Colors;
}
