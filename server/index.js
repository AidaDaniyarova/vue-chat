require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { ROOMS } = require("./rooms");

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));

// Simple health check - handy for Render / uptime pings.
app.get("/health", (req, res) => {
  res.json({ status: "ok", rooms: ROOMS, onlineUsers: Object.keys(users).length });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// socket.id -> { id, username, room }
const users = {};

// room name -> last N messages, so people joining late see recent history
const MAX_HISTORY = 50;
const history = Object.fromEntries(ROOMS.map((room) => [room, []]));

function usersInRoom(room) {
  return Object.values(users).filter((u) => u.room === room);
}

function pushHistory(room, message) {
  const list = history[room];
  list.push(message);
  if (list.length > MAX_HISTORY) list.shift();
}

io.on("connection", (socket) => {
  console.log(`[connect] ${socket.id}`);

  socket.emit("rooms", ROOMS);

  socket.on("join-room", ({ username, room }) => {
    if (!username || !ROOMS.includes(room)) return;

    // Leave whatever room they were in before (switching rooms).
    const previous = users[socket.id];
    if (previous) {
      socket.leave(previous.room);
      socket.to(previous.room).emit("system", `${previous.username} left #${previous.room}`);
      io.to(previous.room).emit("users", usersInRoom(previous.room));
    }

    users[socket.id] = { id: socket.id, username, room };
    socket.join(room);

    socket.emit("history", history[room]);
    io.to(room).emit("users", usersInRoom(room));
    socket.to(room).emit("system", `${username} joined #${room}`);
  });

  socket.on("room-message", ({ text }) => {
    const user = users[socket.id];
    if (!user || !text || !text.trim()) return;

    const message = {
      id: `${socket.id}-${Date.now()}`,
      username: user.username,
      text: text.trim(),
      time: new Date().toISOString(),
    };

    pushHistory(user.room, message);
    io.to(user.room).emit("room-message", message);
  });

  socket.on("typing", () => {
    const user = users[socket.id];
    if (!user) return;
    socket.to(user.room).emit("typing", user.username);
  });

  socket.on("stop-typing", () => {
    const user = users[socket.id];
    if (!user) return;
    socket.to(user.room).emit("stop-typing", user.username);
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      delete users[socket.id];
      io.to(user.room).emit("users", usersInRoom(user.room));
      io.to(user.room).emit("system", `${user.username} left #${user.room}`);
    }
    console.log(`[disconnect] ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`VueChat server running on port ${PORT}`);
});
