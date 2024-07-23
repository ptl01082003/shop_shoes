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
  public orderItemId!: number;

  @Column
  public quanity!: number;

  @ForeignKey(() => Products)
  @Column
  public productId!: number;

  @ForeignKey(() => OrderDetails)
  @Column
  public orderDetailId!: number;

  @BelongsTo(() => Products)
  public products!: Products;

  @BelongsTo(() => OrderDetails)
  public orderDetails!: OrderDetails;
}
