import "dotenv/config";
import express from "express";
import http from "http";
import { Socket as IOSocket, Server } from "socket.io";
import { redis } from "./config/ConnectRedis";
import { authSocket } from "./middleware/checkSocket";

declare global {
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

io.use(authSocket as any);

io.on("connection", (socket) => {
  const userId = (socket as Socket.ExternalSocket).userId;
  socket.emit("receiver", "Chào mừng bạn đã đến với nhà của chúng tôi");
});

redis.initial();

server.listen(process.env.SERVER_PORT, () =>
  console.log("Socket is running on port:: " + process.env.SERVER_PORT)
);
