import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Users } from "./Users";
import { Messages } from "./Messages";

@Table({
  tableName: "conversations",
  modelName: "Conversations",
  timestamps: true,
})
export class Conversations extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public conversationId!: number;

  @ForeignKey(() => Users)
  @Column
  public senderId!: number;

  @BelongsTo(() => Users)
  public sender!: Users;

  @ForeignKey(() => Users)
  @Column
  public receiverId!: number;

  @BelongsTo(() => Users)
  public receiver!: Users;

  @HasMany(() => Messages)
  public messages!: Messages[];
}
