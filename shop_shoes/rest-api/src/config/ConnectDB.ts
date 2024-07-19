import path from "path";
import { Sequelize } from "sequelize-typescript";

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
  await sequelize.sync({ force: true });
  console.log("Connection has been established successfully.");
}
