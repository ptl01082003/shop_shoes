// src/utils/axiosConfig.ts
import axios from "axios";

// Tạo một instance Axios với cấu hình cơ bản
const AxiosConfig = axios.create({
  baseURL: "http://localhost:5500/api/v1",
  withCredentials: true, // Sử dụng cookie khi gửi yêu cầu
  headers: {
    "Content-type": "application/json",
  },
});

// Thêm một interceptor để xử lý yêu cầu trước khi gửi đi
AxiosConfig.interceptors.request.use(
  function (config) {
    // Nếu là yêu cầu đăng nhập, bỏ qua việc thêm token vào header
    if (config.url?.includes("login")) {
      return config;
    }
    // Lấy access_token từ localStorage và thêm vào header
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm một interceptor để xử lý phản hồi sau khi nhận được từ server
AxiosConfig.interceptors.response.use(
  function (response) {
    // Trả về dữ liệu chính từ phản hồi
    return response.data?.data;
  },
  async function (error) {
    const config = error.config;
    // Xử lý trường hợp Unauthorized và refresh token
    if (
      error.response?.status === 401 &&
      ["Unauthenticated User", "Refresh token has expired"].includes(
        error.response.data.message
      )
    ) {
      // Chuyển hướng người dùng đến trang đăng nhập
      window.location.assign("/auth/login");
      localStorage.removeItem("current_user"); // Xóa thông tin người dùng hiện tại
    }

    // Xử lý trường hợp Unauthorized và cần refresh token
    if (
      error.response?.status === 401 &&
      error.response.data.message === "Authorization not valid"
    ) {
      try {
        // Thực hiện lấy lại access_token từ server
        const response = await AxiosConfig.post("/auth/refresh");
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token); // Lưu access_token mới vào localStorage
        // Thực hiện lại yêu cầu ban đầu với access_token mới
        return AxiosConfig(config);
      } catch (error) {
        // Xảy ra lỗi khi lấy lại access_token, reject promise với lỗi gốc
        return Promise.reject(error);
      }
    }

    // Nếu không phải các trường hợp trên, reject promise với thông báo lỗi từ server
    return Promise.reject(error.response.data.message);
  }
);

export default AxiosConfig;
