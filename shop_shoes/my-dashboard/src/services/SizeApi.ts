// src/services/SizeService.ts

import AxiosClient from "../networks/AxiosRequest";

const API_URL = "/sizes"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const SizeService = {
  // Lấy danh sách tất cả kích cỡ
  getSizes: async () => {
    try {
      const response = await AxiosClient.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách kích cỡ", error);
      throw error;
    }
  },

  // Lấy một kích cỡ dựa trên ID
  getSizeById: async (sizeID: number) => {
    try {
      const response = await AxiosClient.get(`${API_URL}/${sizeID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin kích cỡ ${sizeID}`, error);
      throw error;
    }
  },

  // Tạo mới một kích cỡ
  createSize: async (sizeData: any) => {
    try {
      const response = await AxiosClient.post(API_URL, sizeData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới kích cỡ", error);
      throw error;
    }
  },

  // Cập nhật thông tin một kích cỡ đã có
  updateSize: async (sizeID: number, sizeData: any) => {
    try {
      const response = await AxiosClient.put(`${API_URL}/${sizeID}`, sizeData);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật kích cỡ ${sizeID}`, error);
      throw error;
    }
  },

  // Xóa một kích cỡ dựa trên ID
  deleteSize: async (sizeID: number) => {
    try {
      const response = await AxiosClient.delete(`${API_URL}/${sizeID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa kích cỡ ${sizeID}`, error);
      throw error;
    }
  },
};

export default SizeService;
