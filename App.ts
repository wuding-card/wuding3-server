import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { GameAutomaton } from "./engine/GameAutomaton.js";
import { deckLib } from "./regulates/resources.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const gameAutomaton = new GameAutomaton([deckLib["testDeck1"], deckLib["testDeck1"]]);
// Active when player connected.
io.on("connection", (socket) => {
  socket.emit("confirm-connect");
  console.log(socket.id);
  socket.on("enter-game", (args) => {
    console.log(args)
    socket.emit("renew-game-state", {
      state: gameAutomaton.gameState,
      
    });
  });
});


httpServer.listen(2678);