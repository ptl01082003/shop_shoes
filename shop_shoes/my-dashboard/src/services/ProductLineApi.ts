// src/repositories/ProductLineRepository.ts

import AxiosConfig from "../networks/AxiosRequest";

const API_URL = "/product-lines"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const ProductLineRepository = {
  // Lấy danh sách tất cả dòng sản phẩm
  getProductLines: async () => {
    try {
      const response = await AxiosConfig.get(API_URL);
      return { error: null, status: 1, data: response.data }; // Trả về dữ liệu với trạng thái và lỗi null
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dòng sản phẩm", error);
      return { error: "Lỗi khi lấy danh sách dòng sản phẩm", status: 0 }; // Trả về lỗi nếu có vấn đề xảy ra
    }
  },

  // Lấy thông tin dòng sản phẩm dựa trên ID
  getProductLineById: async (productLineID: number) => {
    try {
      const response = await AxiosConfig.get(`${API_URL}/${productLineID}`);
      return { error: null, status: 1, data: response.data }; // Trả về dữ liệu với trạng thái và lỗi null
    } catch (error) {
      console.error(
        `Lỗi khi lấy thông tin dòng sản phẩm ${productLineID}`,
        error
      );
      return {
        error: `Lỗi khi lấy thông tin dòng sản phẩm ${productLineID}`,
        status: 0,
      }; // Trả về lỗi nếu có vấn đề xảy ra
    }
  },

  // Tạo mới một dòng sản phẩm
  createProductLine: async (productLineData: any) => {
    try {
      const response = await AxiosConfig.post(API_URL, productLineData);
      return { error: null, status: 1, data: response.data }; // Trả về dữ liệu với trạng thái và lỗi null
    } catch (error) {
      console.error("Lỗi khi tạo mới dòng sản phẩm", error);
      return { error: "Lỗi khi tạo mới dòng sản phẩm", status: 0 }; // Trả về lỗi nếu có vấn đề xảy ra
    }
  },

  // Cập nhật thông tin một dòng sản phẩm đã có
  updateProductLine: async (productLineID: number, productLineData: any) => {
    try {
      const response = await AxiosConfig.put(
        `${API_URL}/${productLineID}`,
        productLineData
      );
      return { error: null, status: 1, data: response.data }; // Trả về dữ liệu với trạng thái và lỗi null
    } catch (error) {
      console.error(`Lỗi khi cập nhật dòng sản phẩm ${productLineID}`, error);
      return {
        error: `Lỗi khi cập nhật dòng sản phẩm ${productLineID}`,
        status: 0,
      }; // Trả về lỗi nếu có vấn đề xảy ra
    }
  },

  // Xóa một dòng sản phẩm dựa trên ID
  deleteProductLine: async (productLineID: number) => {
    try {
      const response = await AxiosConfig.delete(`${API_URL}/${productLineID}`);
      return { error: null, status: 1, data: response.data }; // Trả về dữ liệu với trạng thái và lỗi null
    } catch (error) {
      console.error(`Lỗi khi xóa dòng sản phẩm ${productLineID}`, error);
      return { error: `Lỗi khi xóa dòng sản phẩm ${productLineID}`, status: 0 }; // Trả về lỗi nếu có vấn đề xảy ra
    }
  },
};

export default ProductLineRepository;
