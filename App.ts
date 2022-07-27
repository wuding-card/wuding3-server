import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { GameAutomaton } from "./engine/GameAutomaton.js";
import { User } from "./engine/User.js";
import { deckLib } from "./regulates/resources.js";
import { logger } from "./tools/Logger.js";

logger.log('info', 'Server Start.');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const gameAutomaton = new GameAutomaton([deckLib["testDeck1"], deckLib["testDeck1"]]);
const users: User[] = [];
// Active when player connected.
io.on("connection", (socket) => {
  users.push(new User(socket));
});


httpServer.listen(2678);