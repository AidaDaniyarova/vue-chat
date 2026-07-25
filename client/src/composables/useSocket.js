import socket from "../socket";
import { useChatStore } from "../stores/chat";

let listenersBound = false;
let typingTimeout = null;
let stopTypingTimer = null;

/**
 * Binds socket.io events to the chat store exactly once, no matter how
 * many components call useSocket(). Call `init()` from the root App
 * component and use the returned actions from anywhere else.
 */
export function useSocket() {
  const chat = useChatStore();

  function bindListeners() {
    if (listenersBound) return;
    listenersBound = true;

    socket.on("connect", () => chat.setConnected(true));
    socket.on("disconnect", () => chat.setConnected(false));

    socket.on("rooms", (rooms) => chat.setRooms(rooms));

    socket.on("history", (messages) => chat.setHistory(messages));

    socket.on("room-message", (message) => chat.addMessage(message));

    socket.on("system", (text) => chat.addSystemMessage(text));

    socket.on("users", (users) => chat.setUsers(users));

    socket.on("typing", (username) => {
      chat.setTyping(username);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => chat.clearTyping(username), 2000);
    });

    socket.on("stop-typing", (username) => chat.clearTyping(username));
  }

  function init() {
    bindListeners();
  }

  function connectAndJoin(username, room) {
    chat.setUsername(username);
    if (!socket.connected) socket.connect();
    socket.emit("join-room", { username, room });
    chat.setRoom(room);
  }

  function switchRoom(room) {
    if (room === chat.currentRoom) return;
    chat.setRoom(room);
    socket.emit("join-room", { username: chat.username, room });
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    socket.emit("room-message", { text });
  }

  function notifyTyping() {
    socket.emit("typing");
    clearTimeout(stopTypingTimer);
    stopTypingTimer = setTimeout(() => socket.emit("stop-typing"), 1500);
  }

  function disconnect() {
    socket.disconnect();
    chat.logout();
  }

  return { init, connectAndJoin, switchRoom, sendMessage, notifyTyping, disconnect };
}
