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
