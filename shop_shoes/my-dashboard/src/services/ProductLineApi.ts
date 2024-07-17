// src/services/ProductLineService.ts

import AxiosConfig from "../networks/AxiosRequest";

const API_URL = "/product-lines"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const ProductLineService = {
  // Lấy danh sách tất cả dòng sản phẩm
  getProductLines: async () => {
    try {
      const response = await AxiosConfig.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dòng sản phẩm", error);
      throw error;
    }
  },

  // Lấy thông tin dòng sản phẩm dựa trên ID
  getProductLineById: async (productLineID: number) => {
    try {
      const response = await AxiosConfig.get(`${API_URL}/${productLineID}`);
      return response.data;
    } catch (error) {
      console.error(
        `Lỗi khi lấy thông tin dòng sản phẩm ${productLineID}`,
        error
      );
      throw error;
    }
  },

  // Tạo mới một dòng sản phẩm
  createProductLine: async (productLineData: any) => {
    try {
      const response = await AxiosConfig.post(API_URL, productLineData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo mới dòng sản phẩm", error);
      throw error;
    }
  },

  // Cập nhật thông tin một dòng sản phẩm đã có
  updateProductLine: async (productLineID: number, productLineData: any) => {
    try {
      const response = await AxiosConfig.put(
        `${API_URL}/${productLineID}`,
        productLineData
      );
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật dòng sản phẩm ${productLineID}`, error);
      throw error;
    }
  },

  // Xóa một dòng sản phẩm dựa trên ID
  deleteProductLine: async (productLineID: number) => {
    try {
      const response = await AxiosConfig.delete(`${API_URL}/${productLineID}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa dòng sản phẩm ${productLineID}`, error);
      throw error;
    }
  },
};

export default ProductLineService;
