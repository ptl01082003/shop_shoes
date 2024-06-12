import express from "express";
export const app = express();
import dotenv from "dotenv";
dotenv.config();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(process.env.SERVER_PORT, () => console.log("The server is running on port:: " + process.env.SERVER_PORT));
