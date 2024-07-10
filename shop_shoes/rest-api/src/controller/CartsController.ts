import { Request, Response, NextFunction } from "express";
import { Carts } from "../models/Carts";
import { ProductDetails } from "../models/ProductDetails";
import { Customers } from "../models/Customers";

const CartsController = {
  addCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cartQuantity, productDetailsID, customerID } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!cartQuantity || !productDetailsID || !customerID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const cart = await Carts.create({
        cartQuantity,
        productDetailsID,
        customerID,
      });

      res.json({ data: cart, message: "Add new cart item successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getCarts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carts = await Carts.findAll({
        include: [ProductDetails, Customers],
      });
      res.json({ data: carts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getCartById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const cart = await Carts.findByPk(id, {
        include: [ProductDetails, Customers],
      });
      if (cart) {
        res.json({ data: cart });
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { cartQuantity, productDetailsID, customerID } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!cartQuantity || !productDetailsID || !customerID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const cart = await Carts.findByPk(id);
      if (cart) {
        await cart.update({ cartQuantity, productDetailsID, customerID });
        res.json({ message: "Cart item updated successfully" });
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const cart = await Carts.findByPk(id);
      if (cart) {
        await cart.destroy();
        res.json({ message: "Cart item deleted successfully" });
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default CartsController;
