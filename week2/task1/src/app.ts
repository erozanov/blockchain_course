import express from 'express';
import { Block } from './model/Block';
import { BlockchainService } from './service/blockchainService';
const app = express();
const port = 3000;

let blockchainService: BlockchainService;

app.get('/', (req, res) => {
  res.send(JSON.stringify("Welcome to my blockchain"))
});

app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchainService.getBlockchainState())));

app.post('/mineBlock', (req, res) => {
  var newBlock = blockchainService.mineBlock(req.body.data);
  //broadcast(responseLatestMsg());
  console.log('block added: ' + JSON.stringify(newBlock));
  res.send();
});

app.post('/addPeer', (req, res) => {
  // connectToPeers([req.body.peer]);
  res.send();
});

app.listen(port, () => {
  blockchainService = new BlockchainService();
  return console.log(`Express is listening at http://localhost:${port}`);
});
