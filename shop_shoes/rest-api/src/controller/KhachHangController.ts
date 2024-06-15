import fs from "fs"; 
import { NextFunction, Request, Response } from "express";
import { getAllKhachHang } from "../models/KhachHang";
import {databaseService} from "../config/ConnectDB";
export const getKHACHHANG = async (req: Request, res: Response) => {
  try {
    const vaitro = await getAllKhachHang();
    res.json(vaitro);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users', error });
  }
};
