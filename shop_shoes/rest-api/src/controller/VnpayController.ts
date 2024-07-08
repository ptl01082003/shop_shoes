// controllers/OriginsController.ts
import { NextFunction, Request, Response } from "express";
import querystring from "querystring";
import crypto from "crypto";
import moment from "moment";

const VnpayController = {
  order: async (req: Request, res: Response, next: NextFunction) => {
    try {
      process.env.TZ = "Asia/Ho_Chi_Minh";

      var ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");
      const orderId = moment(date).format("DDHHmmss");

      let vnp_Params: any = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_Locale"] = "vn";
      vnp_Params["vnp_CurrCode"] = "VND";
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_TmnCode"] = process.env["vnp_TmnCode"];
      vnp_Params["vnp_OrderInfo"] = "tuyendev";
      vnp_Params["vnp_BankCode"] = "NCB";
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = 1000000 * 100;
      vnp_Params["vnp_ReturnUrl"] = process.env["vnp_ReturnUrl"];
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;

      vnp_Params = sortObject(vnp_Params);

      const signData = querystring.stringify(vnp_Params);
      const hmac = crypto.createHmac(
        "sha512",
        process.env["vnp_HashSecret"] as string
      );
      const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      const vnpUrlWithParams =
        process.env["vnp_Url"] + "?" + querystring.stringify(vnp_Params);
      res.redirect(vnpUrlWithParams);
    } catch (error) {
      next(error);
    }
  },
  checkout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let vnp_Params: any = req.query;

      const secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_ResponseCode"];
      delete vnp_Params["vnp_TransactionStatus"];

      vnp_Params = sortObject(vnp_Params);

      var signData = querystring.stringify(vnp_Params);
      var hmac = crypto.createHmac(
        "sha512",
        process.env["vnp_HashSecret"] as string
      );
      var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      //kiểm tra tính toàn vẹn dữ liệu của giao dịch , sử dụng các tham số trên url trả về 
      //thực hiện tuần tự các bước như yêu cầu thanh toán và check với mã băm trả về 
      if (secureHash === signed) {
      } else {
          //check đơn hàng tại đây và lưu vào database
      }
    } catch (error) {
      next(error);
    }
  },
};

function sortObject(obj: any) {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

export default VnpayController;
