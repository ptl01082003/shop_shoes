import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Promotions } from "../models/Promotions";

const PromotionsController = {
  addPromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, discountPrice, startDay, endDay, productId } = req.body;
      const promotion = await Promotions.create({
        name,
        discountPrice,
        startDay,
        endDay,
        productId,
      });
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: promotion,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getPromotions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const promotions = await Promotions.findAll();
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: promotions,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { promotionId } = req.params;
      const promotion = await Promotions.findByPk(promotionId);
      if (promotion) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: promotion,
        });
      } else {
        res.status(404).json({
          message: "Khuyến mãi không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  updatePromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { promotionId, name, discountPrice, startDay, endDay, productId } =
        req.body;
      const promotion = await Promotions.findByPk(promotionId);
      if (promotion) {
        await promotion.update({
          name,
          discountPrice,
          startDay,
          endDay,
          productId,
        });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: promotion,
        });
      } else {
        res.json({
          message: "Khuyến mãi không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  deletePromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { promotionId } = req.params;
      const promotion = await Promotions.findByPk(promotionId);
      if (promotion) {
        await promotion.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.json({
          message: "Khuyến mãi không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default PromotionsController;
