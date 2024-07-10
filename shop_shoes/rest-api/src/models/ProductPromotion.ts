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
  @ForeignKey(() => Products)
  @Column
  public productID!: number;

  @ForeignKey(() => Promotions)
  @Column
  public promotionID!: number;

  @BelongsTo(() => Products)
  public product!: Products;

  @BelongsTo(() => Promotions)
  public promotion!: Promotions;
}
