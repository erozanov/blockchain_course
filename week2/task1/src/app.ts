import express from 'express';
import { Block } from './model/Block';
import { BlockchainService } from './service/blockchainService';
import { BlockService } from './service/blockService';
const app = express();
const port = 3000;

let blockchainService: BlockchainService;

app.get('/', (req, res) => {
  res.send(JSON.stringify("Welcome to my blockchain"))
});

app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchainService.getBlockchainState())));

app.listen(port, () => {
  blockchainService = new BlockchainService();
  return console.log(`Express is listening at http://localhost:${port}`);
});
