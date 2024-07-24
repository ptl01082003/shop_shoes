import {
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { genaratorProductsId } from "../utils/utils";
import { Brands } from "./Brands";
import { Materials } from "./Materials";
import { Origins } from "./Origins";
import { Styles } from "./Styles";
import { DataTypes } from "sequelize";

@Table({
  tableName: "products",
  modelName: "Products",
  timestamps: true,
})
export class Products extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productId!: number;

  @Column
  public name!: string;

  @Column(DataType.STRING(6))
  public code!: string;

  @Column(DataType.DECIMAL(16, 2))
  public importPrice!: number;

  @Column(DataType.DECIMAL(16, 2))
  public price?: number;

  @Column({
    type: DataTypes.BOOLEAN
  })
  public status?: boolean;

  @Column
  public display?: boolean;

  @ForeignKey(() => Origins)
  @Column
  public originId?: number;

  @BelongsTo(() => Origins)
  public origin?: Origins;

  @ForeignKey(() => Styles)
  @Column
  public styleId?: number;

  @BelongsTo(() => Styles)
  public style?: Styles;

  @ForeignKey(() => Materials)
  @Column
  public materialId?: number;

  @BelongsTo(() => Materials)
  public material?: Materials;

  @ForeignKey(() => Brands)
  @Column
  public brandId?: number;

  @BelongsTo(() => Brands)
  public brand?: Brands;

  @BeforeCreate
  static genaratorProductCode(instance: Products) {
    const uuid = uuidv4();
    instance.productId = genaratorProductsId();
    instance.code = uuid.slice(0, 6).toUpperCase();
  }
}
