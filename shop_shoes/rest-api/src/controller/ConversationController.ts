import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Conversations } from "../models/Conversations";
import { Messages } from "../models/Messages";
import { Users } from "../models/Users";
const ConversationController = {
  addMessages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { receiverId, contents, imageUrl } = req.body;

      const [conversations] = await Conversations.findOrCreate({
        where: { senderId: userId, receiverId },
      });

      await Messages.create({
        userId,
        contents,
        imageUrl,
        conversationId: conversations.conversationId,
      });

      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: `Thêm mới thành công`,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  getConversations: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;

      const lstConversations = await Conversations.findAll({
        where: { senderId: userId },
        attributes: ["conversationId"],
        include: {
          model: Messages,
          include: [
            {
              model: Users,
              attributes: ["fullName"]
            },
          ],
        },
      });

      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: `Thêm mới thành công`,
          data: lstConversations,
        })
      );
    } catch (error) {
      next(error);
    }
  },
};

export default ConversationController;
