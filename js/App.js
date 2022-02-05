"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const GameAutomaton_js_1 = require("./engine/GameAutomaton.js");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { /* options */});
const gameAutomaton = new GameAutomaton_js_1.GameAutomaton([["基础拳法"], ["基础拳法"]]);
console.log(typeof (gameAutomaton.gameState));
io.on("connection", (socket) => {
    // ...
});
httpServer.listen(3000);
