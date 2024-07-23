// src/services/ProductService.ts

import AxiosClient from "../networks/AxiosRequest"; // Đảm bảo rằng module AxiosClient được import và cấu hình đúng
import { Response } from "../constants/constants";

const API_URL = "/products"; // Đảm bảo rằng URL API này phù hợp với endpoint thực tế của sản phẩm trong hệ thống của bạn

export interface Product {
  productsID: number;
  productsName: string;
  productImportPrice: number;
  productPrice: number;
  status: string;
  display: boolean;
  originID: number;
  styleID: number;
  materialID: number;
  brandID: number;
  imageGallery?: string[]; // Có thể không có, nên dùng ?
  productDetails?: string; // Có thể không có, nên dùng ?
  sizeQuantities?: Array<{ sizeID: number; quantity: number }>; // Có thể không có, nên dùng ?
  // Các thuộc tính khác...
}

const ProductService = {
  // Lấy danh sách sản phẩm
  getProducts: async () => {
    try {
      const response = await AxiosClient.post<Response<any>>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
      throw new Error("Lỗi khi lấy danh sách sản phẩm");
    }
  },

  // Lấy thông tin sản phẩm theo ID
  getProductById: async (productsID: number) => {
    try {
      const response = await AxiosClient.post<Response<any>>(
        `${API_URL}/${productsID}`
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin sản phẩm ${productsID}`, error);
      throw new Error(`Lỗi khi lấy thông tin sản phẩm ${productsID}`);
    }
  },

  // Tạo sản phẩm mới
  createProduct: async (productData: Product) => {
    try {
      const response = await AxiosClient.post<Response<any>>(
        `${API_URL}/create`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới sản phẩm", error);
      throw new Error("Lỗi khi tạo mới sản phẩm");
    }
  },

  // Cập nhật thông tin sản phẩm
  updateProduct: async (productsID: number, productData: Product) => {
    try {
      const response = await AxiosClient.post<Response<any>>(
        `${API_URL}/edit/${productsID}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật sản phẩm ${productsID}`, error);
      throw new Error(`Lỗi khi cập nhật sản phẩm ${productsID}`);
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (productsID: number) => {
    try {
      const response = await AxiosClient.post<Response<any>>(
        `${API_URL}/remove`,
        {
          data: { productsID },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm ${productsID}`, error);
      throw new Error(`Lỗi khi xóa sản phẩm ${productsID}`);
    }
  },
};

export default ProductService;
