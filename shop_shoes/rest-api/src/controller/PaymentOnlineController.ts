// controllers/OriginsController.ts
import { NextFunction, Request, Response } from "express";
import querystring from "querystring";
import crypto from "crypto";
import moment from "moment";
import axios from "axios";
import { sortObject } from "../utils/utils";

const PaymentOnlineController = {
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
      vnp_Params["vnp_OrderInfo"] = "test 123";
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
  checkoutVnpay: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let vnp_Params: any = req.query;

      const secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];

      vnp_Params = sortObject(vnp_Params);

      var signData = querystring.stringify(vnp_Params);
      var hmac = crypto.createHmac(
        "sha512",
        process.env["vnp_HashSecret"] as string
      );
      var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      res.json({ check: signed === secureHash });
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
  checkoutMomo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessKey = "F8BBA842ECF85";
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      let momoQuery = req.query;

      const orderId = momoQuery["orderId"];
      const requestId = momoQuery["requestId"];
      const partnerCode = momoQuery["partnerCode"];

      const signature = crypto
        .createHmac("sha256", secretKey)
        .update(
          `accessKey=${accessKey}&orderId=${momoQuery["orderId"]}&partnerCode=${momoQuery["partnerCode"]}&requestId=${momoQuery["requestId"]}`
        )
        .digest("hex");

      const requestBody = {
        partnerCode,
        requestId,
        orderId,
        signature,
        lang: "vi",
      };
      const transaction = await axios.post(
        process.env["momo_query_Url"] as string,
        requestBody
      );
      if (transaction?.data.resultCode == 0) {
        res.json(transaction.data);
      }
    } catch (error) {
      next(error);
    }
  },
  momo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partnerCode = "MOMO";
      const accessKey = "F8BBA842ECF85";
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

      const requestId = partnerCode + new Date().getTime();
      const orderId = new Date().getTime() + 450;
      const orderInfo = "Đơn hàng cần thanh toán FDO430DFK";
      const ipnUrl = process.env["momo_Checkout"];
      const redirectUrl = process.env["momo_Checkout"];
      const amount = "10000";
      const requestType = "captureWallet";
      const extraData = "eyJ1c2VybmFtZSI6ICJtb21vIn0=";

      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      // Tạo chữ ký
      const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

      const requestBody = {
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: "vi",
      };

      const payments = await axios
        .post(process.env["momo_Url"] as string, requestBody)
      res.redirect(payments.data.payUrl);
    } catch (error) {
      next(error);
    }
  },
};

export default PaymentOnlineController;
