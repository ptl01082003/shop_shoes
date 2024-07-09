import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "customers",
  modelName: "Customers",
  timestamps: true,
})
export class Customers extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public customerId!: number;

  @Column
  public customerName!: string;

  @Column
  public customerDateOfBirth?: Date;

  @Column
  public customerSex?: boolean;

  @Column
  public customerPhoneNumber?: number;

  @Column
  public customerEmail?: string;

  @Column
  public customerImage?: string;
}
