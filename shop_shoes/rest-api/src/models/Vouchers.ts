import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

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
  public voucherDescribe?: string;

  @Column
  public voucherDiscountType?: string;

  @Column(DataType.DOUBLE)
  public voucherDiscount?: number;

  @Column(DataType.DECIMAL(12, 2))
  public voucherValueOder?: number;

  @Column(DataType.DECIMAL(12, 2))
  public voucherDiscountMax?: number;

  @Column
  public voucherStartDay?: Date;

  @Column
  public voucherEndDay?: Date;

  @Column
  public voucherQuantity?: number;

  @Column
  public voucherStatusDelete?: boolean;

  @Column
  public voucherFormPay?: number;

  @Column
  public voucherStatus?: number;

  @Column
  public voucherObjectuUse?: number;
}
