import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "promotions",
  modelName: "Promotions",
  timestamps: true,
})
export class Promotions extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public promotionID!: number;

  @Column
  public promotionName!: string;

  @Column(DataType.DOUBLE)
  public promotionDiscount!: number;

  @Column
  public startDay!: Date;

  @Column
  public endDay!: Date;

  @Column
  public!: boolean;
}
