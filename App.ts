import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { GameAutomaton } from "./engine/GameAutomaton.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const gameAutomaton = new GameAutomaton([["基础拳法"],["基础拳法"]]);

io.on("connection", (socket) => {
  socket.emit("hello","world");
  console.log("connected");
});

httpServer.listen(2678);