import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { OrderItems } from "./OrderItems";
import { Users } from "./Users";
import { OrderDetails } from "./OrderDetails";

@Table({
  tableName: "payment_details",
  modelName: "PaymentDetails",
  timestamps: true,
})
export class PaymentDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public orderDetailsId!: number;

  @ForeignKey(() => OrderDetails)
  @Column
  public userId!: number;

  @Column
  public status!: number;

  @Column
  public totals!: number;

  @BelongsTo(() => Users)
  public users!: Users;

  @HasMany(() => OrderItems, "orderItemsId")
  public orderItems!: OrderItems[];

}
