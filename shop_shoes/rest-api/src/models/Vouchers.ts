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
  public vouchersId!: number;

  @Column
  public describe?: string;

  @Column
  public discountType?: string;

  @Column(DataType.DOUBLE)
  public discount?: number;

  @Column(DataType.DECIMAL(12, 2))
  public valueOder?: number;

  @Column(DataType.DECIMAL(12, 2))
  public discountMax?: number;

  @Column
  public startDay?: Date;

  @Column
  public endDay?: Date;

  @Column
  public quantity?: number;

  @Column
  public statusDelete?: boolean;

  @Column
  public formPay?: number;

  @Column
  public status?: number;

  @Column
  public objectuUse?: number;
}
