import { logger } from "../tools/Logger";

export class User {
  socket: any; // The handle got by socket.io.
  userName: string = "";
  constructor(socket: any) {
    socket.emit("confirm-connect");
    logger.info('User with socket id %s connected!', socket.id);
    // Register Set User ID Event:
    // socket.on("set-user-id", (name: string) => {
    //   logger.info('User ID has been set as %s', name);
    //   this.userName = name;
    // });
    // socket.on("create-room", (args: any) => {
    //   logger.info('User created room with name: %s.',  args);
    // })
    // socket.on("enter-game", (args) => {
    //   console.log(args)
    //   socket.emit("renew-game-state", {
    //     state: gameAutomaton.gameState,
        
    //   });
    // });
  }

}