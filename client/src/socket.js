import { io } from "socket.io-client";

// We wait to connect until the person has picked a username, so
// autoConnect is off here and turned on explicitly from the join flow.
const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
  autoConnect: false,
});

export default socket;
