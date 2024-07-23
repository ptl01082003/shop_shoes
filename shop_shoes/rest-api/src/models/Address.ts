import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Users } from "./Users";

@Table({
  tableName: "address",
  modelName: "Address",
  timestamps: true,
})
export class Address extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public addressId!: number;

  @Column
  public cityCode!: number;

  @Column
  public wardCode!: number;

  @Column
  public districtCode!: number;

  @Column
  public cityName!: string;

  @Column
  public wardName!: string;

  @Column
  public districtName!: string;

  @Column
  public email!: string;

  @Column
  public phoneNumber!: number;

  @Column
  public recipientName!: string;

  @Column
  public defaults!: string;

  @ForeignKey(() => Users)
  @Column
  public customerID?: number;

  @BelongsTo(() => Users)
  public customers?: Users;
}
