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
import { ProductDetails } from "./ProductDetails";

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
  public amount!: number;
  
  @Column
  public quanity!: number;

  @ForeignKey(() => ProductDetails)
  @Column
  public productDetailId!: number;

  @ForeignKey(() => OrderDetails)
  @Column
  public orderDetailId!: number;

  @BelongsTo(() => ProductDetails)
  public productDetails!: ProductDetails;

  @BelongsTo(() => OrderDetails)
  public orderDetails!: OrderDetails;
  
}
