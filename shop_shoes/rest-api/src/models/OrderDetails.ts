import {
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { OrderItems } from "./OrderItems";
import { Users } from "./Users";

@Table({
    tableName: "order_details",
    modelName: "OrderDetails",
    timestamps: true,
})
export class OrderDetails extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    public orderDetailsId!: number;

    @ForeignKey(() => Users)
    @Column
    public userId!: number;

    @Column
    public status!: number;

    @Column
    public totals!: number;

    @BelongsTo(() => Users)
    public users!: Users;

    @HasMany(() => OrderItems, "orderItemsId")
    public orderItems!: OrderItems[];

}
