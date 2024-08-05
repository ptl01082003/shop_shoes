// models/Sizes.ts
import {
  Column,
  Model,
  PrimaryKey,
  Table,
  HasMany,
  AutoIncrement,
} from "sequelize-typescript";
import { ProductDetails } from "./ProductDetails";

@Table({
  tableName: "sizes",
  modelName: "Sizes",
  timestamps: true,
})
export class Sizes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  sizeId!: number;

  @Column
  name!: number;
}
