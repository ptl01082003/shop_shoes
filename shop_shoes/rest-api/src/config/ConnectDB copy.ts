import { Pool } from "./../../node_modules/mysql2/promise.d";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
const express = require("express");
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
 'datn',
 'root',
 '123456',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
export default sequelize;