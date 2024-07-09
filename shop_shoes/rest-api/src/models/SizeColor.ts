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
import { Sizes } from "./Sizes";

@Table({
  tableName: "size_color",
  modelName: "SizeColor",
  timestamps: true,
})
export class SizeColor extends Model {
  @ForeignKey(() => Sizes)
  @Column
  public sizeID!: number;

  @ForeignKey(() => Colors)
  @Column
  public colorID!: number;

  @BelongsTo(() => Sizes)
  public size!: Sizes;

  @BelongsTo(() => Colors)
  public color!: Colors;
}
