import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    username: "",
    currentRoom: "General",
    rooms: ["General", "Vue", "Gaming", "Random"],
    messages: [],
    users: [],
    typingUser: "",
    connected: false,
  }),

  getters: {
    onlineCount: (state) => state.users.length,
  },

  actions: {
    setUsername(name) {
      this.username = name;
    },

    setConnected(value) {
      this.connected = value;
    },

    setRooms(rooms) {
      this.rooms = rooms;
    },

    setRoom(room) {
      this.currentRoom = room;
      this.messages = [];
      this.typingUser = "";
    },

    setHistory(messages) {
      this.messages = messages;
    },

    addMessage(message) {
      this.messages.push(message);
    },

    addSystemMessage(text) {
      this.messages.push({
        id: `system-${Date.now()}-${Math.random()}`,
        username: "System",
        text,
        time: new Date().toISOString(),
        system: true,
      });
    },

    setUsers(users) {
      this.users = users;
    },

    setTyping(username) {
      this.typingUser = username;
    },

    clearTyping(username) {
      if (!username || this.typingUser === username) {
        this.typingUser = "";
      }
    },

    logout() {
      this.username = "";
      this.messages = [];
      this.users = [];
      this.typingUser = "";
      this.connected = false;
    },
  },
});
