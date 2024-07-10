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

import { ProductLines } from "./ProductLines";
import { Styles } from "./Styles";
import { Origins } from "./Origins";
import { Materials } from "./Materials";
import { Colors } from "./Colors";

@Table({
  tableName: "products",
  modelName: "Products",
  timestamps: true,
})
export class Products extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productsID!: number;

  @Column
  public productsName!: string;

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

  @ForeignKey(() => Colors)
  @Column
  public colorID?: number;

  @BelongsTo(() => Colors)
  public color?: Colors;
}
