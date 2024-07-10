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
import { SizeColor } from "./SizeColor";
import { Products } from "./Products";

@Table({
  tableName: "product_details",
  modelName: "ProductDetails",
  timestamps: true,
})
export class ProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  productDetailsId!: number;

  @Column
  status?: boolean;

  @ForeignKey(() => Products)
  @Column
  productID!: number;

  @BelongsTo(() => Products)
  products!: Products;

  @HasMany(() => SizeColor)
  sizeColors!: SizeColor[];
}
