// The fixed list of chat rooms available in the app.
// Keeping this on the server means the client never has to guess
// what rooms exist - it just asks for this list on connect.
const ROOMS = ["General", "Vue", "Gaming", "Random"];

module.exports = { ROOMS };
