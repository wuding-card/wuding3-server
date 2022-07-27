export class User {
  socket: any; // The handle got by socket.io.
  constructor(socket: any) {
    socket.emit("confirm-connect");
    console.log(socket.id);
  }
}