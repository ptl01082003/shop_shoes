import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Products } from "./Products";

@Table({
  tableName: "images",
  modelName: "Images",
  timestamps: true,
})
export class Images extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public imageId!: number;

  @Column
  public imagePath!: string;

  @ForeignKey(() => Products)
  @Column
  public productID?: number;

  @BelongsTo(() => Products)
  public product?: Products;
}
