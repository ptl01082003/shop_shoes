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
import { ShoppingCarts } from "./ShoppingCarts";

@Table({
  tableName: "cart_items",
  modelName: "CartItems",
  timestamps: true,
})
export class CartItems extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public cartItemsID!: number;

  @ForeignKey(() => Products)
  @Column
  public productsID!: number;

  @ForeignKey(() => ShoppingCarts)
  @Column
  public cartId!: number;

  @BelongsTo(() => Products)
  public product!: Products;

  @BelongsTo(() => ShoppingCarts)
  public carts!: ShoppingCarts;


  @Column
  public quanity!: number;
}
