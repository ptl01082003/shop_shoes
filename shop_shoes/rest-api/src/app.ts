import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { connectDB } from "./config/ConnectDB";
import { redis } from "./config/ConnectRedis";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "./constants";
import { appRouter } from "./router/appRouter";
import cron from "node-cron";
import http from "http";
import { Server, Socket as IOSocket } from "socket.io";
import { checkSocket } from "./middleware/checkSocket";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
    interface Response {
      json: Send<
        {
          code: number;
          data: any;
          message: string;
        },
        this
      >;
    }
  }
  namespace Socket {
    interface ExternalSocket extends IOSocket {
      userId: string;
    }
  }
}


export const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.use(checkSocket as any);

io.on('connection', (socket) => {
  const userId = (socket as Socket.ExternalSocket).userId;
  console.log("userId", "userId");
  socket.emit("receiver", "Chào mừng bạn đã đến với nhà của chúng tôi")
});


app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
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

cron.schedule(
  "40 21 * * *",
  () => {
    console.log("hello");
  },
  {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh",
  }
);


app.use((errors: any, _: Request, res: Response) => {
  res.json(errors);
});

app.use("*", (_, res) => {
  res.status(STATUS_CODE.NOT_FOUND).json(
    ResponseBody({
      code: RESPONSE_CODE.ERRORS,
      message: "Đường dẫn không tồn tại",
    })
  );
});

server.listen(process.env.SERVER_PORT, () =>
  console.log("The server is running on port:" + process.env.SERVER_PORT)
);
