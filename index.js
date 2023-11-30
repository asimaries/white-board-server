const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: "http://localhost:3000" });

io.on("connection", (socket) => {
  console.log(socket.id, " server connected");
  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
    // console.log("beginPath", arg);
  });
  socket.on("drawPath", (arg) => {
    // console.log("drawPath", arg);
    socket.broadcast.emit("drawPath", arg);
  });
  socket.on("changeConfig", (arg) => {
    // console.log("changeConfig", arg);
    socket.broadcast.emit("changeConfig", arg);
  });
});

httpServer.listen(5000);
