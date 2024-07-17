// src/services/ProductService.ts

import AxiosConfig from "../networks/AxiosRequest"; // Đảm bảo rằng module AxiosConfig được import và cấu hình đúng

const API_URL = "/products"; // Đảm bảo rằng URL API này phù hợp với endpoint thực tế của sản phẩm trong hệ thống của bạn

const ProductService = {
  getProducts: async () => {
    try {
      const response = await AxiosConfig.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
      throw error;
    }
  },

  getProductById: async (productID: number) => {
    try {
      const response = await AxiosConfig.get(`${API_URL}/${productID}`);
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin sản phẩm ${productID}`, error);
      throw error;
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await AxiosConfig.post(API_URL, productData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới sản phẩm", error);
      throw error;
    }
  },

  updateProduct: async (productID: number, productData: any) => {
    try {
      const response = await AxiosConfig.put(
        `${API_URL}/${productID}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật sản phẩm ${productID}`, error);
      throw error;
    }
  },

  deleteProduct: async (productID: number) => {
    try {
      const response = await AxiosConfig.delete(`${API_URL}/${productID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm ${productID}`, error);
      throw error;
    }
  },
};

export default ProductService;
