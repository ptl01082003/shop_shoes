// src/services/PromotionsService.ts
import { Response } from "../constants/constants";
import AxiosClient from "../networks/AxiosRequest";

const API_URL = "/promotions"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const PromotionsService = {
  // Lấy danh sách tất cả khuyến mãi
  getPromotions: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khuyến mãi", error);
      throw error;
    }
  },

  // Lấy thông tin một khuyến mãi dựa trên ID
  getPromotionById: async (promotionId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${promotionId}`
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin khuyến mãi ${promotionId}`, error);
      throw error;
    }
  },

  // Tạo mới một khuyến mãi
  createPromotion: async (promotionData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        promotionData
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới khuyến mãi", error);
      throw error;
    }
  },

  // Cập nhật thông tin một khuyến mãi đã có
  updatePromotion: async (promotionId: number, promotionData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit/${promotionId}`,
        promotionData
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi cập nhật khuyến mãi ${promotionId}`, error);
      throw error;
    }
  },

  // Xóa một khuyến mãi dựa trên ID
  deletePromotion: async (promotionId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove/${promotionId}`
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa khuyến mãi ${promotionId}`, error);
      throw error;
    }
  },
};

export default PromotionsService;
