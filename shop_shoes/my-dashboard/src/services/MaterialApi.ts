// src/services/MaterialService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
const API_URL = "/materials"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const MaterialService = {
  // Lấy danh sách tất cả màu sắc
  getMaterials: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách màu sắc", error);
      throw error;
    }
  },

  // Lấy một màu sắc dựa trên ID
  getMaterialById: async (materialID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${materialID}`
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin màu sắc ${materialID}`, error);
      throw error;
    }
  },

  // Tạo mới một màu sắc
  createMaterial: async (materialData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        materialData
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới màu sắc", error);
      throw error;
    }
  },

  // Cập nhật thông tin một màu sắc đã có
  updateMaterial: async (materialID: number, materialData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit/${materialID}`,
        materialData
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi cập nhật màu sắc ${materialID}`, error);
      throw error;
    }
  },

  // Xóa một màu sắc dựa trên ID
  deleteMaterial: async (materialID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove/${materialID}`
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa màu sắc ${materialID}`, error);
      throw error;
    }
  },
};

export default MaterialService;
