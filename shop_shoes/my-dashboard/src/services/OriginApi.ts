// src/services/OriginService.ts

import AxiosClient from "../networks/AxiosRequest";

const API_URL = "/origins"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const OriginService = {
  // Lấy danh sách tất cả màu sắc
  getOrigins: async () => {
    try {
      const response = await AxiosClient.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách màu sắc", error);
      throw error;
    }
  },

  // Lấy một màu sắc dựa trên ID
  getOriginById: async (originID: number) => {
    try {
      const response = await AxiosClient.get(`${API_URL}/${originID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin màu sắc ${originID}`, error);
      throw error;
    }
  },

  // Tạo mới một màu sắc
  createOrigin: async (originData: any) => {
    try {
      const response = await AxiosClient.post(API_URL, originData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới màu sắc", error);
      throw error;
    }
  },

  // Cập nhật thông tin một màu sắc đã có
  updateOrigin: async (originID: number, originData: any) => {
    try {
      const response = await AxiosClient.put(
        `${API_URL}/${originID}`,
        originData
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật màu sắc ${originID}`, error);
      throw error;
    }
  },

  // Xóa một màu sắc dựa trên ID
  deleteOrigin: async (originID: number) => {
    try {
      const response = await AxiosClient.delete(`${API_URL}/${originID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa màu sắc ${originID}`, error);
      throw error;
    }
  },
};

export default OriginService;
