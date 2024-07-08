// controllers/StylesController.ts
import { Request, Response, NextFunction } from "express";
import { Styles } from "../models/Styles";
import { Op } from "sequelize";

const StylesController = {
  addStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleName } = req.body;
      const style = await Styles.create({ styleName });
      res.json({ data: style, message: "Add new style successfully" });
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
      const { id } = req.params;
      const style = await Styles.findByPk(id);
      if (style) {
        res.json({ data: style });
      } else {
        res.status(404).json({ message: "Style not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  updateStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { styleName } = req.body;
      const style = await Styles.findByPk(id);
      if (style) {
        await style.update({ styleName });
        res.json({ message: "Style updated successfully" });
      } else {
        res.status(404).json({ message: "Style not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const style = await Styles.findByPk(id);
      if (style) {
        await style.destroy();
        res.json({ message: "Style deleted successfully" });
      } else {
        res.status(404).json({ message: "Style not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default StylesController;
