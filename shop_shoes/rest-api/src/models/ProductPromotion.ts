import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Product } from "./Products";
import { Promotions } from "./Promotions";

@Table({
  tableName: "product_promotion",
  modelName: "ProductPromotion",
  timestamps: true,
})
export class ProductPromotion extends Model {
  @ForeignKey(() => Product)
  @Column
  public productID!: number;

  @ForeignKey(() => Promotions)
  @Column
  public promotionID!: number;

  @BelongsTo(() => Product)
  public product!: Product;

  @BelongsTo(() => Promotions)
  public promotion!: Promotions;
}
