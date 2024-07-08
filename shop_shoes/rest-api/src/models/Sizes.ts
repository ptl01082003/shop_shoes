import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "size",
  modelName: "Sizes",
  timestamps: true,
})
export class Sizes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public sizeID!: number;

  @Column
  public sizeLength!: string;
}