import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Sizes } from "./Sizes";
import { Colors } from "./Colors";
import { ProductDetails } from "./ProductDetails";

@Table({
  tableName: "size_color",
  modelName: "SizeColor",
  timestamps: true,
})
export class SizeColor extends Model {
  @ForeignKey(() => Sizes)
  @Column
  sizeID!: number;

  @ForeignKey(() => Colors)
  @Column
  colorID!: number;

  @ForeignKey(() => ProductDetails)
  @Column
  productDetailID!: number;

  @BelongsTo(() => Sizes)
  public size!: Sizes;

  @BelongsTo(() => Colors)
  public color!: Colors;

  @BelongsTo(() => ProductDetails)
  public productDetail!: ProductDetails;
}
