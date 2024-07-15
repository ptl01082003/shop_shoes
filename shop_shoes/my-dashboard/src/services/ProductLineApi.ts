// src/services/ProductLineService.ts

import AxiosConfig from "../networks/AxiosRequest";

const API_URL = "/product-lines"; // Đường dẫn API tương ứng

const ProductLineService = {
  getProductLines: async () => {
    try {
      const response = await AxiosConfig.get(API_URL);
      return response;
    } catch (error) {
      console.error("Error fetching product lines", error);
      throw error;
    }
  },

  getProductLineById: async (productLineId: number) => {
    try {
      const response = await AxiosConfig.get(`${API_URL}/${productLineId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching product line ${productLineId}`, error);
      throw error;
    }
  },

  createProductLine: async (productLineData: any) => {
    try {
      const response = await AxiosConfig.post(API_URL, productLineData);
      return response;
    } catch (error) {
      console.error("Error creating product line", error);
      throw error;
    }
  },

  updateProductLine: async (productLineId: number, productLineData: any) => {
    try {
      const response = await AxiosConfig.put(
        `${API_URL}/${productLineId}`,
        productLineData
      );
      return response;
    } catch (error) {
      console.error(`Error updating product line ${productLineId}`, error);
      throw error;
    }
  },

  deleteProductLine: async (productLineId: number) => {
    try {
      const response = await AxiosConfig.delete(`${API_URL}/${productLineId}`);
      return response;
    } catch (error) {
      console.error(`Error deleting product line ${productLineId}`, error);
      throw error;
    }
  },
};

export default ProductLineService;
