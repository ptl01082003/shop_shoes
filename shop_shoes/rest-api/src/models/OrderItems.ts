import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderDetails } from "./OrderDetails";
import { Products } from "./Products";

@Table({
  tableName: "order_items",
  modelName: "OrderItems",
  timestamps: true,
})
export class OrderItems extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public orderItemsId!: number;

  @Column
  public quanity!: number;

  @ForeignKey(() => Products)
  @Column
  public productsID!: number;

  @ForeignKey(() => OrderDetails)
  @Column
  public orderDetailsId!: number;

  @BelongsTo(() => Products)
  public product!: Products;

}
