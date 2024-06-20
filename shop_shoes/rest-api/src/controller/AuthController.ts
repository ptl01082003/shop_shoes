// import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import pool from '../config/db';
// import User from '../models/User';

// const authController = {
//   login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const { userName, password } = req.body;
//       const user = await User.findByUserName(userName);
//       if (!user) {
//         return res.status(400).json({ message: 'Tên tài khoản không tồn tại !' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Mật khẩu không đúng !' });
//       }

//       const accessToken = jwt.sign({ userId: user.id }, process.env.GENERATE_AC_TOKEN, { expiresIn: '5d' });
//       res.status(200).json({ data: { accessToken }, message: 'Đăng nhập thành công !' });
//     } catch (error) {
//       res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
//     }
//   },

//   logOut: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       await pool.query('DELETE FROM current_token');
//       res.status(200).json({ message: 'Đăng xuất thành công !' });
//     } catch (error) {
//       res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
//     }
//   },

//   changePassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const { currentPass, newPass } = req.body;
//       const user = await User.findByUserName('example'); // Replace with actual logic to find user
//       if (!user) {
//         return res.status(400).json({ message: 'Không tìm thấy người dùng' });
//       }

//       const isMatch = await bcrypt.compare(currentPass, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Mật khẩu cũ không đúng !' });
//       }

//       const hashPass = await bcrypt.hash(newPass, 10);
//       await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashPass, user.id]);
//       res.status(200).json({ message: 'Đổi mật khẩu thành công !' });
//     } catch (error) {
//       res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
//     }
//   },
// };

// export default authController;
