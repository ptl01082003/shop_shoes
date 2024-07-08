import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProductColors } from "./ProductColors";
import { Colors } from "./Colors";
import { Brands } from "./Brands";

@Table({
  tableName: "product_lines",
  modelName: "ProductLines",
  timestamps: true,
})
export class ProductLines extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productLineID!: number;

  @Column
  public productLineName!: string;

  @ForeignKey(() => Brands)
  @Column
  public brandID!: number;

  @BelongsTo(() => Brands)
  public brand!: Brands;
}
