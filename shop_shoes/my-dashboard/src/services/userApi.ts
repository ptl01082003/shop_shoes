import AxiosConfig from "../networks/AxiosRequest";

const API_URL = "/users"; // Đường dẫn API cho tài nguyên User

const UserService = {
  // Lấy danh sách người dùng
  getUsers: async () => {
    try {
      const response = await AxiosConfig.get(API_URL);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Lấy chi tiết người dùng theo ID
  getUserById: async (userId: number) => {
    try {
      const response = await AxiosConfig.get(`${API_URL}/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Tạo mới người dùng
  createUser: async (userData: any) => {
    try {
      const response = await AxiosConfig.post(API_URL, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật người dùng
  updateUser: async (userId: number, userData: any) => {
    try {
      const response = await AxiosConfig.put(`${API_URL}/${userId}`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Xóa người dùng
  deleteUser: async (userId: number) => {
    try {
      const response = await AxiosConfig.delete(`${API_URL}/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
