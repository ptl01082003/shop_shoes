import {
    AutoIncrement,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
  } from "sequelize-typescript";
import { Users } from "./Users";
  
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

    @Column
    public totals!: number;
  }
  