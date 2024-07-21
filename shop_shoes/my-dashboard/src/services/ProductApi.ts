// src/services/ProductService.ts

import AxiosClient from "../networks/AxiosRequest"; // Đảm bảo rằng module AxiosClient được import và cấu hình đúng
import { Response } from "../constants/constants";
const API_URL = "/products"; // Đảm bảo rằng URL API này phù hợp với endpoint thực tế của sản phẩm trong hệ thống của bạn

export interface Product {
  productsID: number;
  productName: string;
  productDescription: string;
  // Các thuộc tính khác...
}

const ProductService = {
  getProducts: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
      throw error;
    }
  },

  getProductById: async (productsID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${productsID}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin sản phẩm ${productsID}`, error);
      throw error;
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        productData
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới sản phẩm", error);
      throw error;
    }
  },

  updateProduct: async (productsID: number, productData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit/${productsID}`,
        productData
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi cập nhật sản phẩm ${productsID}`, error);
      throw error;
    }
  },

  deleteProduct: async (productsID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove/${productsID}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm ${productsID}`, error);
      throw error;
    }
  },
};

export default ProductService;
