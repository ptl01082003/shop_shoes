// src/services/VoucherService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";

const API_URL = "/vouchers"; // Đảm bảo rằng URL tương ứng với API của bạn

const VoucherService = {
  getVouchers: async () => {
    try {
      // Sử dụng GET để lấy danh sách các voucher
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response; // Trả về dữ liệu chính xác từ response
    } catch (error) {
      console.error("Error fetching vouchers", error);
      throw error;
    }
  },

  getVoucherById: async (voucherId: number) => {
    try {
      // Sử dụng GET để lấy thông tin voucher theo ID
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${voucherId}`
      );
      return response; // Trả về dữ liệu chính xác từ response
    } catch (error) {
      console.error(`Error fetching voucher ${voucherId}`, error);
      throw error;
    }
  },

  createVoucher: async (voucherData: any) => {
    try {
      // Sử dụng POST để tạo một voucher mới
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        voucherData
      );
      return response; // Trả về dữ liệu chính xác từ response
    } catch (error) {
      console.error("Error creating voucher", error);
      throw error;
    }
  },

  updateVoucher: async (params: any) => {
    try {
      // Sử dụng PUT để cập nhật thông tin voucher
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        { params }
      );
      return response; // Trả về dữ liệu chính xác từ response
    } catch (error) {
      console.error(`Error updating voucher ${params}`, error);
      throw error;
    }
  },

  deleteVoucher: async (voucherId: number) => {
    try {
      // Sử dụng DELETE để xóa một voucher
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove/${voucherId}`,
        { voucherId }
      );
      return response; // Trả về dữ liệu chính xác từ response
    } catch (error) {
      console.error(`Error deleting voucher ${voucherId}`, error);
      throw error;
    }
  },
};

export default VoucherService;
