import {
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";
import { Sizes } from "../models/Sizes";

@Table({
  tableName: "product_size",
  modelName: "ProductSizes",
  timestamps: true,
})
export class ProductSizes extends Model {
  @ForeignKey(() => Product)
  @Column
  public productID!: number;

  @ForeignKey(() => Sizes)
  @Column
  public sizeID!: number;
}
