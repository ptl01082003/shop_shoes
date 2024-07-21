export enum KEY_STORAGE {
  TOKEN = "token",
  RF_TOKEN = "refreshToken",
}

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

export const PATH_ROUTER = {

}