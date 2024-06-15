import { NextFunction } from 'express';
import { Query } from 'mysql2';


import {databaseService} from "../config/ConnectDB";

export class KhachHang {
 public UserName: string;
 public Password: string;
 public HovaTen: string;
 public NgaySinh: Date;
 public GioiTinh: Boolean;
 public SoDienThoai: string;
 public Email: string;
 public AnhDaiDien: string;


constructor(
  UserName: string, 
  Password: string,
  HovaTen: string, 
  NgaySinh: Date,
  GioiTinh: Boolean, 
  SoDienThoai: string,
  Email: string, 
  AnhDaiDien: string
) {
  this.UserName = UserName;
  this.Password = Password;
  this.HovaTen = HovaTen;
  this.NgaySinh = NgaySinh;
  this.GioiTinh = GioiTinh;
  this.SoDienThoai = SoDienThoai;
  this.Email = Email;
  this.AnhDaiDien = AnhDaiDien;

}

public static async findAll(): Promise<KhachHang[]> {
  const sql = 'SELECT * FROM KhachHang';
  const rows = await databaseService.query(sql);
  return rows.map((row: any) => new KhachHang( 
                                            row.UserName, 
                                            row.Password,
                                            row.HovaTen, 
                                            row.NgaySinh,  
                                            row.GioiTinh, 
                                            row.SoDienThoai,
                                            row.Email, 
                                            row.AnhDaiDien,
                                       ));
}




async getItemById(id: number): Promise<KhachHang | null> {
  const [rows] = await databaseService.query('SELECT * FROM items WHERE id = ?', [id]);
  if (rows.length) {
    return rows[0] as KhachHang;
  }
  return null;
}

async createItem(name: string, description: string): Promise<number> {
  const [result] = await databaseService.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
  return (result as any).insertId;
}

async updateItem(id: number, name: string, description: string): Promise<void> {
  await databaseService.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
}

async deleteItem(id: number): Promise<void> {
  await databaseService.query('DELETE FROM items WHERE id = ?', [id]);
}

















}






