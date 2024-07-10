import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Customers } from "./Customers";

@Table({
  tableName: "address",
  modelName: "Address",
  timestamps: true,
})
export class Address extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public addressID!: number;

  @Column
  public addressCityCode!: number;

  @Column
  public addressWardCode!: number;

  @Column
  public addressDistrictCode!: number;

  @Column
  public addressCityName!: string;

  @Column
  public addressWardName!: string;

  @Column
  public addressDistrictName!: string;

  @Column
  public addressEmail!: string;

  @Column
  public addressPhoneNumber!: number;

  @Column
  public addresRecipientName!: string;

  @Column
  public addresDefault!: string;

  @ForeignKey(() => Customers)
  @Column
  public customersID?: number;

  @BelongsTo(() => Customers)
  public customer?: Customers;
}
