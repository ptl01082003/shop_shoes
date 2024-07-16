// src/services/SizeService.ts

import AxiosConfig from "../networks/AxiosRequest";

const API_URL = "/sizes"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const SizeService = {
  // Lấy danh sách tất cả màu sắc
  getSizes: async () => {
    try {
      const response = await AxiosConfig.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách màu sắc", error);
      throw error;
    }
  },

  // Lấy một màu sắc dựa trên ID
  getSizeById: async (sizeID: number) => {
    try {
      const response = await AxiosConfig.get(`${API_URL}/${sizeID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin màu sắc ${sizeID}`, error);
      throw error;
    }
  },

  // Tạo mới một màu sắc
  createSize: async (sizeData: any) => {
    try {
      const response = await AxiosConfig.post(API_URL, sizeData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới màu sắc", error);
      throw error;
    }
  },

  // Cập nhật thông tin một màu sắc đã có
  updateSize: async (sizeID: number, sizeData: any) => {
    try {
      const response = await AxiosConfig.put(`${API_URL}/${sizeID}`, sizeData);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật màu sắc ${sizeID}`, error);
      throw error;
    }
  },

  // Xóa một màu sắc dựa trên ID
  deleteSize: async (sizeID: number) => {
    try {
      const response = await AxiosConfig.delete(`${API_URL}/${sizeID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa màu sắc ${sizeID}`, error);
      throw error;
    }
  },
};

export default SizeService;
