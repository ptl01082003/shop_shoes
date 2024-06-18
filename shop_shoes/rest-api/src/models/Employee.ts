
import sequelize  from "../config/ConnectDB copy";

interface Employee {
  VaiTro: string;
  UserName: string;
  Password: string;
  HoVaTen: string;
  NgaySinh: Date;
  GioiTinh: boolean;
  SoDienThoai: string;
  email: string;
  AnhDaiDien: string;

}

// export const getAllNhanVien = async (): Promise<Employee[]> => {
//   const rows = await sequelize.query('SELECT * FROM NhanVien');
//   return rows;
// };
