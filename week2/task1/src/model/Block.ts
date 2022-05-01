const CryptoJS = require('crypto-js');

export class Block {
  index: number;
  previousHash: string;
  timestamp: number;
  data: string;
  hash: string;
  constructor(index: number, previousHash: string, timestamp: number, data: string, hash?: string) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    if (hash != null) {
      this.hash = hash.toString();
    }
  }
}