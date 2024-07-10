import {
  ForeignKey,
  Column,
  Model,
  Table,
  PrimaryKey,
} from "sequelize-typescript";
import { Vouchers } from "./Vouchers";
import { Customers } from "./Customers";

@Table({
  tableName: "voucher_customer",
  modelName: "VoucherCustomer",
  timestamps: true,
})
export class VoucherCustomer extends Model {
  @PrimaryKey
  @ForeignKey(() => Vouchers)
  @Column
  voucherId!: number;

  @PrimaryKey
  @ForeignKey(() => Customers)
  @Column
  customerId!: number;
}
