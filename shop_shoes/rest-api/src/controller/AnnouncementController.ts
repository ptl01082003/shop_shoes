import { Request, Response } from "express";
import Announcement from "../models/Announcement";

const AnnouncementController = {
  getAnnouncement: async (req: Request, res: Response) => {
    try {
      const announcement = await Announcement.findAll();
      res.status(200).json(announcement);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  //// lấy id
  getAnnouncementById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const announcement = await Announcement.findByPk(id);
      if (announcement) {
        res.status(200).json(announcement);
      } else {
        res.status(404).json({ error: "Colour not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Tạo một thương hiệu mới

  createAnnouncement: async (req: Request, res: Response) => {
    try {
      // Kiểm tra và lấy dữ liệu từ body của yêu cầu
       const ThoiGian = new Date();
      const { NhanVien, LoaiThongBao, NoiDung, url } = req.body;
  
      // Kiểm tra xem liệu có thiếu dữ liệu không
 
      // Tạo thông báo mới trong cơ sở dữ liệu
      const announcement = await Announcement.create({
        NhanVien,
        LoaiThongBao,
        NoiDung,
        ThoiGian, // Chuyển đổi ThoiGian từ dạng string sang Date nếu cần thiết
        url,
      });
  
      // Trả về kết quả thành công
      res.status(201).json(announcement);
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo màu
      console.error("Error creating colour:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  //  createColour : async (req: Request, res: Response) => {
  //   console.log('createColour called');
  //   try {
  //     const Ten = req.body.Ten;
  //     const NgayTao = req.body.NgayTao;
  //     const NgayCapNhat = req.body.NgayCapNhat;
  //     if (!Ten || !NgayTao || !NgayCapNhat) {
  //       return res.status(400).json({ message: 'Thiếu thông tin cần thiết trong yêu cầu' });
  //     }
  //     console.log('Request body:', req.body);
  //     const colour = await Colour.create({ Ten, NgayTao, NgayCapNhat });
  //     console.log('Colour created:', colour);
  //     res.status(201).json(colour);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  //   }
  // },

  // Cập nhật một thương hiệu
  updateAnnouncement: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
    console.log("id :", id);
    
    // Lấy các giá trị cần cập nhật từ req.body
    const { NhanVien, LoaiThongBao, NoiDung, ThoiGian, url } = req.body;
    
    // Tìm thông báo theo id
    const announcement = await Announcement.findByPk(id);

    // Kiểm tra xem thông báo có tồn tại không
    if (announcement) {
      // Cập nhật thông báo với các giá trị mới từ req.body
      await announcement.update({
        NhanVien,
        LoaiThongBao,
        NoiDung,
        ThoiGian: ThoiGian ? new Date(ThoiGian) : announcement.ThoiGian, // Cập nhật ThoiGian nếu được cung cấp
        url,
      });

      // Trả về thông báo đã được cập nhật thành công
      res.status(200).json(announcement);
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deleteAnnouncement: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const announcement = await Announcement.findByPk(id);
      console.log(announcement);
      console.log("createColour called");
      if (announcement) {
        await announcement.destroy();
        res.status(200).json({ message: "Dòng sản phầm đã được xóa" });
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  
};

export default AnnouncementController;
