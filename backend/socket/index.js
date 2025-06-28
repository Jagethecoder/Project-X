const { Server } = require("socket.io");

let onlineUsers = {};

function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-connected", (userId) => {
      onlineUsers[userId] = socket.id;
    });

    socket.on("send-message", ({ to, message }) => {
      const receiverSocket = onlineUsers[to];
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", message);
      }
    });

    socket.on("disconnect", () => {
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      }
    });
  });
}

module.exports = { setupSocket };
