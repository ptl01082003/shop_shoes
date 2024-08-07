export enum KEY_STORAGE {
  TOKEN = "token",
  RF_TOKEN = "refreshToken",
}

export const URL_IMAGE = (path) => {
  return `http://localhost:5500/${path}`;
};

export type Response<T> = {
  code: number;
  data: T;
  message: string;
};

export enum RESPONSE_CODE {
  SUCCESS = 0,
  ERRORS = 1,
  NOT_AUTHOR = 83,
  NOT_AUTHEN = 85,
  INCORRECT = 86,
}

export enum Vouchers_TYPE {
  MONEY = "MONEY",
  PERCENT = "PERCENT",
}

export enum Vouchers_STATUS {
  ISACTIVE = "ISACTIVE",
  EXPIRED = "EXPIRED",
}
export enum PROMOTIONS_STATUS {
  ISACTIVE = "ISACTIVE",
  PERCENT = "PERCENT",
}

export const PATH_ROUTER = {};

export const TRANSFER_PRICE = (price: string) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(parseFloat(price))
    ?.replace("₫", "VNĐ") || "";
