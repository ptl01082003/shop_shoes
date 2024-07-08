import { NextFunction, Request } from "express";
import { nextTick } from "process";

export function checkAuth(_req: any, _res: any, _next: any) {
  _next();
}

// import { Request, Response, NextFunction } from "express";
// import { client } from "../config/ConnectRedis";

// const auth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.header("Authorization");
//     const currentToken = await client.get("current_token");

//     if (!token) {
//       return res.status(401).json({ message: "Invalid Authentication" });
//     }

//     if (!currentToken || currentToken !== token) {
//       return res.status(401).json({ message: "Authorization not valid" });
//     }

//     next();
//   } catch (error) {
//     console.error("Error in auth middleware:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export default auth;
