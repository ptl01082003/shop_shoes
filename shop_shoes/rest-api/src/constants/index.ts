export enum RESPONSE_CODE {
  SUCCESS = 0,
  ERRORS = 1,
}

export enum STATUS_CODE {
  SUCCESS = 200,
  NOT_AUTHEN = 401,
  NOT_AUTHOR = 403,
}

type ResponseBodyType<T> = {
  code: RESPONSE_CODE;
  message: string;
  data?: any;
};

export function ResponseBody<T>({
  code = RESPONSE_CODE.SUCCESS,
  ...rest
}: ResponseBodyType<T>): ResponseBodyType<T> {
  return {
    code,
    ...rest,
  };
}
