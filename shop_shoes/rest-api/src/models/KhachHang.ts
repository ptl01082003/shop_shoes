import { NextFunction } from 'express';
import { Query } from 'mysql2';


import {databaseService} from "../config/ConnectDB";

export class KhachHang {
 public UserName: string;
 public Password: string;
 public HovaTen: string;
 public NgaySinh: Date;
 public GioiTinh: boolean;
 public SoDienThoai: string;
 public Email: string;
 public AnhDaiDien: string;


constructor(
  UserName: string, 
  Password: string,
  HovaTen: string, 
  NgaySinh: Date,
  GioiTinh: boolean, 
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



}













