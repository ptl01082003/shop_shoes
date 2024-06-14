import { Query } from './../../node_modules/mysql2/typings/mysql/index.d';
// const db = require('ConnectDB');
// const VaiTro  = function (vaitro) {
//     this.Ma = vaitro.Ma;
//     this.Ten = vaitro.Ten;
    
// }



// VaiTro.getall = function name(params) {
    
// }

import {databaseService} from "../config/ConnectDB";

interface VaiTro {
  Ma: string;
  Ten: string;
}

export const getAllVaiTro = async (): Promise<VaiTro[]> => {
  const rows = await databaseService.query('SELECT * FROM vaitro');
  return rows;
};
