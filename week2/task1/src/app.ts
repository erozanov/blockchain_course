import express from 'express';
import { BlockchainService } from './service/blockchainService';
import bodyParser from 'body-parser';

const app = express();

const port = 3000;

let blockchainService: BlockchainService;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify("Welcome to my blockchain"))
});

app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchainService.getBlockchainState())));

app.post('/mineBlock', (req, res) => {
  const newBlock = blockchainService.mineBlock(req.body.data);
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
