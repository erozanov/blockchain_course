import express from 'express';
import { BlockService } from './service/blockService';
const app = express();
const port = 3000;

const blockchain = [BlockService.getGenesisBlock()];

app.get('/', (req, res) => {
  res.send(JSON.stringify("Welcome to my blockchain"))
});

app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
