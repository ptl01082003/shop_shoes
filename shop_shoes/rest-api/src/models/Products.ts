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

import { genaratorProductsId } from "../utils/utils";
import { Brands } from "./Brands";

@Table({
  tableName: "products",
  modelName: "Products",
  timestamps: true,
})
export class Products extends Model {
  @PrimaryKey
  @Column
  public productsID!: number;

  @Column
  public productCode!: string;

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
  static genaratorUserId(instance: Products) {
    instance.productsID = genaratorProductsId();
  }
  @BeforeCreate
  static generateProductCode(instance: Products) {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Số ngẫu nhiên 4 chữ số
    instance.productCode = `SP${randomNum}`;
  }
}
