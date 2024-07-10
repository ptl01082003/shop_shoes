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
import { Products } from "./Products";
import { Sizes } from "./Sizes";

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

  @ForeignKey(() => Products)
  @Column
  productID!: number;

  @BelongsTo(() => Products)
  product!: Products;

  @HasMany(() => Sizes)
  sizes!: Sizes[];
}
