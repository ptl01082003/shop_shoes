// src/services/ProductService.ts

import AxiosClient from "../networks/AxiosRequest"; // Đảm bảo rằng module AxiosClient được import và cấu hình đúng

const API_URL = "/products"; // Đảm bảo rằng URL API này phù hợp với endpoint thực tế của sản phẩm trong hệ thống của bạn

export interface Product {
  productID: number;
  productName: string;
  productDescription: string;
  // Các thuộc tính khác...
}

const ProductService = {
  getProducts: async () => {
    try {
      const response = await AxiosClient.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
      throw error;
    }
  },

  getProductById: async (productID: number) => {
    try {
      const response = await AxiosClient.get(`${API_URL}/${productID}`);
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin sản phẩm ${productID}`, error);
      throw error;
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await AxiosClient.post(API_URL, productData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới sản phẩm", error);
      throw error;
    }
  },

  updateProduct: async (productID: number, productData: any) => {
    try {
      const response = await AxiosClient.put(
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
      const response = await AxiosClient.delete(`${API_URL}/${productID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm ${productID}`, error);
      throw error;
    }
  },
};

export default ProductService;
