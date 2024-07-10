import { NextFunction, Request, Response } from "express";

// [ {}]
const CartsController = {
  add: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const carts = req.body.carts;
    const a = 
    {
      carts: [
        {
          productsId: 4340343, 
          infoSrc: "/dfd/gdfd.png", 
          size: 38, 
          quanity: 4,
          totals: 400
        },
        {
          productsId: 4340343, 
          infoSrc: "/dfd/gdfd.png", 
          size: 39, 
          quanity: 5,
          totals: 400
        }
      ]
    }



    res.json({message: req.userId});
    try {
    } catch (error) {
      next(error);
    }
  },
};

export default CartsController;
