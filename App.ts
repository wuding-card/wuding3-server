import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { GameAutomaton } from "./engine/GameAutomaton.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const gameAutomaton = new GameAutomaton([["基础拳法"],["基础拳法"]]);
console.log(typeof(gameAutomaton.gameState));
io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);