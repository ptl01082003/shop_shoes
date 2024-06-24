import { Request, Response } from "express";
import Customer from "../models/Customer";

const CustomerController = {
  getCustomer: async (req: Request, res: Response) => {
    try {
      const customer = await Customer.findAll();
      res.status(200).json(customer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  //// lấy id
  getCustomerById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const customer = await Customer.findByPk(id);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: "Colour not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Tạo một thương hiệu mới

  createCustomer: async (req: Request, res: Response) => {
    try {
      // Kiểm tra và lấy dữ liệu từ body của yêu cầu
      const Ten = req.body?.Ten;
      console.log(Ten);
      const NgayTao = new Date();
      console.log(NgayTao);
      const NgayCapNhat = new Date();
      console.log(NgayCapNhat);
      // Kiểm tra xem liệu có thiếu dữ liệu không
      if (!Ten || !NgayTao || !NgayCapNhat) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin cần thiết trong yêu cầu" });
      }

      // Tạo màu mới trong cơ sở dữ liệu
      const customer = await Customer.create({});

      // Trả về kết quả thành công
      res.status(201).json(customer);
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
  updateCustomer: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      console.log("id :", id);
      const Ten = req.body?.Ten;
      console.log(Ten);
      const NgayTao = req.body?.NgayTao;
      console.log(NgayTao);
      const NgayCapNhat = req.body?.NgayCapNhat;
      console.log(NgayCapNhat);
      const customer = await Customer.findByPk(id);
      if (customer) {
        await customer.update({});
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deleteCustomer: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      console.log(customer);
      console.log("createColour called");
      if (customer) {
        await customer.destroy();
        res.status(200).json({ message: "Dòng sản phầm đã được xóa" });
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
};

export default CustomerController;
