// src/services/StyleService.ts

import AxiosConfig from "../networks/AxiosRequest";

const API_URL = "/styles"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const StyleService = {
  // Lấy danh sách tất cả màu sắc
  getStyles: async () => {
    try {
      const response = await AxiosConfig.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách màu sắc", error);
      throw error;
    }
  },

  // Lấy một màu sắc dựa trên ID
  getStyleById: async (styleID: number) => {
    try {
      const response = await AxiosConfig.get(`${API_URL}/${styleID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin màu sắc ${styleID}`, error);
      throw error;
    }
  },

  // Tạo mới một màu sắc
  createStyle: async (styleData: any) => {
    try {
      const response = await AxiosConfig.post(API_URL, styleData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới màu sắc", error);
      throw error;
    }
  },

  // Cập nhật thông tin một màu sắc đã có
  updateStyle: async (styleID: number, styleData: any) => {
    try {
      const response = await AxiosConfig.put(
        `${API_URL}/${styleID}`,
        styleData
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật màu sắc ${styleID}`, error);
      throw error;
    }
  },

  // Xóa một màu sắc dựa trên ID
  deleteStyle: async (styleID: number) => {
    try {
      const response = await AxiosConfig.delete(`${API_URL}/${styleID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa màu sắc ${styleID}`, error);
      throw error;
    }
  },
};

export default StyleService;
