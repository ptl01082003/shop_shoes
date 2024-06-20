// // middleware/body-parser.ts

// import express from 'express';
// import bodyParser from 'body-parser';
// import { Request, Response, NextFunction } from 'express';

//  const ParseMiddleware = {
  // app.use(bodyParser.json());

  // // Parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: true }));

// setupBodyParser : (app: express.Application) => {
//   // Parse application/json
//   app.use(bodyParser.json());

//   // Parse application/x-www-form-urlencoded
//   app.use(bodyParser.urlencoded({ extended: true }));

//   // Custom middleware to handle JSON parsing errors
 
// },
//  errorHandler : (err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof SyntaxError && 'body' in err) {
//     // Lỗi khi parse JSON
//     return res.status(400).json({ message: 'Dữ liệu JSON không hợp lệ' });
//   }
//   next(); // Chuyển tiếp sang middleware tiếp theo nếu không phải lỗi khi parse JSON
// }

// }
 
// export default ParseMiddleware;
