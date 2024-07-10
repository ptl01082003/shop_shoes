import { NextFunction, Request, Response } from "express";

const CartsController = {
  add: async (req: Request, res: Response, next: NextFunction) => {
    res.json({message: req.userId});
    try {
    } catch (error) {
      next(error);
    }
  },
};

export default CartsController;
