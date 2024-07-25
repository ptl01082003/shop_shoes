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
  DataType,
} from "sequelize-typescript";
import { Products } from "../models/Products";
import { SizeProductDetails } from "../models/SizeProductDetails";
@Table({
  tableName: "product_details",
  modelName: "ProductDetails",
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  timestamps: true,
})
export class ProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productDetailId!: number;

  @Column
  public name!: string;

  @Column({
    type: DataType.TEXT("long")
  })
  public description!: string;

  @ForeignKey(() => Products)
  @Column
  public productId!: number;

  @BelongsTo(() => Products)
  public products!: Products;

  @HasMany(() => SizeProductDetails)
  sizeProductDetails!: SizeProductDetails[];
}
