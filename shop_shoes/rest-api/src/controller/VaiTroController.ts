import { NextFunction, Request, Response } from "express";
import { VaiTro } from "../models/VaiTro";



export class VaiTroController {
  public static async getAllVaiTro(req: Request, res: Response): Promise<void> {
    try {
      const vaitro = await VaiTro.findAll();
      res.json(vaitro);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
}
  
  

