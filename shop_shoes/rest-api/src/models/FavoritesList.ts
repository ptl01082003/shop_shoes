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
import { Customers } from "./Customers";

@Table({
  tableName: "favorites_list",
  modelName: "FavoritesList",
  timestamps: true,
})
export class FavoritesList extends Model {
  @ForeignKey(() => Products)
  @Column
  public productID!: number;

  @ForeignKey(() => Customers)
  @Column
  public customerID!: number;

  @BelongsTo(() => Products)
  public product!: Products;

  @BelongsTo(() => Customers)
  public customer!: Customers;
}
