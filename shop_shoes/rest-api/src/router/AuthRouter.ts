import express from "express";
import authCtrl from "../controller/AuthController";

const routerAuth = express.Router();

// Đăng ký
routerAuth.post("/register", authCtrl.register);

// Đăng nhập
routerAuth.post("/login", authCtrl.login);

// Đăng xuất
routerAuth.get("/logout", authCtrl.logOut);

// Yêu cầu refresh token mới
routerAuth.get("/requestRefreshToken", authCtrl.requestRefreshToken);

export default routerAuth;
