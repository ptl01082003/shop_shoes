import AxiosClient from "../networks/AxiosRequest";

const API_URL = "/product-details";

export interface ProductDetail {
  productDetailid: number;
  productDetailname: string;
  productDetaildescription: string;
  productId: number;
  sizes: Array<{
    sizeId: number;
    quantity: number;
  }>;
}

const ProductDetailsService = {
  getAllProductDetails: async () => {
    try {
      const response = await AxiosClient.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching product details", error);
      throw error;
    }
  },

  getProductDetailById: async (productDetailId: number) => {
    try {
      const response = await AxiosClient.get(`${API_URL}/${productDetailId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product detail ${productDetailId}`, error);
      throw error;
    }
  },

  createProductDetail: async (
    productDetailData: Omit<ProductDetail, "productDetailid">
  ) => {
    try {
      const response = await AxiosClient.post(API_URL, productDetailData);
      return response.data;
    } catch (error) {
      console.error("Error creating product detail", error);
      throw error;
    }
  },

  updateProductDetail: async (
    productDetailId: number,
    productDetailData: Partial<ProductDetail>
  ) => {
    try {
      const response = await AxiosClient.put(
        `${API_URL}/${productDetailId}`,
        productDetailData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating product detail ${productDetailId}`, error);
      throw error;
    }
  },

  deleteProductDetail: async (productDetailId: number) => {
    try {
      const response = await AxiosClient.delete(
        `${API_URL}/${productDetailId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting product detail ${productDetailId}`, error);
      throw error;
    }
  },

  addQuantity: async (
    productDetailId: number,
    sizeId: number,
    quantity: number
  ) => {
    try {
      const response = await AxiosClient.post(`${API_URL}/add-quantity`, {
        productDetailId,
        sizeId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error adding quantity to product detail ${productDetailId}, size ${sizeId}`,
        error
      );
      throw error;
    }
  },

  updateQuantity: async (
    productDetailId: number,
    sizeId: number,
    quantity: number
  ) => {
    try {
      const response = await AxiosClient.put(`${API_URL}/update-quantity`, {
        productDetailId,
        sizeId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error updating quantity for product detail ${productDetailId}, size ${sizeId}`,
        error
      );
      throw error;
    }
  },

  deleteQuantity: async (productDetailId: number, sizeId: number) => {
    try {
      const response = await AxiosClient.delete(
        `${API_URL}/delete-quantity/${productDetailId}/${sizeId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting quantity for product detail ${productDetailId}, size ${sizeId}`,
        error
      );
      throw error;
    }
  },
};

export default ProductDetailsService;
