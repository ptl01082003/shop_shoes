import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Product } from "./Products";

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

  @ForeignKey(() => Product)
  @Column
  public productID?: number;

  @BelongsTo(() => Product)
  public product?: Product;
}
