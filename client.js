const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:6000");

ws.on("open", () => {
  console.log("Connected to WebSocket server");
});

ws.on("message", (message) => {
  const jsonString = message.toString();
  const eventData = JSON.parse(jsonString);
  console.log("New transaction:", eventData);
});
