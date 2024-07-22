import crypto from "crypto-js";

export function generateUniqueUserId() {
  const min = 1000000000;
  const randomNumber = parseInt(
    crypto.lib.WordArray.random(4).toString(crypto.enc.Hex),
    16
  );
  const userId = min + (randomNumber % min);
  return userId;
}


export function genaratorProductsId() {
  const min = 100000;
  const randomNumber = parseInt(
    crypto.lib.WordArray.random(4).toString(crypto.enc.Hex),
    16
  );
  const productsId = min + (randomNumber % min);
  return productsId;
}

export function genaratorImagesId() {
  const min = 100000000000;
  const randomNumber = parseInt(
    crypto.lib.WordArray.random(4).toString(crypto.enc.Hex),
    16
  );
  const productsId = min + (randomNumber % min);
  return productsId;
}


export function sortObject(obj: any) {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}
