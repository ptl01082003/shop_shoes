import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderItems } from "./OrderItems";
import { Users } from "./Users";
import { UserVouchers } from "./UserVouchers";
import { OrderDetails } from "./OrderDetails";

export enum Vouchers_TYPE {
  MONEY = "MONEY",
  PERCENT = "PERCENT",
}

export enum Vouchers_STATUS {
  ISACTIVE = "ISACTIVE",
  EXPIRED = "EXPIRED",
  UNUSED = "UNUSED",
}

export enum Voucher_RULE {
  MIN_ORDER_VALUE = "MIN_ORDER_VALUE",
  VALID_PRODUCTS = "VALID_PRODUCTS",
  USER_LEVEL = "USER_LEVEL",
  ORDER_COUNT = "ORDER_COUNT",
}

@Table({
  tableName: "vouchers",
  modelName: "Vouchers",
  timestamps: true,
})
export class Vouchers extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public voucherId!: number;

  @Column
  public code!: string;

  @Column(DataType.TEXT("long"))
  public description?: string;

  @Column(DataType.DECIMAL(16, 2))
  public valueOrder!: number;

  @Column(DataType.DECIMAL(16, 2))
  public discountMax!: number;

  @Column(DataType.DATE)
  public startDay!: string;

  @Column(DataType.DATE)
  public endDay!: string;

  @Column
  public quantity!: number;

  @Default(Vouchers_STATUS.ISACTIVE)
  @Column
  public status?: string;

  @Default(Vouchers_TYPE.MONEY)
  @Column
  public typeValue?: string;

  @Column
  public ruleType?: string;

  @Column(DataType.DECIMAL(16, 2))
  public minOrderValue?: number;

  @Column(DataType.JSON)
  public validProducts?: number[];

  @Column
  public userLevel?: string;

  @Column
  public minOrderCount?: number;

  @Column
  public maxOrderCount?: number;

  @Column
  public productId!: number;

  @HasMany(() => UserVouchers)
  public userVouchers!: UserVouchers[];

  @HasMany(() => OrderDetails)
  public orderDetails!: OrderDetails[];
}
