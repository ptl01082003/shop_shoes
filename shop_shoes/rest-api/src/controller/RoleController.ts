// import { Request, Response } from 'express';
// import Role from '../models/Size';

// const RoleController = {  
// // Lấy danh sách tất cả các thương hiệu
//  getRole : async (req: Request, res: Response) => {
//   try {
//     const role = await Role.findAll();
//     res.status(200).json(role);
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
//   }
// },

// getRoleById: async (req: Request, res: Response) => {
//   const { id } = req.params;

//   console.log("ma:", id); // In ra giá trị của ma để kiểm tra
//   try {
//     const role = await Role.findByPk(id);
//     if (role) {
//       res.status(200).json(role);
//     } else {
//       res.status(404).json({ error: "Colour not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
//   }
// },


// // Tạo một thương hiệu mới
//  createRole : async (req: Request, res: Response) => {
//   try {
//     const { Ma,Ten } = req.body;
//     const role = await Role.create({ Ma,Ten});
//     res.status(201).json(role);
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
//   }
// },


// // Cập nhật một thương hiệu
//  updateRole : async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { Ten} = req.body;
//     const role = await Role.findByPk(id);
//     if (role) {
//       await role.update({Ten });
//       res.status(200).json(role);
//     } else {
//       res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
//   }
// },

// // Xóa một thương hiệu
//  deleteRole : async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const role = await Role.findByPk(id);
//     if (role) {
//       await role.destroy();
//       res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
//     } else {
//       res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
//   }
// },

// }

// export default RoleController;