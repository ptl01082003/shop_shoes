import {
  AutoIncrement,
  Column,
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
  public promotionId!: number;

  @Column
  public promotionName!: string;

  @Column
  public promotion!: string;
}
