
import {databaseService} from "../config/ConnectDB";

interface NhanVien {
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

export const getAllNhanVien = async (): Promise<NhanVien[]> => {
  const rows = await databaseService.query('SELECT * FROM NhanVien');
  return rows;
};
