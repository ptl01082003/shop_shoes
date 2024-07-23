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
import { Styles } from "./Styles";
import { Origins } from "./Origins";
import { Materials } from "./Materials";
import { Brands } from "./Brands";
import { v4 as uuidv4 } from "uuid";
import { genaratorProductsId } from "../utils/utils";
import { Images } from "./Images";

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

  @Column
  public status?: boolean;

  @Column
  public display?: boolean;

  @ForeignKey(() => Origins)
  @Column
  public originId?: number;

  @BelongsTo(() => Origins)
  public origins?: Origins;

  @ForeignKey(() => Styles)
  @Column
  public styleId?: number;

  @BelongsTo(() => Styles)
  public styles?: Styles;

  @ForeignKey(() => Materials)
  @Column
  public materialId?: number;

  @BelongsTo(() => Materials)
  public materials?: Materials;

  @ForeignKey(() => Brands)
  @Column
  public brandID?: number;

  @BelongsTo(() => Brands)
  public brands?: Brands;

  @BeforeCreate
  static genaratorProductCode(instance: Products) {
    instance.productId = genaratorProductsId();
    const uuid = uuidv4();
    instance.code = uuid.slice(0, 6).toUpperCase();
  }
}
