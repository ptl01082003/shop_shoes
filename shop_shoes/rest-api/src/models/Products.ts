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
  public productsID!: number;

  @Column
  public productsName!: string;

  @Column(DataType.STRING(6))
  public productCode!: string;

  @Column(DataType.DECIMAL(16, 2))
  public productImportPrice!: number;

  @Column(DataType.DECIMAL(16, 2))
  public productPrice?: number;

  @Column
  public status?: boolean;

  @Column
  public display?: boolean;

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

  @ForeignKey(() => Brands)
  @Column
  public brandID?: number;

  @BelongsTo(() => Brands)
  public brand?: Brands;

  @BeforeCreate
  static genaratorProductCode(instance: Products) {
    instance.productsID = genaratorProductsId();
    const uuid = uuidv4();
    instance.productCode = uuid.slice(0, 6).toUpperCase();
  }
}
