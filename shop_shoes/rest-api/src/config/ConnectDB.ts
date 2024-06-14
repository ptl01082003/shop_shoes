import { Pool } from "./../../node_modules/mysql2/promise.d";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
const express = require("express");

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'shopping_web',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Kết nối không thành công: ' + err.stack);
// //     return;
// //   }
// //   console.log('connected as id ' + connection.threadId);
// // });
// export const databaseService = new DatabaseService();
// export default DBCN = new ();

// const app = express();
// const port = 3001;

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'shopping_web'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Kết nối không thành công: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });

// app.get('/api/data', (req, res) => {
//   connection.query('SELECT * FROM vaitro', (error, results) => {
//     if (error) throw error;
//     res.send(results);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// var connection = mysql.createConnection('mysql://root:123456@host/shopping_web?charset=BIG5_CHINESE_CI&timezone=-0700');

// connection.connect((err) => {
//      if (err) {
//       console.error('Kết nối không thành công: ' + err.stack);
//       return;
//     }
//     console.log('connected as id ' + connection.threadId);
// }
class DatabaseService {
  private pool: any;

  public async connect() {
    try {
      this.pool = await mysql.createPool({
        host: process.env["DB_HOST"],
        port: Number(process.env["DB_PORT"]),
        user: process.env["DB_USER"],
        password: process.env["DB_PASSWORD"],
        database: process.env["DB_NAME"],
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    } catch (error) {
      console.log("loi" + error);
    }
  }
  public async query(sql: string, params?: any[]) {
    const [rows, fields] = await this.pool.query(sql, params);
    return rows;
  }

  public async close() {
    await this.pool.end();
  }
}

export const databaseService = new DatabaseService();
