import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export enum PROMOTIONS_STATUS {
  PRE_START = "PRE_START",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
}

@Table({
  tableName: "promotions",
  modelName: "Promotions",
  timestamps: true,
})
export class Promotions extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public promotionId!: number;

  @Column
  public name!: string;

  @Column //(DataType.DECIMAL(16, 2))
  public discountPrice!: number;

  @Column(DataType.DATE)
  public startDay?: string;

  @Column(DataType.DATE)
  public endDay?: string;

  @Default(PROMOTIONS_STATUS.PRE_START)
  @Column(DataType.STRING) // Bạn có thể cần DataType.STRING hoặc kiểu khác tùy vào cấu hình cơ sở dữ liệu của bạn.
  public status?: PROMOTIONS_STATUS;

  @Column
  public productId!: number;
}
