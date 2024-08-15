import { NextFunction, Request, Response } from "express";
import { ReturnRequests } from "../models/ReturnRequests";
import { RESPONSE_CODE, ResponseBody } from "../constants";

const ReturnRequestsController = {
  createRequest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId, productId, quantity, reason, userId } = req.body;
      const newRequest = await ReturnRequests.create({
        orderId,
        productId,
        quantity,
        reason,
        userId,
      });
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: newRequest,
          message: "Tạo yêu cầu trả hàng thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getRequests: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requests = await ReturnRequests.findAll();
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: requests,
          message: "Lấy danh sách yêu cầu trả hàng thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  updateRequest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status, processDate } = req.body;
      const request = await ReturnRequests.findByPk(id);

      if (request) {
        request.status = status;
        request.processDate = processDate;
        await request.save();
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: request,
            message: "Cập nhật yêu cầu trả hàng thành công",
          })
        );
      } else {
        res.status(404).json({
          message: "Yêu cầu trả hàng không tồn tại",
          code: RESPONSE_CODE.NOT_FOUND,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default ReturnRequestsController;
