import path from "path";
import { Sequelize } from "sequelize-typescript";
import { Colors } from "../models/Colors";
import { Product } from "../models/Product";

export async function connectDB() {
  const sequelize = new Sequelize({
    logging: true,
    dialect: "mysql",
    host: process.env["DB_HOST"],
    database: process.env["DB_NAME"],
    password: process.env["DB_PASSWORD"],
    username: process.env["DB_USER"],
    models: [path.resolve("./src/models")],
  });
  await sequelize.authenticate();
  await sequelize.sync({ force: false });
  // const a = await Product.findOne({
  //   where: { productID: 7 },
  //   include: [
  //     {
  //       model: Colors,
  //       through: { attributes: [] },
  //       attributes: ["colorName"],
  //     },
  //   ],
  // });
  // console.log("sản phẩm:: ", JSON.stringify(a));
  console.log("Connection has been established successfully.");
}
