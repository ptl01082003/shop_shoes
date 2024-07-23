import { Request, Response, NextFunction } from "express";
import { Styles } from "../models/Styles";
import { Op } from "sequelize";

const StylesController = {
  addStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleName } = req.body;
      const style = await Styles.create({ styleName });
      res.json({ data: style, message: "Thêm style mới thành công" });
    } catch (error) {
      next(error);
    }
  },

  getStyles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleID, styleName } = req.query;
      const whereClause: any = {};

      if (styleID) {
        whereClause.styleID = styleID;
      }
      if (styleName) {
        whereClause.styleName = { [Op.like]: `%${styleName}%` };
      }

      const styles = await Styles.findAll({ where: whereClause });
      res.json({ data: styles });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleID } = req.body;
      const style = await Styles.findByPk(styleID);
      if (style) {
        res.json({ data: style });
      } else {
        res.status(404).json({ message: "Không tìm thấy style" });
      }
    } catch (error) {
      next(error);
    }
  },

  updateStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleID } = req.body;
      const { styleName } = req.body;
      const style = await Styles.findByPk(styleID);
      if (style) {
        await style.update({ styleName });
        res.json({ message: "Cập nhật style thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy style" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleID } = req.body;
      const style = await Styles.findByPk(styleID);
      if (style) {
        await style.destroy();
        res.json({ message: "Xóa style thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy style" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default StylesController;
