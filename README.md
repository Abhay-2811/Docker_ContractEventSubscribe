# Subscribe to ERC20 Blockchain Events using public <a href="https://hub.docker.com/r/devabhay28/blockchain-eventlistener" target="_blank">Docker Container</a>

## To use this service follow given steps:

1. Pull the docker image

    ```
     docker pull devabhay28/blockchain-eventlistener
    
    ```

2. [ **Important** ] In the working directory create a .env file and paste your ws rpc url (get one from <a href="https://alchemy.com" target="_blank">alchemy</a> for free) make sure you're using same network for both RPC url and Contract deployment

    Env Example: <br />
    
   ```
    RPC_URL=<ws-rpc-url>
    CONTRACT_ADD=<contract-address>
    ```

3. Run docker in same dir, here -dp take is used to map a local port (6000, localhost port where websocket will run) to docker port (3000, dont change this) 

   ```

    docker run -dp 6000:3000 --env-file .env devabhay28/blockchain-eventlistener

   ```

4. Now that the docker is running and websocket is ready. You can use packages such as `ws` to listen to transactions. Below is an example client code snippet

   ```
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
   
   ```


   ### Give repo a star if it was helpful ♥︎
