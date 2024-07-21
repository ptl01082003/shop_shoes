// src/services/BrandService.ts

import AxiosClient from "../networks/AxiosRequest";

const API_URL = "/brands"; // Đảm bảo rằng URL tương ứng với API của bạn

const BrandService = {
  getBrands: async () => {
    try {
      const response = await AxiosClient.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching brands", error);
      throw error;
    }
  },

  getBrandById: async (brandID: number) => {
    try {
      const response = await AxiosClient.get(`${API_URL}/${brandID}`);
      return response;
    } catch (error) {
      console.error(`Error fetching brand ${brandID}`, error);
      throw error;
    }
  },

  createBrand: async (brandData: any) => {
    try {
      const response = await AxiosClient.post(API_URL, brandData);
      return response.data;
    } catch (error) {
      console.error("Error creating brand", error);
      throw error;
    }
  },

  updateBrand: async (brandID: number, brandData: any) => {
    try {
      const response = await AxiosClient.put(
        `${API_URL}/${brandID}`,
        brandData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating brand ${brandID}`, error);
      throw error;
    }
  },

  deleteBrand: async (brandID: number) => {
    try {
      const response = await AxiosClient.delete(`${API_URL}/${brandID}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting brand ${brandID}`, error);
      throw error;
    }
  },
};

export default BrandService;
