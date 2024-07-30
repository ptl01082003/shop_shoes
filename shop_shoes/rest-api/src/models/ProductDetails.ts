import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  HasMany,
  Default,
} from "sequelize-typescript";
import { Sizes } from "./Sizes";
import { Products } from "./Products";
import { Images } from "./Images";

@Table({
  tableName: "product_details",
  modelName: "ProductDetails",
  timestamps: true,
})
export class ProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productDetailId!: number;

  @ForeignKey(() => Sizes)
  @Column
  public sizeId!: number;

  @ForeignKey(() => Products)
  @Column
  public productId!: number;

  @Default(0)
  @Column
  public sellQuanity!: number;

  @Column
  public quantity!: number;

  @Default(0)
  @Column
  public numberStatistics!: number;

  @BelongsTo(() => Sizes)
  public sizes!: Sizes;

  @BelongsTo(() => Products)
  public products!: Products;
}
