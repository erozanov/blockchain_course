import express from 'express';
const app = express();
const port = 3000;
import { Block } from './model/Block'

app.get('/', (req, res) => {
  const nextTimestamp = new Date().getTime() / 1000;
  const result = Block.calculateHash(0, 0, nextTimestamp, "my first block");
  res.send('Block hash ' + result);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
