import { Request, Response } from 'express';
import Material from '../models/Material';
const MaterialController = {
// Lấy danh sách tất cả các thương hiệu
 getMaterial : async (req: Request, res: Response) => {
  try {
    const material = await Material.findAll();
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

getMaterialById: async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("id:", id); // In ra giá trị của ma để kiểm tra
  try {
    const material  = await Material.findByPk(id);
    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ error: "Colour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
  }
},

// Tạo một thương hiệu mới
 createMaterial : async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const material = await Material.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Cập nhật một thương hiệu
 updateMaterial : async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const material = await Material.findByPk(id);
    if (material) {
      await material.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(material);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Xóa một thương hiệu
 deleteMaterial : async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);
    if (material) {
      await material.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},
}


export default  MaterialController;