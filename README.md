# VueChat 💬

A production-quality, Discord-styled real-time chat app built with **Vue 3**, **Pinia**, **Tailwind CSS**, and **Socket.IO**.

## Features

- 🎨 Discord-inspired UI with Tailwind CSS
- 💬 Distinct chat bubbles for your messages vs. everyone else's
- 👥 Live sidebar of online users, with auto-generated avatars (DiceBear)
- 🏠 Multiple rooms: General, Vue, Gaming, Random - with per-room history
- 😀 Emoji picker
- 📜 Smart auto-scroll (only interrupts you with a toast if you've scrolled up)
- 🕒 Message timestamps
- 🌙 Light / dark mode, remembered across visits
- 📱 Fully responsive - collapsible drawers for rooms and users on mobile
- ⌨️ Live "is typing…" indicator
- 🔔 New-message toast when you're scrolled away from the bottom

## Tech stack

| Layer      | Tech                                             |
| ---------- | ------------------------------------------------ |
| Frontend   | Vue 3, Vite, Vue Router, Pinia, Tailwind CSS v4   |
| Real-time  | Socket.IO (client + server)                      |
| Backend    | Node.js, Express                                 |
| Avatars    | [DiceBear](https://www.dicebear.com/) (no uploads needed) |
| Emoji      | [emoji-picker-element](https://github.com/nolanlawson/emoji-picker-element) |

## Project structure

```
vue-chat/
├── client/                 # Vue 3 frontend
│   ├── src/
│   │   ├── components/     # Sidebar, ChatWindow, ChatBubble, ChatInput, ...
│   │   ├── composables/    # useSocket.js, useTheme.js
│   │   ├── stores/         # chat.js (Pinia)
│   │   ├── views/          # JoinView.vue, ChatView.vue
│   │   ├── router/         # index.js
│   │   ├── socket.js       # shared Socket.IO client instance
│   │   ├── style.css
│   │   ├── App.vue
│   │   └── main.js
│   └── vite.config.js
└── server/                  # Express + Socket.IO backend
    ├── index.js
    └── rooms.js
```

## Getting started

Requires Node.js 18+.

```bash
git clone https://github.com/AidaDaniyarova/vue-chat.git
cd vue-chat
npm run install:all
npm run dev
```

This starts the backend on `http://localhost:3000` and the frontend on `http://localhost:5173` together. Open the frontend URL in two different browser windows (or one normal + one incognito) to see the chat in action with two users.

### Running client/server separately

```bash
# terminal 1
cd server
npm install
npm run dev

# terminal 2
cd client
npm install
npm run dev
```

### Environment variables

Copy the example env files and adjust if needed:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

- `server/.env` - `PORT`, `CLIENT_ORIGIN` (used for CORS)
- `client/.env` - `VITE_SOCKET_URL` (where the frontend connects for Socket.IO)

## How it works

- **Rooms** are fixed on the server (`server/rooms.js`) and broadcast to every client on connect. Joining a room calls `socket.join(room)` server-side; messages are scoped with `io.to(room).emit(...)`.
- **Message history** - the server keeps the last 50 messages per room in memory and replays them to a client when it joins, so switching rooms doesn't lose context. This is in-memory only; add a database (MongoDB, Postgres) if you need persistence across server restarts.
- **Presence** - the server tracks `socket.id → { username, room }` and emits the room's user list whenever someone joins, switches rooms, or disconnects.
- **Typing indicator** - a `typing` event is broadcast (not echoed back to the sender) and automatically cleared client-side after 2 seconds of silence.
- **Avatars** are generated on the fly from the username via DiceBear's API - no image uploads or storage needed.