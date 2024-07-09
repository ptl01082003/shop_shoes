import "dotenv/config";
import cors from "cors";
import express from "express";
import { appRouter } from "./router/appRouter";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/ConnectDB";
import { redis } from "./config/ConnectRedis";

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/public", express.static("public"));

redis.initial();

  connectDB();

//PUBLIC ROUTER
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

appRouter();

app.use("*", (_, res) => {
  res.status(404).json({ mess: "404 Not Found" });
});

app.listen(process.env.SERVER_PORT, () =>
  console.log("The server is running on port:" + process.env.SERVER_PORT)
);
