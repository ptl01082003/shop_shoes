import express from "express";
import authCtrl from "../controller/AuthController";

const routerAuth = express.Router();

routerAuth.post("/login", authCtrl.loginWeb);
routerAuth.post("/logout", authCtrl.logOut);
routerAuth.post("/register", authCtrl.register);
routerAuth.post("/login-dashboard", authCtrl.loginDashboard);
routerAuth.post("/refresh-token", authCtrl.requestRefreshToken);

export default routerAuth;
