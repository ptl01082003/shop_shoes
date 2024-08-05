import {
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderDetails } from "./OrderDetails";
import { ProductDetails } from "./ProductDetails";

export enum ODER_STATUS {
  CHO_THANH_TOAN = "CHO_THANH_TOAN",
  CHO_LAY_HANG = "CHO_LAY_HANG",
  CHO_GIAO_HANG = "CHO_GIAO_HANG",
  KHONG_DU_SO_LUONG = "KHONG_DU_SO_LUONG",
  DA_GIAO = "DA_GIAO",
}

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

  @Default(ODER_STATUS.CHO_THANH_TOAN)
  @Column
  public status!: string;

  @Column
  public userId!: number;
  
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
