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

export enum PAYMENT_PROVIDER {
  CASH = "CASH",
  MOMO = "MOMO",
  VN_PAY = "VN_PAY",
}

@Table({
  tableName: "payment_details",
  modelName: "PaymentDetails",
  timestamps: true,
})
export class PaymentDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public paymentDetailsId!: number;

  @ForeignKey(() => OrderDetails)
  @Column
  public orderDetailsId!: number;

  @Column
  public amount!: number;

  @Column
  public provider!: string;


  @BelongsTo(() => OrderDetails)
  public orderDetails!: OrderDetails;
}
