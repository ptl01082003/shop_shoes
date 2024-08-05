import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Products } from "./Products";
import { Promotions } from "./Promotions";

@Table({
  tableName: "product_promotion",
  modelName: "ProductPromotion",
  timestamps: true,
})
export class ProductPromotion extends Model {
  @PrimaryKey
  @ForeignKey(() => Products)
  @Column
  public productId!: number;

  @PrimaryKey
  @ForeignKey(() => Promotions)
  @Column
  public promotionId!: number;

  @BelongsTo(() => Products)
  public products!: Products;

  @BelongsTo(() => Promotions)
  public promotions!: Promotions;
}
