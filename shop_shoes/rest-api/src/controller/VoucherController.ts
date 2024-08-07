// import { NextFunction, Request, Response } from "express";
// import { RESPONSE_CODE, ResponseBody } from "../constants";
// import { Vouchers } from "../models/Vouchers";

// const VouchersController = {
//   addVoucher: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const {
//         code,
//         description,
//         valueOrder,
//         disscoutMax,
//         startDay,
//         endDay,
//         quantity,
//         status,
//         typeValue,
//         productId,
//       } = req.body;
//       const voucher = await Vouchers.create({
//         code,
//         description,
//         valueOrder,
//         disscoutMax,
//         startDay,
//         endDay,
//         quantity,
//         status,
//         typeValue,
//         productId,
//       });
//       res.json(
//         ResponseBody({
//           code: RESPONSE_CODE.SUCCESS,
//           data: voucher,
//           message: "Thực hiện thành công",
//         })
//       );
//     } catch (error) {
//       next(error);
//     }
//   },

//   getVouchers: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const vouchers = await Vouchers.findAll();
//       res.json(
//         ResponseBody({
//           code: RESPONSE_CODE.SUCCESS,
//           data: vouchers,
//           message: "Thực hiện thành công",
//         })
//       );
//     } catch (error) {
//       next(error);
//     }
//   },

//   getById: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { vouchersId } = req.params;
//       const voucher = await Vouchers.findByPk(vouchersId);
//       if (voucher) {
//         res.status(200).json(
//           ResponseBody({
//             code: RESPONSE_CODE.SUCCESS,
//             data: voucher,
//             message: "Thực hiện thành công",
//           })
//         );
//       } else {
//         res.status(404).json(
//           ResponseBody({
//             code: RESPONSE_CODE.NOT_FOUND,
//             message: "Voucher không tồn tại",
//           })
//         );
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   updateVoucher: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const {
//         vouchersId,
//         code,
//         description,
//         valueOrder,
//         disscoutMax,
//         startDay,
//         endDay,
//         quantity,
//         status,
//         typeValue,
//         productId,
//       } = req.body;
//       const voucher = await Vouchers.findByPk(vouchersId);
//       if (voucher) {
//         await voucher.update({
//           code,
//           description,
//           valueOrder,
//           disscoutMax,
//           startDay,
//           endDay,
//           quantity,
//           status,
//           typeValue,
//           productId,
//         });
//         res.status(200).json(
//           ResponseBody({
//             code: RESPONSE_CODE.SUCCESS,
//             data: voucher,
//             message: "Thực hiện thành công",
//           })
//         );
//       } else {
//         res.status(404).json(
//           ResponseBody({
//             code: RESPONSE_CODE.NOT_FOUND,
//             message: "Voucher không tồn tại",
//           })
//         );
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   deleteVoucher: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { vouchersId } = req.params;
//       const voucher = await Vouchers.findByPk(vouchersId);
//       if (voucher) {
//         await voucher.destroy();
//         res.status(200).json(
//           ResponseBody({
//             code: RESPONSE_CODE.SUCCESS,
//             message: "Thực hiện thành công",
//           })
//         );
//       } else {
//         res.status(404).json(
//           ResponseBody({
//             code: RESPONSE_CODE.NOT_FOUND,
//             message: "Voucher không tồn tại",
//           })
//         );
//       }
//     } catch (error) {
//       next(error);
//     }
//   },
// };

// export default VouchersController;

import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Vouchers } from "../models/Vouchers";

const VouchersController = {
  addVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        code,
        description,
        valueOrder,
        disscoutMax,
        startDay,
        endDay,
        quantity,
        status,
        typeValue,
        productId,
      } = req.body;
      const voucher = await Vouchers.create({
        code,
        description,
        valueOrder,
        disscoutMax,
        startDay,
        endDay,
        quantity,
        status,
        typeValue,
        productId,
      });
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: voucher,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getVouchers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vouchers = await Vouchers.findAll();
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: vouchers,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.params;
      const voucher = await Vouchers.findByPk(voucherId);
      if (voucher) {
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: voucher,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Voucher không tồn tại",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

  updateVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        voucherId,
        code,
        description,
        valueOrder,
        disscoutMax,
        startDay,
        endDay,
        quantity,
        status,
        typeValue,
        productId,
      } = req.body;
      const voucher = await Vouchers.findByPk(voucherId);
      if (voucher) {
        await voucher.update({
          code,
          description,
          valueOrder,
          disscoutMax,
          startDay,
          endDay,
          quantity,
          status,
          typeValue,
          productId,
        });
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: voucher,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Voucher không tồn tại",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

  deleteVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.params;
      const voucher = await Vouchers.findByPk(voucherId);
      if (voucher) {
        await voucher.destroy();
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Voucher không tồn tại",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },
};

export default VouchersController;
