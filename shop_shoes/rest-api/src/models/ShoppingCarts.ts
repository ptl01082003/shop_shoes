import {
  AutoIncrement,
  BeforeFind,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Users } from "./Users";
import { CartItems } from "./CartItems";
import { FindOptions } from "sequelize";
import { Products } from "./Products";

@Table({
  tableName: "shopping_carts",
  modelName: "ShoppingCarts",
  timestamps: true,
})
export class ShoppingCarts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public cartId!: number;

  @ForeignKey(() => Users)
  @Column
  public userId!: number;

  @BelongsTo(() => Users)
  public users!: Users;

  @HasMany(() => CartItems, "cartId")
  public cartItems!: CartItems[];

  @Column
  public totals!: number;
}
