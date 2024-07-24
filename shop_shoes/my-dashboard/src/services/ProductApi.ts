// src/services/ProductService.ts

import AxiosClient from "../networks/AxiosRequest"; // Đảm bảo rằng module AxiosClient được import và cấu hình đúng
import { Response } from "../constants/constants";
const API_URL = "/products"; // Đảm bảo rằng URL API này phù hợp với endpoint thực tế của sản phẩm trong hệ thống của bạn

// export interface Product {
//   productId: number;
//   name: string;
//   description: string;
//   // Các thuộc tính khác...
// }

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

  getProductById: async (productId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}`,
        productId
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin sản phẩm ${productId}`, error);
      throw error;
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        productData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới sản phẩm", error);
      throw error;
    }
  },

  updateProduct: async (productId: number, productData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        { productId, productData }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi cập nhật sản phẩm ${productId}`, error);
      throw error;
    }
  },

  deleteProduct: async (productId: number) => {
    return await AxiosClient.post<any, Response<any>>(`${API_URL}/remove`, {
      productId,
    });
  },
};

export default ProductService;
