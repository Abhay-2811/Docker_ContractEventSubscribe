const { Web3 } = require("web3");
const WebSocket = require("ws");
require('dotenv').config()

const web3 = new Web3(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADD;

console.log(process.env.RPC_URL,process.env.CONTRACT_ADD );

const wss = new WebSocket.Server({ port: 3000 });


const subscribeToTransferEvents = async () => {
  var subscription = await web3.eth.subscribe(
    "logs",
    {
      address: contractAddress,
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      ],
    },
    function (error, result) {
      if (error) console.log(error);
    }
  );
  subscription.on("connected", function (subscriptionId) {
    console.log(subscriptionId);
  });
  subscription.on("data", function (log) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(log));
      }
    });
  });
};

// WebSocket server event handling
wss.on("connection", (ws) => {
  console.log("Client connected");
  // Start listening for Transfer events
  subscribeToTransferEvents();
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on("close", async () => {
    await web3.eth.clearSubscriptions(function (error, success) {
      console.log(`Subscriptions Cleared: ${success}`); 
    });

    console.log("Client disconnected");
  });

  ws.on("error")
});
