import { logger } from "../tools/Logger";

export class User {
  socket: any; // The handle got by socket.io.
  userName: string = "";
  constructor(socket: any) {
    socket.emit("confirm-connect");
    logger.info('User with socket id %s connected!', socket.id);
    // socket.on("enter-game", (args) => {
    //   console.log(args)
    //   socket.emit("renew-game-state", {
    //     state: gameAutomaton.gameState,
        
    //   });
    // });
  }
}