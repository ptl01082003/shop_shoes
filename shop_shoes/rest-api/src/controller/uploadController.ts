import fs from "fs"; 
import { NextFunction, Request, Response } from "express";
import { getAllVaiTro } from "../models/VaiTro";

export const getVAITRO = async (req: Request, res: Response) => {
  try {
    const users = await getAllVaiTro();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users', error });
  }
};

 const uploadController = {
  single: async (req: Request, res: Response, next: NextFunction) => {
    try {
      
    } catch (error) {
      next(error);
    }
  },
  multiple: async (req: any, res: Response, next: NextFunction) => {
    try {
      const data = req.files.map((image: any) => image.path.replaceAll("\\", "/"));
      return res.json({ data, code: 0, message: "Thực hiện thành công" });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.path.forEach((path: any) => {
            fs.unlinkSync(path)
        } )
        res.json({ message: "delete path" });
    } catch (error) {
      next(error);
    }
  },
};

export default uploadController;