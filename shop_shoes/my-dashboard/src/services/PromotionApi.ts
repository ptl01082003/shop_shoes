// src/services/PromotionService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
const API_URL = "/promotions"; // Đảm bảo rằng URL tương ứng với API của bạn

const PromotionService = {
  getPromotions: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Error fetching promotions", error);
      throw error;
    }
  },

  getPromotionById: async (promotionId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}`,
        promotionId
      );
      return response; // Sử dụng response.data để trả về dữ liệu chính xác
    } catch (error) {
      console.error(`Error fetching promotion ${promotionId}`, error);
      throw error;
    }
  },

  createPromotion: async (promotionData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        promotionData
      );
      return response;
    } catch (error) {
      console.error("Error creating promotion", error);
      throw error;
    }
  },

  updatePromotion: async (params: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        params
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  deletePromotion: async (promotionId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        {
          promotionId,
        }
      );
      return response;
    } catch (error) {
      console.error(`Error deleting promotion ${promotionId}`, error);
      throw error;
    }
  },
};

export default PromotionService;
