// productdetails.model.ts
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Products } from "../models/Products";
import { SizeProductDetails } from "../models/SizeProductDetails";

@Table
export class ProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productDetailid!: number;

  @Column
  public productDetailname!: string;

  @Column
  public productDetaildescription!: string;

  @ForeignKey(() => Products)
  @Column
  public productId!: number;

  @BelongsTo(() => Products)
  public product!: Products;

  @HasMany(() => SizeProductDetails)
  sizeProductDetails!: SizeProductDetails[];
}
