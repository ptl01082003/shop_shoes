import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export enum Vouchers_TYPE {
  MONEY = "MONEY",
  PERCENT = "PERCENT",
}

export enum Vouchers_STATUS {
  ISACTIVE = "ISACTIVE",
  EXPIRED = "EXPIRED",
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
  public vouchersId!: number;

  @Column
  public code!: string;

  @Column(DataType.TEXT("long"))
  public description?: string;

  @Column(DataType.DECIMAL(16, 2))
  public valueOrder!: number;

  @Column(DataType.DECIMAL(16, 2))
  public disscoutMax!: number;

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
  public productId!: number;
}
