// import { Pool } from "./../../node_modules/mysql2/promise.d";
// import dotenv from "dotenv";
// import mysql from "mysql2/promise";
// const express = require("express");
// import { Sequelize } from 'sequelize';


// class DatabaseService {
//   private pool: any;

//   public async connect() {
//     try {
//       this.pool = await mysql.createPool({
//         host: process.env["DB_HOST"],
//         port: Number(process.env["DB_PORT"]),
//         user: process.env["DB_USER"],
//         password: process.env["DB_PASSWORD"],
//         database: process.env["DB_NAME"],
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0,
        
//       });
//       console.log("ket noi thanh cong")
//     } catch (error) {
//       console.log("loi" + error);
//     }
//   }
//   public async query(sql: string, params?: any[]) {
//     const [rows, fields] = await this.pool.query(sql, params);
//     return rows;
//   }

//   public async close() {
//     await this.pool.end();
//   }
// }

// export const databaseService = new DatabaseService();
