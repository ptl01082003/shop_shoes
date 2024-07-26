import bcrypt from "bcrypt";
import path from "path";
import { Sequelize } from "sequelize-typescript";
import { ROLE_TYPES, Roles } from "../models/Roles";
import { Users } from "../models/Users";

export async function connectDB() {
  const sequelize = new Sequelize({
    logging: false,
    dialect: "mysql",
    host: process.env["DB_HOST"],
    database: process.env["DB_NAME"],
    password: process.env["DB_PASSWORD"],
    username: process.env["DB_USER"],
    models: [path.resolve("./src/models")],
    timezone: "+07:00",
    dialectOptions: {
      timezone: "+07:00",
    },
  });

  // await Roles.create({
  //   type: ROLE_TYPES.USER,
  // });
  // await Roles.create({
  //   type: ROLE_TYPES.MEMBERSHIP,
  // });
  // await Roles.create({
  //   type: ROLE_TYPES.ADMIN,
  // });
  // await Users.create({
  //   userName: "admin",
  //   password: await bcrypt.hash("admin", 10),
  //   roleId: 3,
  // });

  await sequelize.authenticate();
  await sequelize.sync({ force: false, alter: true });
  console.log("Connection has been established successfully.");
}
