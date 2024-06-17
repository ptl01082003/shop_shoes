import fs from "fs"; 
import { NextFunction, Request, Response } from "express";
import { getAllNhanVien } from "../models/NhanVien";

export const getNHANVIEN = async (req: Request, res: Response) => {
  try {
    const vaitro = await getAllNhanVien();
    res.json(vaitro);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users', error });
  }
};
