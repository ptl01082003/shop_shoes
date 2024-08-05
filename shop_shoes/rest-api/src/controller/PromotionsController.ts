import { Request, Response, NextFunction } from "express";
import { Promotions } from "../models/Promotions";

const PromotionsController = {
  // Thêm một promotion mới
  addPromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, discount, startDay, endDay, status } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!name || discount == null || !startDay || !endDay || status == null) {
        return res.status(400).json({ message: "Thiếu các trường bắt buộc" });
      }

      const promotions = await Promotions.create({
        name,
        discount,
        startDay,
        endDay,
        status,
      });

      res.json({ data: promotions, message: "Thêm promotion mới thành công" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  // Lấy tất cả promotions
  getPromotions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const promotions = await Promotions.findAll();
      res.json({ data: promotions });
    } catch (error) {
      console.error("Lỗi khi lấy promotions:", error);
      next(error);
    }
  },

  // Lấy promotion theo Id
  getPromotionById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { promotionId } = req.params;
      const promotions = await Promotions.findByPk(promotionId);
      if (promotions) {
        res.json({ data: promotions });
      } else {
        res.status(404).json({ message: "Không tìm thấy promotion" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  // Cập nhật promotion
  updatePromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { promotionId } = req.params;
      const { name, discount, startDay, endDay, status } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!name || discount == null || !startDay || !endDay || status == null) {
        return res.status(400).json({ message: "Thiếu các trường bắt buộc" });
      }

      const promotions = await Promotions.findByPk(promotionId);
      if (promotions) {
        await promotions.update({
          name,
          discount,
          startDay,
          endDay,
          status,
        });
        res.json({ message: "Cập nhật promotion thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy promotion" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  // Xóa promotion
  deletePromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { promotionId } = req.params;
      const promotions = await Promotions.findByPk(promotionId);
      if (promotions) {
        await promotions.destroy();
        res.json({ message: "Xóa promotion thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy promotion" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default PromotionsController;
