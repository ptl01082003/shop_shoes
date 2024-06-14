import "dotenv/config";
import cors from "cors";
import express from "express";
import { appRouter } from "./router/appRouter";
import { databaseService } from "./config/ConnectDB";


export const app = express();

app.use(express.json());

app.use(
  cors({
  origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/public", express.static("public"));

databaseService.connect();

appRouter();

// app.use("*", (req, res) => {
//   res.status(404).json({ mess: "404 Not Found" });
// });




app.listen(process.env.SERVER_PORT, () =>
  console.log("The server is running on port: http://localhost:" + process.env.SERVER_PORT)
);
