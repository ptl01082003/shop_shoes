import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProductColors } from "./ProductColors";
import { Colors } from "./Colors";
import { Sizes } from "./Sizes";
import { ProductSizes } from "./ProductSizes";
import { ProductLines } from "./ProductLines";
import { Styles } from "./Styles";
import { Origins } from "./Origins";
import { Materials } from "./Materials";

@Table({
  tableName: "products",
  modelName: "Products",
  timestamps: true,
})
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productID!: number;

  @Column
  public productName!: string;

  @Column
  public productNumber?: number;

  @Column(DataType.DECIMAL(16, 2))
  public productImportPrice!: number;

  @Column(DataType.DECIMAL(16, 2))
  public productPrice?: number;

  @Column
  public status?: boolean;

  @Column
  public display?: boolean;

  @ForeignKey(() => ProductLines)
  @Column
  public productLineID?: number;

  @BelongsTo(() => ProductLines)
  public productLine?: ProductLines;

  @ForeignKey(() => Origins)
  @Column
  public originID?: number;

  @BelongsTo(() => Origins)
  public origin?: Origins;

  @ForeignKey(() => Styles)
  @Column
  public styleID?: number;

  @BelongsTo(() => Styles)
  public style?: Styles;

  @ForeignKey(() => Materials)
  @Column
  public materialID?: number;

  @BelongsTo(() => Materials)
  public material?: Materials;

  // @BelongsToMany(() => Colors, () => ProductColors)
  // public colors!: Colors[];

  @BelongsToMany(() => Sizes, () => ProductSizes)
  public size!: Sizes[];
}
