import {
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderItems } from "./OrderItems";
import { Users } from "./Users";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "order_details",
  modelName: "OrderDetails",
  timestamps: true,
})
export class OrderDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public orderDetailId!: number;

  @Column
  public totals!: number;

  @Column
  public orderCode!: string;

  @Column
  public amount!: number;

  @ForeignKey(() => Users)
  @Column
  public userId!: number;

  @BelongsTo(() => Users)
  public user!: Users;

  @HasMany(() => OrderItems)
  public orderItems!: OrderItems[];

  @BeforeCreate
  static genaratorOrderCode(instance: OrderDetails) {
    instance.orderCode = uuidv4().slice(0, 6).toUpperCase();
  }
}
