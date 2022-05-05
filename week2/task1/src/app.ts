import express from 'express';
import { BlockchainService } from './service/blockchainService';
import bodyParser from 'body-parser';
import Websocket from 'ws';


const http_port = process.env.HTTP_PORT || 3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];


const sockets = [];
const MessageType = {
    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2
};

const blockchainService: BlockchainService = new BlockchainService();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify("Welcome to my blockchain"))
});

const initP2PServer = () => {
  var server = new Websocket.Server({port: p2p_port});
  server.on('connection', ws => initConnection(ws));
  console.log('listening websocket p2p port on: ' + p2p_port);

};

const initConnection = (ws) => {
  sockets.push(ws);
  initMessageHandler(ws);
  initErrorHandler(ws);
  write(ws, queryChainLengthMsg());
};

const initMessageHandler = (ws) => {
  ws.on('message', (data) => {
      var message = JSON.parse(data);
      console.log('Received message' + JSON.stringify(message));
      switch (message.type) {
          case MessageType.QUERY_LATEST:
              write(ws, responseLatestMsg());
              break;
          case MessageType.QUERY_ALL:
              write(ws, responseChainMsg());
              break;
          case MessageType.RESPONSE_BLOCKCHAIN:
              handleBlockchainResponse(message);
              break;
      }
  });
};

const handleBlockchainResponse = (message) => {
  const receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.index - b2.index));
  const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
  const latestBlockHeld = blockchainService.getLatestBlock();
  if (latestBlockReceived.index > latestBlockHeld.index) {
      console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
      if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
          console.log("We can append the received block to our chain");
          blockchainService.addBlock(latestBlockReceived);
          broadcast(responseLatestMsg());
      } else if (receivedBlocks.length === 1) {
          console.log("We have to query the chain from our peer");
          broadcast(queryAllMsg());
      } else {
          console.log("Received blockchain is longer than current blockchain");
          blockchainService.replaceChain(receivedBlocks);
      }
  } else {
      console.log('received blockchain is not longer than current blockchain. Do nothing');
  }
};


const initErrorHandler = (ws: any) => {
  const closeConnection = (ws: any) => {
      console.log('connection failed to peer: ' + ws.url);
      sockets.splice(sockets.indexOf(ws), 1);
  };
  ws.on('close', () => closeConnection(ws));
  ws.on('error', () => closeConnection(ws));
};


app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchainService.getBlockchainState())));

app.post('/mineBlock', (req, res) => {
  const newBlock = blockchainService.mineBlock(req.body.data);
  broadcast(responseLatestMsg());
  console.log('block added: ' + JSON.stringify(newBlock));
  res.send();
});

app.post('/addPeer', (req, res) => {
  connectToPeers([req.body.peer]);
  res.send();
});

app.get('/peers', (req, res) => {
  res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
});

app.listen(http_port, () => {
  return console.log(`Express is listening at http://localhost:${http_port}`);
});

const connectToPeers = (newPeers: any) => {
  newPeers.forEach((peer) => {
      var ws = new Websocket(peer);
      ws.on('open', () => initConnection(ws));
      ws.on('error', () => {
          console.log('connection failed')
      });
  });
};


const queryChainLengthMsg = () => ({'type': MessageType.QUERY_LATEST});
const queryAllMsg = () => ({'type': MessageType.QUERY_ALL});
const responseChainMsg = () =>({
    'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(blockchainService.getBlockchainState())
});
const responseLatestMsg = () => ({
    'type': MessageType.RESPONSE_BLOCKCHAIN,
    'data': JSON.stringify([blockchainService.getLatestBlock()])
});

const write = (ws, message) => ws.send(JSON.stringify(message));
const broadcast = (message) => sockets.forEach(socket => write(socket, message));

connectToPeers(initialPeers);
initP2PServer();
