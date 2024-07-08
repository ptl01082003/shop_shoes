import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "colors",
  modelName: "Colors",
  timestamps: true,
})
export class Colors extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public colorId!: number;

  @Column
  public colorName!: string;
}
