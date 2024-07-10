import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "roles",
  modelName: "Roles",
  timestamps: true,
})
export class Roles extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Column
  public type!: string;
}
