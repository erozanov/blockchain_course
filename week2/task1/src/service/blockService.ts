const CryptoJS = require('crypto-js');
import { Block } from '../model/Block';

export class BlockService {
  constructor() {
  }

  static calculateHash = (block: Block) => {
    const result = CryptoJS.SHA256(block.index + block.previousHash + block.timestamp + block.data);
    return result.toString();
  };

  static getGenesisBlock = () => {
    return new Block(0, "0", 1651430148, "Genesis block", "36718b9960626f748e2fd59517c735e18dd10e3a2a92e720c0f540d816d0f82e");
  };

  static getNextTimeStamp = () => {
    const nextTimestamp = new Date().getTime() / 1000;
    return nextTimestamp;
  };

}