import {
  BeforeCreate,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Roles } from "./Roles";
import { generateUniqueUserId } from "../utils/utils";

@Table({
  tableName: "users",
  modelName: "Users",
  timestamps: true,
})
export class Users extends Model {
  @PrimaryKey
  @Column
  public userId!: number;

  @Column
  public userName!: string;

  @Column
  public email!: string;

  @Column
  public phone!: string;

  @Column
  public password!: string;

  @ForeignKey(() => Roles)
  @Default(1)
  @Column
  public rolesId!: string;

  @Column
  public fullName!: string;

  @BeforeCreate
  static genaratorUserId(instance: Users) {
    instance.userId = generateUniqueUserId();
  }

  @Column({
    type: DataType.DATE,
  })
    
  public birth?: string;

}
