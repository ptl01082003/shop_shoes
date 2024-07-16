// src/services/ColorService.ts

import AxiosConfig from "../networks/AxiosRequest";

const API_URL = "/colors"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const ColorService = {
  // Lấy danh sách tất cả màu sắc
  getColors: async () => {
    try {
      const response = await AxiosConfig.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách màu sắc", error);
      throw error;
    }
  },

  // Lấy một màu sắc dựa trên ID
  getColorById: async (colorID: number) => {
    try {
      const response = await AxiosConfig.get(`${API_URL}/${colorID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin màu sắc ${colorID}`, error);
      throw error;
    }
  },

  // Tạo mới một màu sắc
  createColor: async (colorData: any) => {
    try {
      const response = await AxiosConfig.post(API_URL, colorData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới màu sắc", error);
      throw error;
    }
  },

  // Cập nhật thông tin một màu sắc đã có
  updateColor: async (colorID: number, colorData: any) => {
    try {
      const response = await AxiosConfig.put(
        `${API_URL}/${colorID}`,
        colorData
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật màu sắc ${colorID}`, error);
      throw error;
    }
  },

  // Xóa một màu sắc dựa trên ID
  deleteColor: async (colorID: number) => {
    try {
      const response = await AxiosConfig.delete(`${API_URL}/${colorID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa màu sắc ${colorID}`, error);
      throw error;
    }
  },
};

export default ColorService;
