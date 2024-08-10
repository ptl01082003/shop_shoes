import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Users } from "./Users";
import { Conversations } from "./Conversations";

@Table({
  tableName: "messages",
  modelName: "Messages",
  timestamps: true,
})
export class Messages extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public messagesId!: number;

  @ForeignKey(() => Users)
  @Column
  public userId!: number;

  @BelongsTo(() => Users)
  public users!: Users;

  @ForeignKey(() => Conversations)
  @Column
  public conversationId!: number;

  @Column(DataType.TEXT("long"))
  public contents!: number;

  @Column
  public imageUrl!: string;
}
