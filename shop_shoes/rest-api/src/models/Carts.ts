import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProductDetails } from "./ProductDetails";
import { Customers } from "./Customers";

@Table({
  tableName: "carts",
  modelName: "Carts",
  timestamps: true,
})
export class Carts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public cartID!: number;

  @Column
  public cartQuantity!: number;

  @ForeignKey(() => ProductDetails)
  @Column
  public productDetailsID?: number;

  @BelongsTo(() => ProductDetails)
  public productDetails?: ProductDetails;

  @ForeignKey(() => Customers)
  @Column
  public customerID?: number;

  @BelongsTo(() => Customers)
  public customer?: Customers;
}
