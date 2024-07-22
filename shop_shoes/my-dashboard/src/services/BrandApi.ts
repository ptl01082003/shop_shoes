// src/services/BrandService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
const API_URL = "/brands"; // Đảm bảo rằng URL tương ứng với API của bạn

const BrandService = {
  getBrands: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Error fetching brands", error);
      throw error;
    }
  },

  getBrandById: async (brandID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${brandID}`
      );
      return response; // Sử dụng response.data để trả về dữ liệu chính xác
    } catch (error) {
      console.error(`Error fetching brand ${brandID}`, error);
      throw error;
    }
  },

  createBrand: async (brandData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        brandData
      );
      return response;
    } catch (error) {
      console.error("Error creating brand", error);
      throw error;
    }
  },

  updateBrand: async (brandID: number, brandData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit/${brandID}`,
        brandData
      );
      return response;
    } catch (error) {
      console.error(`Error updating brand ${brandID}`, error);
      throw error;
    }
  },

  deleteBrand: async (brandID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        {
          brandID,
        }
      );
      return response;
    } catch (error) {
      console.error(`Error deleting brand ${brandID}`, error);
      throw error;
    }
  },
};

export default BrandService;
