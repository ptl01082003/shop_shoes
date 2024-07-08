import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "styles",
  modelName: "Styles",
  timestamps: true,
})
export class Styles extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public styleID!: number;

  @Column
  public styleName!: string;
}
