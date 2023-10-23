import { io } from "/socket.io/socket.io.js";

const sio = io("http://localhost:8000");

sio.on("connect", () => {
  console.log("Client connected");
});

sio.on("disconnect", () => {
  console.log("Client disconnected");
});
